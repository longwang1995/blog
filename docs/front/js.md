---
title: javascript开发实战
date: 2021-03-26
author: 龙旺
tags:
  - javascript
  - webpack
---

## async/awite 使用

```javascript
async function fn() {
  const res = awite axios()
  return res
}
```

## 无效参数过滤

```js
/**
 * 判断真假，排除0为false的情况
 * @param  {object} value
 */
export const isFalsy = (value) => value === 0 ? false : !value



/**
 * 对象去空
 * @param  {object} object
 */
export const filterParams = (object) => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}
```
