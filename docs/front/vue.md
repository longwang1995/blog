---
title: Vue3新特性以及使用经验总结
description: 记录新CSS的一些特性
date: 2021-04-06 10:50:00
author: 龙旺
sidebar: "auto"
categories:
  - 技术分享
tags:
  - Vue
publish: true
---

## setup

`setup` 是 Vue3.x 新增的一个选项， 他是组件内使用 `Composition API` 的入口。

### setup 执行时机

```javascript
export default defineComponent({
  beforeCreate() {
    console.log("----beforeCreate----");
  },
  created() {
    console.log("----created----");
  },
  setup() {
    console.log("----setup----");
  },
});

// 执行结果
// ----setup----
// ----beforeCreate----
// ----created----
```

### setup 参数

- `{Data} props`
- `{SetupContext} context`

setup 中接受的`props`是响应式的，当传入新的 props 时，会及时被更新。由于是响应式，所以**不可以使用 ES6 解构**，解构会消除它的响应式。

> 错误代码示例：

```javascript
// demo.vue
export default {
  setup(props, context) {
    const { name } = props;
    console.log(name);
  },
};
```

setup 接收的第二个参数`context`，在`setup`中无法使用`this`，不能使用 Vue2.x 中常用`this`对象，`context`中提供了`this`中最常用的三个属性：`attr`、`slot`和`emit`，分别对应 Vue2.x 中的`$attr`属性、`slot`插槽 和`$emit`触发自定义事件

> 示例

```javascript
// demo.vue
export default {
  setup(props, { attr, slot, emit }) {
    emit("getUser", data);
  },
};
```

## reactive、ref 与 toRefs

在 vue2.x 中， 定义数据都是在`data`中， 但是 Vue3.x 可以使用`reactive`和`ref`来进行数据定义。
那么`ref`和`reactive`他们有什么区别呢？分别什么时候使用呢？说到这里，我又不得不提一下，看到很多网上不少文章说 (`reactive`用于处理对象的双向绑定，`ref`则处理 js 基础类型的双向绑定)。我其实不太赞同这样的说法，这样很容易初学者认为`ref`就能处理 js 基本类型， 比如`ref`也是可以定义对象的双向绑定的啊， 上段代码：

```javascript
setup() {
  const obj = ref({count:1, name:"张三"})
  setTimeout(() =>{
      obj.value.count = obj.value.count + 1
      obj.value.name = "李四"
  }, 1000)
  return{
      obj
  }
}
```

我们将`obj.count`和`obj.name`绑定到页面上也是可以的；但是`reactive`函数确实可以代理一个对象， 但是不能代理基本类型，例如字符串、数字、boolean 等。 接下来使用代码展示一下`ref`、`reactive`的使用：

```vue
<template>
  <div>
    <p>第 {{ year }} 年</p>
    <p>姓名：{{ user.nickname }}</p>
    <p>年龄：{{ user.age }}</p>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
export default {
  setup() {
    const year = ref(0);
    const user = reactive({
      nickname: "xiaowei",
      age: "24",
      gender: "女",
    });

    return { year, user };
  },
};
</script>
```

绑定到页面是通过`user.name`,`user.age`；这样写感觉很繁琐，我们能不能直接将`user`中的属性解构出来使用呢? 答案是不能直接对`user`进行结构， 这样会消除它的响应式， 这里就和上面我们说`props`不能使用 ES6 直接解构就呼应上了。那我们就想使用解构后的数据怎么办，解决办法就是使用`toRefs`。
toRefs 用于将一个 `reactive` 对象转化为属性全部为 `ref` 对象的普通对象。具体使用方式如下：

```vue
<template>
  <div>
    <p>第 {{ year }} 年</p>
    <p>姓名： {{ nickname }}</p>
    <p>年龄： {{ age }}</p>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
export default {
  setup() {
    const year = ref(0);
    const user = reactive({
      nickname: "xiaowei",
      age: "24",
      gender: "女",
    });

    return {
      year,
      // 使用reRefs
      ...toRefs(user),
    };
  },
};
</script>
```

