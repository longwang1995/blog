---
title: CSS新特性
description:  记录新CSS的一些特性
date: 2021-03-27 23:49:00
author: 龙旺
sidebar: 'auto'
categories:
 - 技术分享
 - 其他
tags:
 - CSS
publish: true
---

# CSS新特性
## 新CSS特性
>内容可见性`content-bisibility`,可选值`visible` `auto` `hidden`

一般来说，大多数Web应用都有复杂的UI元素，而且有的内容会在设备可视区域之外（内容超出了用户浏览器可视区域），比如下图中红色区域就在手机设备屏幕可视区域之外：
![示例](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7ff80b025bb4b5ba3ee8fa8f365b37c~tplv-k3u1fbpfcp-zoom-1.image)
在这种场合下，我们可以使用CSS的content-visibility来跳过屏幕外的内容渲染。也就是说，如果你有大量的离屏内容（Off-screen Content），这将会大幅减少页面渲染时间。
这个功能是CSS新增的特性，隶属于 W3C 的 CSS Containment Module Level 2 模块。也是对提高渲染性能影响最大的功能之一。content-visibility可以接受visible、auto和hidden三个属性值，但我们可以在一个元素上使用content-visibility:auto来直接的提升页面的渲染性能。

你可以给所有卡片添加content-visibility：
```css
.card {
  content-visibility: auto;
}
```
如果浏览器不渲染页面内的一些元素，滚动将是一场噩梦，因为无法正确计算页面高度。这是因为，content-visibility会将分配给它的元素的高度（height）视为0，浏览器在渲染之前会将这个元素的高度变为0，从而使我们的页面高度和滚动变得混乱。但如果已经为元素或其子元素显式设置了高度，那这种行为就会被覆盖。如果你的元素中没显式设置高度，并且因为显式设置height可能会带来一定的副作用而没设置，那么我们可以使用contain-intrinsic-size来确保元素的正确渲染，同时也保留延迟渲染的好处。

```css
.card {
  content-visibility: auto;
  contain-intrinsic-size: 200px;
}
```

>`scroll-behavior`让滚动更流畅
`scroll-behavior`是[CSSOM View Module提供的一个新特性](https://dev.w3.org/csswg/cssom-view/)，可以轻易的帮助我们实现丝滑般的滚动效果。该属性可以为一个滚动框指定滚动行为，其他任何的滚动，例如那些由于用户行为而产生的滚动，不受这个属性的影响。
`scroll-behavior`接受两个值：
* `auto`：滚动框立即滚动
*  `smooth`：滚动框通过一个用户代理定义的时间段使用定义的时间函数来实现平稳的滚动，用户代理平台应遵循约定，如果有的话