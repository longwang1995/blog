---
title: 面试题汇总
description: 面试题汇总
date: 2021-03-27 23:49:00
author: 龙旺
sidebar: 'auto'
categories:
  - 技术分享
  - 其他
tags:
  - CSS
  - javascript
  - vue
publish: true
---

# 面试题汇总

## JS 相关题目

> 1.请输出下面代码执行结果

```javascript
async function async1() {
	console.log('async1 start')
	await async2()
	console.log('async1 end')
}

async function async2() {
	console.log('async2')
}

console.log('script start')

setTimeout(() => {
	console.log('setTimeout')
}, 0)

async1()

new Promise((resolve) => {
	console.log('promise1')
	resolve()
}).then((_) => {
	console.log('promise2')
})

console.log('script end')

/*
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
*/
```
