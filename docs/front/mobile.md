---
title: 常见rem适配方案
description:  常见rem适配方案
date: 2021-03-27 23:49:00
author: 龙旺
sidebar: 'auto'
categories:
 - 技术分享
 - 其他
tags:
 - javascript
 - 移动端
publish: true
---

## 常见rem适配方案
* 京东适配方案
```css
html {
  font-size: 20px;
  font-size: 5.33333vw
}

@media screen and (max-width: 320px) {
  html {
      font-size:17.06667px
  }
}

@media screen and (min-width: 540px) {
  html {
      font-size:28.8px
  }
}
```

* 淘宝适配方案
```javascript
!(function(e, t) {
  var n = t.documentElement,
    d = e.devicePixelRatio || 1
  function i() {
    var e = n.clientWidth / 3.75
    n.style.fontSize = e + 'px'
  }
  if (
    ((function e() {
      t.body ? (t.body.style.fontSize = '16px') : t.addEventListener('DOMContentLoaded', e)
    })(),
    i(),
    e.addEventListener('resize', i),
    e.addEventListener('pageshow', function(e) {
      e.persisted && i()
    }),
    2 <= d)
  ) {
    var o = t.createElement('body'),
      a = t.createElement('div')
    ;(a.style.border = '.5px solid transparent'), o.appendChild(a), n.appendChild(o), 1 === a.offsetHeight && n.classList.add('hairlines'), n.removeChild(o)
  }
})(window, document)
```

* 魅族适配方案
1. 方案一：javascript
```javascript
!(function(d) {
  var c = d.document
  var a = c.documentElement
  var b = d.devicePixelRatio
  var f
  function e() {
    var h = a.getBoundingClientRect().width,
      g
    if (b === 1) {
      h = 720
    }
    g = h / 10
    a.style.fontSize = g + 'px'
  }
  if (b > 2) {
    b = 3
  } else {
    if (b > 1) {
      b = 2
    } else {
      b = 1
    }
  }
  a.setAttribute('data-dpr', b)
  d.addEventListener(
    'resize',
    function() {
      clearTimeout(f)
      f = setTimeout(e, 200)
    },
    false
  )
  e()
})(window)
```
2. 方案二：css
```css
html {
  font-size: 62.5%
}
```

## 禁止 iOS 识别长串数字为电话
```html
<meta name="format-detection" content="telephone=no" />
```