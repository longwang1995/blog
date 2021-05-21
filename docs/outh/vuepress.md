---
title: VuePress + GitHub Pages搭建个人博客
description:  VuePress + vuepress-theme-reco + GitHub Pages搭建个人博客
date: 2021-03-26 23:38:00
author: 龙旺
sidebar: 'auto'
categories:
 - 技术分享
 - 其他
tags:
 - VuePress
 - Markdown
publish: true
sticky: 1
---

# VuePress + GitHub Pages搭建个人博客
## 快速上手

::: warning 前提条件
VuePress 需要 [Node.js](https://nodejs.org/en/) >= 8.6
:::

本文会帮助你从头搭建一个简单的 VuePress 文档。如果你想在一个现有项目中使用 VuePress 管理文档，从步骤 3 开始。

1. 创建并进入一个新目录

   ``` bash
   mkdir vuepress-starter && cd vuepress-starter
   ```

2. 使用你喜欢的包管理器进行初始化

   ``` bash
   yarn init # npm init
   ```

3. 将 VuePress 安装为本地依赖

   我们已经不再推荐全局安装 VuePress

   ``` bash
   yarn add -D vuepress # npm install -D vuepress
   ```

   ::: warning 注意
   如果你的现有项目依赖了 webpack 3.x，我们推荐使用 [Yarn](https://classic.yarnpkg.com/zh-Hans/) 而不是 npm 来安装 VuePress。因为在这种情形下，npm 会生成错误的依赖树。
   :::

4. 创建你的第一篇文档

   ``` bash
   mkdir docs && echo '# Hello VuePress' > docs/README.md
   ```

5. 在 `package.json` 中添加一些 [scripts](https://classic.yarnpkg.com/zh-Hans/docs/package-json#toc-scripts)

   这一步骤是可选的，但我们推荐你完成它。在下文中，我们会默认这些 scripts 已经被添加。

   ``` json
   {
     "scripts": {
       "docs:dev": "vuepress dev docs",
       "docs:build": "vuepress build docs"
     }
   }
   ```

6. 在本地启动服务器

   ``` bash
   yarn docs:dev # npm run docs:dev
   ```

   VuePress 会在 [http://localhost:8080](http://localhost:8080) 启动一个热重载的开发服务器。

现在，你应该已经有了一个简单可用的 VuePress 文档。接下来，了解一下推荐的 [目录结构](directory-structure.html) 和 VuePress 中的 [基本配置](basic-config.html)。

等你了解完上文介绍的基础概念，再去学习一下如何使用 [静态资源](assets.html)，[Markdown 拓展](markdown.html) 和 [在 Markdown 中使用 Vue](using-vue.html) 来丰富你的文档内容。

当你的文档逐渐成型的时候，不要忘记 VuePress 的 [多语言支持](i18n.html) 并了解一下如何将你的文档 [部署](deploy.html) 到任意静态文件服务器上。

## 常用配置项`config.js`

```javascript
module.exports = {
  title: "小旺旺",
  description: "个人博客",
  theme: "antdocs",
  base: "/blog/",
  lange: "zh-CN",
  plugins: [
    ["@vuepress/back-to-top"],
    [
      "@vuepress/blog",
      {
        sitemap: {
          hostname: "https://longwang1995.github.io/blog/",
        },
      },
    ],
  ],
  head: [["link", { rel: "icon", href: "/logo.jpg" }]],
  themeConfig: {
    logo: "/logo.jpg",
    sidebarDepth: "3",
    lastUpdated: "最近更新时间",
    nav: [
      { text: "主页", link: "/" },
      { text: "前端", link: "/front/" },
      { text: "Git", link: "/git/" },
      { text: "其他", link: "/outh/" },
      { text: "GitHub", link: "https://github.com/longwang1995", target: "_blank" },
    ],
    sidebar: {
      "/front/": ["", "css", "js", "vue", "mobile"],
      "/git/": [""],
      "/outh/": ["", "vuepress"]
    },
  },
};

```

## 主题配置`vuepress-theme-reco`
1. 安装
```bash
npm install vuepress-theme-reco --save-dev

# or

yarn add vuepress-theme-reco
```
2. 引用
```javascript
// .vuepress/config.js

module.exports = {
  theme: 'reco'
}  
```
3. 具体配置请移步[vuepress-theme-reco文档](https://vuepress-theme-reco.recoluan.com/)

## 部署GitHub Pages

1. 在 `docs/.vuepress/config.js` 中设置正确的 `base`。

   如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。

   如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。

2. 在你的项目中，创建一个如下的 `deploy.sh` 文件（请自行判断去掉高亮行的注释）:

``` bash{13,20,23}
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```
