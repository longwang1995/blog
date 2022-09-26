---
title: CSS新特性
description: 记录新CSS的一些特性
date: 2021-03-27 23:49:00
author: 龙旺
sidebar: "auto"
categories:
  - 技术分享
  - 其他
tags:
  - CSS
publish: true
---

## 新 CSS 特性

### 内容可见性`content-bisibility`,可选值`visible` `auto` `hidden`

一般来说，大多数 Web 应用都有复杂的 UI 元素，而且有的内容会在设备可视区域之外（内容超出了用户浏览器可视区域），比如下图中红色区域就在手机设备屏幕可视区域之外：
![示例](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7ff80b025bb4b5ba3ee8fa8f365b37c~tplv-k3u1fbpfcp-zoom-1.image)
在这种场合下，我们可以使用 CSS 的 content-visibility 来跳过屏幕外的内容渲染。也就是说，如果你有大量的离屏内容（Off-screen Content），这将会大幅减少页面渲染时间。
这个功能是 CSS 新增的特性，隶属于 W3C 的 CSS Containment Module Level 2 模块。也是对提高渲染性能影响最大的功能之一。content-visibility 可以接受 visible、auto 和 hidden 三个属性值，但我们可以在一个元素上使用 content-visibility:auto 来直接的提升页面的渲染性能。

你可以给所有卡片添加 content-visibility：

```css
.card {
  content-visibility: auto;
}
```

如果浏览器不渲染页面内的一些元素，滚动将是一场噩梦，因为无法正确计算页面高度。这是因为，content-visibility 会将分配给它的元素的高度（height）视为 0，浏览器在渲染之前会将这个元素的高度变为 0，从而使我们的页面高度和滚动变得混乱。但如果已经为元素或其子元素显式设置了高度，那这种行为就会被覆盖。如果你的元素中没显式设置高度，并且因为显式设置 height 可能会带来一定的副作用而没设置，那么我们可以使用 contain-intrinsic-size 来确保元素的正确渲染，同时也保留延迟渲染的好处。

```css
.card {
  content-visibility: auto;
  contain-intrinsic-size: 200px;
}
```

### `scroll-behavior`让滚动更流畅

> `scroll-behavior`是[CSSOM View Module 提供的一个新特性](https://dev.w3.org/csswg/cssom-view/)，可以轻易的帮助我们实现丝滑般的滚动效果。该属性可以为一个滚动框指定滚动行为，其他任何的滚动，例如那些由于用户行为而产生的滚动，不受这个属性的影响。
> `scroll-behavior`接受两个值：

- `auto`：滚动框立即滚动
- `smooth`：滚动框通过一个用户代理定义的时间段使用定义的时间函数来实现平稳的滚动，用户代理平台应遵循约定，如果有的话

### currentColor 关键字

> currentColor 会取当前元素继承父级元素的文本颜色值或声明的文本颜色值，即 computed 后的 color 值。

比如，对于如下 CSS，该元素的边框颜色会是 red：

```css
.btn {
  color: red;
  border: 1px solid currentColor;
}
```

### `var()` CSS 变量

> 变量声明语法：`--name-name`,变量使用语法：`var(--name-name)`。`name`代表变量名称

```css
:root {
  --body-color: #fff;
}
```

`:root`伪类在文档根节点设置属性，相当于全局添加了这个变量。

```css
body {
  background-color: var(--body-color, #ccc);
}
```

- JavaScript 操作 CSS 变量

1. 检查浏览器是否支持 CSS 变量

```js
const isSupported = window?.CSS?.supports("--a", 0);
```

2. JavaScript 操作 CSS 变量

```js
// 查看所有设置的属性 包括css变量
document.styleSheets;

// 注意不能直接使用getPropertyValue()获取 css设置好的 css变量， 只有设置了变量才能获取对应变量的值。
// 设置值 变量值
document.body.style.setProperty("--connt", "1");
// 获取变量值
document.body.style.getPropertyValue("--connt");
// 获取变量值
document.body.style.removeProperty("--connt");
```

### IOS 上 input 的兼容

```css
 {
  -webkit-appearance: none; // 去除input内阴影
  -webkit-text-fill-color: @theme; // 设置input字体颜色
}
```

### css 等比缩放

- 使用 `padding` 实现

```css
.aspectratio-container {
  width: 50vmin; /* 用户根据自己需要设置相应的值 */

  /* 布局方案可以调整 */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 用来撑开aspectratio-container高度 */
.aspectratio-container::after {
  content: "";
  width: 1px;
  padding-bottom: 56.25%;

  /*元素的宽高比*/
  margin: -1px;
  z-index: -1;
}
```

- 使用自定义属性实现

```css
.container {
  --ratio: 16/9;
  height: calc(var(--width) * 1 / (var(--ratio)));
  width: 100%;
}
```

- 使用 `aspect-ratio` 实现

```css
.container {
  width: 100%;
  aspect-ratio: 16 / 9;
}
```

### css 滚动捕获

```css
.container {
  scroll-behavior: smooth;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  scroll-padding: 20px;
}

img {
  scroll-snap-align: center;
  scroll-snap-stop: always;
}
```

### css 沟槽

CSS 的 `gap` 属性是一个简写属性，分为 `row-gap` 和 `column-gap` ： ​

<img src='https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba289b4eb54845cf986cb4474c31d1f3~tplv-k3u1fbpfcp-zoom-1.image'>

该属性 `gap` 到目前为止只能运用于多列布局，Flexbox 布局和网格布局的容器上： ​

```css
// 多列布局
.multi__column {
  gap: 5ch
}

// Flexbox布局
.flexbox {
  display: flex;
  gap: 20px
}

// Grid布局
.grid {
  display: grid;
  gap: 10vh 20%
}
```

### font-variant-numeric
>CSS 属性控制数字，分数和序号标记的替代字形的使用。用于解决数字不等宽的问题

### scroll-padding-top
>用于header固定布局的情况下锚点跳转时不会被header遮挡