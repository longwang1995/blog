---
title: 使用Puppeteer无头浏览器生成PDF
date: 2021-12-22
author: 龙旺
tags:
  - node.js
---

## 初始化项目

初始化

```sh
npm init
# 然后一路回车就行
```

安装依赖

```sh
npm install puppeteer
```

## 使用到的参数配置

### Puppeteer.launch(options)

- `options`

  - `args` `<Array<string>>` 传递给浏览器实例的其他参数。 这些参数可以参考 [这里](https://peter.sh/experiments/chromium-command-line-switches/)。
  - `executablePath` `<string>` 可运行 Chromium 或 Chrome 可执行文件的路径，而不是绑定的 Chromium。如果安装了 `puppeteer-core` 就需要用到这个配置，否则不用

### page.goto(url[, options])

- `options`

  - `timeout` `<number>` 跳转等待时间，单位是毫秒, 默认是 30 秒, 传 0 表示无限等待。
  - `waitUntil` `<string|Array<string>>` 满足什么条件认为页面跳转完成，默认是 `load` 事件触发时。指定事件数组，那么所有事件触发后才认为是跳转完成。事件包括：

    - `load` - 页面的 load 事件触发时
    - `domcontentloaded` - 页面的 `DOMContentLoaded` 事件触发时
    - `networkidle0` - 不再有网络连接时触发（至少 500 毫秒后）
    - `networkidle2` - 只有 2 个网络连接时触发（至少 500 毫秒后）

### page.pdf([options])

- `options`

  - `path` `<string>` pdf 文件保存的路径。如果是相对路径，则相对当前路径。如果不指定路径，将不保存到硬盘。
  - `scale` `<number>` 页面渲染的缩放。默认是 1。缩放值必须介于 0.1 到 2 之间。
  - `displayHeaderFooter` `<boolean>` 显示页眉和页脚。默认是不显示
  - `headerTemplate` `<string>` 页眉的 `html` 模板，可以有这些变量：

    - `date` - 格式化的日期
    - `title` - 网页标题
    - `url` - 网页地址
    - `pageNumber` - 当前页码
    - `totalPages` - 总页数

  - `footerTemplate` 页脚的 `html` 模板。和页眉模板变量相同。
  - `printBackground` 是否打印背景图. 默认是 `false`。
  - `landscape` `<boolean>` 页面横向(?Paper orientation). 默认为 `false`.
  - `pageRanges` `<string>` 要输出的页码范围, 比如, '1-5, 8, 11-13'。默认是空字符串，表示全部页码。

## 主要代码

```js
const puppeteer = require("puppeteer");
async () => {
  const browser = await puppeteer.launch({
    args: ["--disable-edv-shm-usage", "--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.goto("http://localhost:3000/#/pdf", {
    waitUntil: "networkidle0",
    timeout: 0,
  });
  await page.pdf({
    format: "A4",
    printBackground: true,
    path: "./pdf.pdf",
    displayHeaderFooter: true,
    margin: {
      top: "80px",
      bottom: "80px",
    },
    headerTemplate,
    headerTemplate,
  });

  await browser.close();
};
```

封面不需要 `margin` 这个时候问题就来了，如果给封面设置 `margin: 0` 的话会导致其他页面的边距也出问题。这个时候就要换种思路了。

## 使用 `pdf-lib` 来实现 pdf 合并

最终代码：

```js
const puppeteer = require("puppeteer");
const { PDFDocument } = require("pdf-lib");
const fs = require("fs/promises");

(async () => {
  const browser = await puppeteer.launch({
    args: ["--disable-edv-shm-usage", "--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/#/pdf", {
    waitUntil: "networkidle0",
    timeout: 0,
  });
  const option = {
    format: "A4",
    printBackground: true,
    "-webkit-print-color-adjust": "exact",
  };
  // 首先渲染出1，2封面页和最后一个背景，这里就是把最后一页背景挪到前面来和首页用同一种规则渲染。后面再合并到尾页去
  const cover = await page.pdf({
    ...option,
    pageRanges: "1-2",
  });

  await page.addStyleTag({
    content: ".page {display:none}",
  });

  const content = await page.pdf({
    ...option,
    displayHeaderFooter: true,
    margin: {
      top: "80px",
      bottom: "80px",
    },
    headerTemplate,
    headerTemplate,
  });

  const pdfDoc = await PDFDocument.create();

  const coverDoc = await PDFDocument.load(cover);

  const [coverPage] = await pdfDoc.copyPages(coverDoc, [0]);

  const [bgPage] = await pdfDoc.copyPages(coverDoc, [1]);

  pdfDoc.addPage(coverPage);

  const mainDoc = await PDFDocument.load(content);
  console.log("main", mainDoc);

  for (let index = 0; index < mainDoc.getPageCount(); index++) {
    const [mainPage] = await pdfDoc.copyPages(mainDoc, [index]);
    pdfDoc.addPage(mainPage);
  }

  pdfDoc.addPage(bgPage);

  const pdfBytes = await pdfDoc.save();

  await fs.writeFile("./pdf.pdf", pdfBytes);

  await browser.close();
})();
```

## `table` 跨页显示

可以使用 `thead` 和 设置相关 CSS 来实现

html

```html
<!-- 通过这种布局结合css可以实现跨页显示，表头会自动添加到下一页 -->
<table>
  <thead>
    ...
  </thead>
  <tbody>
    ...
  </tbody>
</table>
```

css

```css
table thead {
  display: table-header-group;
  break-inside: avoid;
}
```

## `headerTemplate` 和 `footerTemplate` 注意事项：

1. 需要设置 `margin` 参数来留出空间展示 `headerTemplate` 和 `footerTemplate`

2. `headerTemplate` 和 `footerTemplate` 中不支持使用路径和 url 的形式调用图片资源，那如果需要展示 img 该怎么办呢？将 img 尽可能压缩后，转为 base64，放在 src 中，就可以正常显示。

3. `headerTemplate` 和 `footerTemplate` 不支持 css 的 `background`，如需进行丰富样式的页眉页脚设计，就需要把背景转为 img，再放进去。

4. `headerTemplate` 和 `footerTemplate` 设置的页眉和页脚，并不在 html 的 dom 流中，他们不属于`<html/>`也不属于`<body/>`，`html` 的 `dom` 会自动跳过这片区域，与 `word` 类似。因此无法在 `html` 文件中的 `css` 中控制其样式，只能将其样式写入 `Template` 的字符串中，作为行间样式。

5. `footerTemplate` 提供了默认的页码显示支持，将 `span` 标签的 `class` 设置为 `totalPages` 为总页数，设置为 `pageNumber` 为当前页数。除此之外其他地方无法获取页码
