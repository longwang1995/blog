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

## 文件路由

什么是文件路由？确切的说应该是基于文件系统的路由（file system based routing）。因为网站搭建后，通常情况下我们只需要写写 markdown，或者.vue 页面就可以自动生成路由，而访问者只要访问具体的路由，即可访问对应文件包含的内容了，这样做我们就不用像传统 Vue 项目开发那样在 vue-router 中配置专门的路由映射。

`vite-plugin-pages` 插件为我们提供了这样的功能，安装该插件：

```sh
# 该插件还是需要vue-router提供支持的
npm install vite-plugin-pages -D
npm install vue-router@next
```

配置 `vite-plugin-pages`:

```js
// vite.config.ts
import vue from "@vitejs/plugin-vue";
import path from "path";
import Pages from "vite-plugin-pages";
import ElementPlus from "unplugin-element-plus/vite";

// https://vitejs.dev/config/
export default {
  plugins: [
    vue(),
    ElementPlus(),
    Pages({
      extensions: ["vue"],
    }),
  ],
};
```

- `extensions`：需要包含的文件类型，这里显然是 .vue 和 .md 文件。
- `pagesDir`：寻找文件的目录，这里选择了项目根目录下的 pages 目录。
- `extendRoute`：提供一个方法，对每个文件产生路由做一些加工，这里是对 route.meta 的处理。
- `matter`：gray-matter 的功能，可以获取相关文件中的 front-matter，并将其处理为一个对象。
- `front-matter`：markdown 文件顶部，由 --- 包裹的一块区域，就像：

```
---
title: Hello
date: 2021-06-02
---
```

总结就是，vite-plugin-pages 会自动把 pages 目录中的 .vue 和 .md 文件生成对应的路由，并且我们可以利用 markdown 的 front-matter 来为路由提供一些额外信息。

同时我们还需要引入`vite-plugin-pages` 的路由。

```ts
// src/main.ts
import App from "./App.vue";
import { createApp } from "vue";
import routes from "virtual:generated-pages"; // vite-plugin-pages生成的路由信息
import { createRouter, createWebHistory } from "vue-router";

const app = createApp(App);
app.use(
  createRouter({
    history: createWebHistory(),
    routes,
  })
);

app.mount("#app");
```

最后在 pages 文件夹中创建.vue 文件，然后就可以运行网站了。

## SEO 优化[`@vueuse/head`](https://github.com/vueuse/head)的使用

设置 header 中的信息

```vue
<!-- src/pages/index.vue -->
<script setup>
import { useHead } from "@vueuse/head";

useHead({
  title: "首页",
});
</script>
```

## 静态页面生成

通过上面的配置后已经是一个具有基本功能的网站了，但是我们做 SEO 的话还需要生成静态页面。

安装 `vite-ssg`

```sh
npm install vite-ssg -D
```

修改项目入口文件`main.ts`

```ts
// src/main.ts
import App from "./layout/main.vue";
import routes from "virtual:generated-pages";
import { ViteSSG } from "vite-ssg";
// import { createRouter, createWebHistory } from "vue-router";

// 将createRouter替换成ViteSSG
export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { routes },
  // function to have custom setups
  ({ app, router, routes, isClient, initialState }) => {
    // install plugins etc.
  }
);
```

最后在 `package.json` 中添加打包命令

```json
"scripts": {
    "dev": "vite",
    "build": "vite build",
+   "ssg": "vite-ssg build",
    "serve": "vite preview"
  },
```
