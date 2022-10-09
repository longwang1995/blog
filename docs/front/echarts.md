---
title: 在Vue项目中使用 ECharts
description: 在Vue项目中使用Echarts
date: 2021-04-08 9:30:00
author: 龙旺
sidebar: 'auto'
categories:
 - Echarts
tags:
 - Vue
publish: true
---

## NPM 安装 Echarts

你可以使用如下命令通过 npm 安装 ECharts

```sh
npm install echarts --save
&&
yarn add echarts
```

## 引入 Echarts

```js
import * as echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
});
```

## 按需引入 Echarts 图标和组件

`ECharts 5`

```js

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent
} from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use(
    [TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer]
);

// 接下来的使用就跟之前一样，初始化图表，设置配置项
var myChart = echarts.init(document.getElementById('main'));
myChart.setOption({
    ...
});
```

`ECharts 4`

```js
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/grid'
import 'zrender/lib/svg/svg'
```

>需要注意的是注意为了保证打包的体积是最小的，`ECharts` 按需引入的时候不再提供任何渲染器，所以需要选择引入`CanvasRenderer`或者`SVGRenderer`作为渲染器。这样的好处是假如你只需要使用 `svg` 渲染模式，打包的结果中就不会再包含无需使用的`CanvasRenderer`模块。