---
title: TypeScript初体验
description: TypeScript初体验
date: 2021-05-26 09:40:00
author: 龙旺
sidebar: "auto"
categories:
  - 技术分享
tags:
  - TypeScript
publish: true
---

## TypeScript 的基础类型

| 类型             | 示例              | 描述               |
| ---------------- | ----------------- | ------------------ |
| Boolean          | true/false        | 布尔类型           |
| Number           | 1 2 3 4           | 数字类型           |
| String           | '1234'            | 字符串类型         |
| Array            | [1, 2, 3, 4]      | 数组类型           |
| Eunm             | Text              | 枚举               |
| Any              | \*                | 任何类型           |
| Unknown          | \*                | 安全的任何类型     |
| Tuple            | [string, boolean] | 元数组             |
| Void             | 空值(undefined)   | 空值               |
| Null & Undefined | null & undefined  |                    |
| Never            | Text              | 永不存在的值的类型 |

## TypeScript 断言

“尖括号” 语法

```ts
let some: any = "hello word";
let strLength: number = (string > some).length;
```

as 语法

```ts
let some: any = "this is a string";
let strLength: number = (some as string).length;
```

## 接口 `interface`

### 基础

```ts
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

### 可选项

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });
```

### 只读属性

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // error!
```

> TypeScript 具有 `ReadonlyArray<T>` 类型，它与 `Array<T>` 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：

```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // error!
ro.push(5); // error!
ro.length = 100; // error!
a = ro; // error!
```

> 上面代码的最后一行，可以看到就算把整个 ReadonlyArray 赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：

```ts
a = ro as number[];
```

- 额外的属性检查

```ts
interface Man {
  name: string;
  age: number;
  son?: boolean;
}

function getInfo(params: Man): any {
  return params;
}
// error: 'height' not expected in type 'Man'
const a = getInfo({ name: "赵英俊", age: 18, height: 180 });
```

> 添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性

```ts
interface Man {
  name: string;
  age: number;
  son?: boolean;
  [propName: string]: any;
}

function getInfo(params: Man): any {
  return params;
}

const a = getInfo({ name: "赵英俊", age: 18, height: 180 });
console.log(a.height); // => 180
```

### 函数类型

> 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

const mySearch: SearchFunc = (source: string, subString: string) => {
  let result = source.search(subString);
  return result > -1;
};
```

> 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。 比如，我们使用下面的代码重写上面的例子：

```ts
const mySearch: SearchFunc = (src: string, sub: string): (() => boolean) => {
  let result = src.search(sub);
  return result > -1;
};
```

### 可索引的类型

```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray = ["Bob", "Fred"];
let myStr: string = myArray[0];
```

> 你可以将索引签名设置为只读，这样就防止了给索引赋值：

```ts
interface ReadonlyStringArray {
  readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
```

### 类类型

```ts
```