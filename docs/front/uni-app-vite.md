---
title: uni-app + Vue3 + vite + windicss 实战开发
description: 在uni-app中使用windicss
date: 2022-04-01 15:37:00
author: 龙旺
sidebar: "auto"
categories:
  - 技术分享
tags:
  - Vite
  - windicss
publish: true
---

## 开始

### 初始化 `uni-app + vite2` 模板

初始化项目模板
```sh
npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project
```

### 安装配置 `windicss`

添加 `windicss` 依赖

```sh
pnpm add windicss vite-plugin-windicss
```

在跟目录下新建配置文件`windi.config.ts`

```ts
import { defineConfig } from "vite-plugin-windicss";

export default defineConfig({})
```

在 `vite.config.ts` 中配置

```ts
import WindiCSS from 'vite-plugin-windicss'
export default defineConfig({
  ...
  plugins: [
    uni(),
    WindiCSS()
    ...
  ]
  ...
})
```

最后在 `main.ts` 中引用
```ts
import { createSSRApp } from "vue";
import App from "./App.vue";
import { setupStore } from './store'
// @ts-ignore
import uView from './uni_modules/vk-uview-ui';
import 'virtual:windi.css'
import './static/css/iconfont.css'

export function createApp() {
  const app = createSSRApp(App);
  app.use(uView)
  setupStore(app)
  return {
    app,
  };
}
```

现在基本上我们的配置算是告一段落了，已经可以 `npm run dev:h5` 开始在浏览器中运行了。


### 自动导入组件和Vue3的api。

```sh
pnpm add -D unplugin-auto-import unplugin-vue-components
```

配置`vite.config.ts`
```ts
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VueUseComponentsResolver } from "unplugin-vue-components/resolvers";
export default defineConfig({
  plugins: [
    Components({
      resolvers: [VueUseComponentsResolver()],
      dts: 'src/components.d.ts',
    }),
    AutoImport({
      resolvers: [VueUseComponentsResolver()],
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: ['vue', 'uni-app', 'vuex'],
      // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
      eslintrc: {
        enabled: true, // Default `false`
      },
      dts: 'src/auto-import.d.ts',
    }),
  ]
})
```
> 生成的文件可以添加到`.gitignore`。


### 记录遇到的坑

1. 一开始在浏览器运行还挺正常的，高高兴兴的写完页面准备拿出手机来预览。`npm run dev:mp-weixin` 走起，开发工具打开项目。然后报错了😂

```
[ WXSS 文件编译错误] 
ERR: wxss GetCompiledResult: ./app.wxss(3378:5): unexpected `\` at pos 56697
(env: Windows,mp,1.05.2111300; lib: 2.23.1)
```
找到 `app.wxss` 查看一下怎么回事，原来`windicss`生成了class有点问题，生成了带`\`的类名，这个类目小程序是不支持的。但是咋眼一看这个类名我好像没用到呀，我就在想是不是可以去掉。于是查了查文档，还找到了
```css
.tab\.left {
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
}
.tab\.width {
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
}
```
然后我就找到了一些小程序不支持的，然后去掉不支持的 `windicss` 插件

> `windicss`全英文文档看不懂的同学（我自己）可以去看`tailwindcss`的文档，`windicss`是在`tailwindcss`上扩展而来的，所以大部分配置都一致。

设置弃用某些插件写法
```ts
corePlugins: {
  preflight: false, // html基础样式
  blur: false,
  tableLayout: false,
  tabSize: false,
}
```
设置启用某些插件的写法
```ts
corePlugins: ['padding', ....]
```

文档参考[tailwindcss](https://www.tailwindcss.cn/docs/)，[windicss](https://windicss.org/guide/)

2. 避免在使用`windicss`的时候写一些类似 `!p-2`, `h-50%` 这样的类名，因为这些编译后会带有`\`。

3. 用TypeScript的同学可能会遇到找不到` unplugin-auto-import`的情况，这里我们只需要把它添加到`env.d.ts`中即可

```ts
declare module 'unplugin-auto-import';
```
