---
title: Vite2 + SSG 实现预渲染
date: 2021-12-22
author: 龙旺
tags:
  - Vue3
  - SSG
---

## 初始化 Vite 项目

```sh
# npm 6.x
npm init vite@latest my-vue-app --template vue

# npm 7+, 需要额外的双横线：
npm init vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app -- --template vue
```

## 安装所需插件

```sh
yarn add vite-ssg vite-plugin-pages @vueuse/head
```

## 修改 `vite.config.js` 配置文件

```js
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default {
  plugins: [
    vue(),
    Pages({
      extensions: ['vue'],
    }),
  ]
  ...
}
```
## 修改 `main.js` 文件

将原来代码中的 `createApp` 方法修改为下方的代码
```js
// import { createApp } from 'vue'
import App from './layout/main.vue'
import routes from 'virtual:generated-pages'
import { ViteSSG } from 'vite-ssg'

export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes },
  // function to have custom setups
  ({ app, router, routes, isClient, initialState }) => {
    // install plugins etc.
  }
)
```

## 新建文件夹 `pages` 用于存放页面代码

`vite-plugin-pages` 会自动根具 `pages` 目录下的文件生成相应的路由
```tree
─pages
    index.vue
    login.vue
```

## `@vueuse/head` 的使用[文档](https://github.com/vueuse/head)
设置header中的信息
```vue
<script setup>
import { useHead } from '@vueuse/head'

useHead({
	title: '登录',
})
</script>
```