## 生命周期

![生命周期示意图](https://www.vue3js.cn/docs/zh/images/lifecycle.png)

## `computed`、`watch` 与 `watchEffect` 的用法

`computed`

> 使用 `getter` 函数，并为从 `getter` 返回的值返回一个不变的响应式 `ref` 对象。

```javascript
const count = ref(1);
const plusOne = computed(() => count.value + 1);

console.log(plusOne.value); // 2

plusOne.value++; // error
```

`watchEffect`

> 在响应式地跟踪其依赖项时立即运行一个函数，并在更改依赖项时重新运行它。

```javascript
const count = ref(0);

watchEffect(() => console.log(count.value));
// -> logs 0

setTimeout(() => {
  count.value++;
  // -> logs 1
}, 100);
```

`watch`

### 侦听一个单一源

侦听器 `data` 源可以是返回值的 `getter` 函数，也可以是 `ref`：

```javascript
// 侦听一个getter
const state = reactive({ count: 0 });
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
);

// 直接侦听一个ref
const count = ref(0);
watch(count, (count, prevCount) => {
  /* ... */
});
```

### 侦听多个源

侦听器还可以使用数组同时侦听多个源：

```javascript
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
});
```

### 侦听复杂的嵌套对象

我们实际开发中，复杂数据随处可见， 比如：

```js
const state = reactive({
  room: {
    id: 100,
    attrs: {
      size: "140平方米",
      type: "三室两厅",
    },
  },
});
watch(
  () => state.room,
  (newType, oldType) => {
    console.log("新值:", newType, "老值:", oldType);
  },
  { deep: true }
);
```

### 停止侦听

当 `watchEffect` 在组件的 `setup()` 函数或生命周期钩子被调用时，侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止。

在一些情况下，也可以显式调用返回值以停止侦听：

```js
const stop = watchEffect(() => {
  /* ... */
});

// later
stop();
```

## Teleport

我们希望 Dialog 渲染的 dom 和顶层组件是兄弟节点关系, 在 index.html 文件中定义一个供挂载的元素:

```html
<body>
  <div id="app"></div>
  <div id="dialog"></div>
</body>
```

定义一个 Dialog 组件 Dialog.vue, 留意 to 属性， 与上面的 id 选择器一致：

```vue
<template>
  <teleport to="#dialog">
    <div class="dialog">
      <div class="dialog_wrapper">
        <div class="dialog_header" v-if="title">
          <slot name="header">
            <span>{{ title }}</span>
          </slot>
        </div>
      </div>
      <div class="dialog_content">
        <slot></slot>
      </div>
      <div class="dialog_footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </teleport>
</template>
```

> 效果就是不管你组件用在哪里，那个 `DOM` 层级，最终渲染都会在你指定的 `DOM` 下

## 与 `Vue2.x` 的差异

### slot 具名插槽语法

- `Vue2.x`

在 Vue2.x 中， 具名插槽的写法：

```html
<!-- 子组件 -->

<slot name="title"></slot>

<!-- 父组件 -->
<template slot="title">
  <h1>标题</h1>
  <template></template
></template>
```

如果我们要在 slot 上面绑定数据，可以使用作用域插槽，实现如下：

```html
<!-- 子组件 -->
<slot name="content" :data="data"></slot>

<script>
  export default {
    data() {
      return {
        data: ["走过来人来人往", "不喜欢也得欣赏", "陪伴是最长情的告白"],
      };
    },
  };
</script>

<!-- 父组件 -->
<template slot="content" slot-scope="scoped">
  <div v-for="item in scoped.data">{{item}}</div>
</template>
```

- `Vue3.x`

在 Vue3.0 中将slot和slot-scope进行了合并同意使用。 Vue3.0 中v-slot：

```html
<!-- 父组件中使用 -->
 <template v-slot:content="scoped">
   <div v-for="item in scoped.data">{{item}}</div>
</template>

<!-- 也可以简写成： -->
<template #content="{data}">
    <div v-for="item in data">{{item}}</div>
</template>
```

## `v-model` 升级



