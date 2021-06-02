---
title: Vite2移动端开发初体验
description: Vite2移动端开发初体验
date: 2021-05-21 15:37:00
author: 龙旺
sidebar: "auto"
categories:
  - 技术分享
tags:
  - Vite
  - postcss-pxtorem
publish: true
---

## 开始

### 搭建第一个 Vite 项目

- 使用 NPM:

```sh
npm init @vitejs/app
```

- 使用 Yarn:

```sh
yarn create @vitejs/app
```

### 运行

```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview",
    "test": "vite build --mode=test",
    "buildTest": "vite build --color --mode buildTest"
  },
```

### 静态资源的使用

- 配置 `vite.config.js`：

```js
resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@": path.resolve(__dirname, "src"),
    }
  },
```

- 在开发中使用：

```html
<img src="@assets/img/about/icon.png" alt="" class="icon" />
```

**_注意_** ：在 `Vite setup` 中不能使用 `require()`

```vue
<script setup>
  // 错误：
  const img = require("@assets/img/about/icon.png"); 
  // 正确：
  import img from "@assets/img/about/icon.png";
</script>
```

### 全局 `less` 变量的使用

```js
css: {
  preprocessorOptions: {
    less: {
      additionalData: `@import "@/styles/variables.less";@import "@/styles/common.less";`;
    }
  }
}
```

### 关于 `setup` 的使用

#### 基本例子

```vue
<script setup>
  // 导入的组件也可以直接在模板中使用
  import Foo from './Foo.vue'
  import { ref } from 'vue'

  // 就像在普通的setup（）中一样编写Composition API代码
  // 但无需手动返回所有内容
  const count = ref(0)
  const inc = () => {
    count.value++
  }
</script>

<template>
  <Foo :count="count" @click="inc" />
</template>

```

#### 使用 `Props` 和 `Emits`

```vue
<script setup>
  import { defineProps, defineEmit } from 'vue'

  // expects props options
  const props = defineProps({
    foo: String,
  })
  // expects emits options
  const emit = defineEmits(['update', 'delete'])
</script>
```

#### 使用 `await`

```vue
<script setup>
  const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```

了解更多 `setup rfc` 请移步[官方文档](https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md#closed-by-default)

### 配置 `postcss.config.js` 进行 rem 单位转换

```js
module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ["*"],
    },
  },
};
```
