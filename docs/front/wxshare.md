---
title: 公众号H5微信分享
description: Gulp的使用
date: 2022-10-29
author: 龙旺
sidebar: "auto"
categories:
  - 前端
tags:
  - 微信
publish: true
---

1. 判断浏览器是否是微信环境

```js
var ua = window.navigator.userAgent.toLowerCase();
  if (/micromessenger/i.test(ua)) {
    ...
  }
```

2. 配置分享内容

```js
const shareConfig = {
  title: title,
  desc: desc,
  link: window.location.href,
  imgUrl: "https://www.51songguo.com/images/wap/gaokao/share.png?v=1",
};
```

3. 向后台获取 config 配置

```js
const config = await getWxConfig();
```

4. 配置 wx.config

```js
wx.config({
  debug: false,
  appId: "...",
  timestamp: res.data.data.timestamp + "",
  nonceStr: res.data.data.noncestr,
  signature: res.data.data.signature,
  jsApiList: [
    "onMenuShareTimeline",
    "onMenuShareAppMessage",
    "onMenuShareQQ",
    "onMenuShareWeibo",
    "onMenuShareQZone",
  ],
});
wx.ready(function() {
  wx.onMenuShareTimeline(shareConfig);
  wx.onMenuShareAppMessage(shareConfig);
  wx.onMenuShareQQ(shareConfig);
  wx.onMenuShareWeibo(shareConfig);
  wx.onMenuShareQZone(shareConfig);
});
```

完整代码：

```js
const initWwixin = async () => {
  var ua = window.navigator.userAgent.toLowerCase();
  if (/micromessenger/i.test(ua)) {
    const shareConfig = {
      title: title,
      desc: desc,
      link: window.location.href,
      imgUrl: "https://www.51songguo.com/images/wap/gaokao/share.png?v=1",
    };

    const config = await getWxConfig();

    wx.config({
      debug: false,
      appId: "...",
      timestamp: res.data.data.timestamp + "",
      nonceStr: res.data.data.noncestr,
      signature: res.data.data.signature,
      jsApiList: [
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
        "onMenuShareWeibo",
        "onMenuShareQZone",
      ],
    });
    wx.ready(function() {
      wx.onMenuShareTimeline(shareConfig);
      wx.onMenuShareAppMessage(shareConfig);
      wx.onMenuShareQQ(shareConfig);
      wx.onMenuShareWeibo(shareConfig);
      wx.onMenuShareQZone(shareConfig);
    });
  }
};
```
