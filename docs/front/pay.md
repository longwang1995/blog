---
title: 微信支付的使用【H5，小程序，JSAPI】
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

## 小程序支付

1. 创建订单

```js
/**
 * 去付款
 */
const submit = async () => {
  // 创建订单
  const res = await createCartOrder();

  // 清除购物车
  store.dispatch("cart/setLocalCart");

  try {
    // 微信支付
    await weChatPay(res.order_id);
  } catch (error) {}
  return uni.redirectTo({ url: "/pages/order/list/index" });
};
```

2. 通过订单 ID 去请求后端接口获取支付签名等参数

```js
import { orderPay } from "../api/modules/order";
import { useModal } from "./useModal";

let flag = false;
export const weChatPay = async (id: string) => {
  if (flag) return;
  flag = true;
  await useModal().show("确认支付？");
  uni.showLoading({ title: "正在支付", mask: true });
  return new Promise(async (resolve, reject) => {
    try {
      // 获取requestPayment支付参数
      const option = await orderPay(id);
      // 调起小程序微信支付
      uni.requestPayment({
        ...option,
        complete: () => {
          uni.hideLoading();
          flag = false;
        },
        success: (res: any) => resolve(res),
        fail: ({ errMsg }) => {
          if (errMsg === "requestPayment:fail cancel") {
            uni.showToast({
              title: "支付已取消！",
              mask: true,
              icon: "none",
            });
          } else {
            uni.showToast({
              title: "支付失败！",
              mask: true,
              icon: "none",
            });
          }
          reject(errMsg);
        },
      });
    } catch (error) {
      flag = false;
      uni.hideLoading();
      reject("订单支付失败");
    }
  });
};
```

option 参数：

| 参数名             | 变量      | 类型[长度限制] | 必填 | 描述                                                                                                                                          |
| ------------------ | --------- | -------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 小程序 ID          | appId     | string[1,32]   | 是   | 商户申请的小程序对应的 appid，由微信支付生成，可在小程序后台查看。示例值：wx8888888888888888                                                  |
| 时间戳             | timeStamp | string[1,32]   | 是   | 部分系统取到的值为毫秒级，需要转换成秒(10 位数字)                                                                                             |
| 随机字符串         | nonceStr  | string[1,32]   | 是   | 随机字符串，不长于 32 位。推荐随机。[生成算法](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=4_1)                                  |
| 订单详情扩展字符串 | package   | string[1,128]  | 是   | 小程序下单接口返回的 prepay\*id 参数值，提交格式如：prepay_id=\*\*\*                                                                          |
| 签名方式           | signType  | string[1,32]   | 是   | 签名类型，默认为 RSA，仅支持 RSA                                                                                                              |
| 签名               | paySign   | string[1,512]  | 是   | 签名，使用字段 appId、timeStamp、nonceStr、package[计算得出的签名值 ](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_5_4.shtml#menu1) |

## JSAPI 支付（公众号支付）

1. 安装 jssdk

```js
npm install weixin-js-sdk
```

2. 创建订单获取订单 ID

```js
const orderId = await createOrder();
```

3. 通过订单 ID 去后台获取微信支付的 option 参数

```js
const option = await payOrder(orderId);
```

4. 最后通过传入 option 参数完成支付调用

```js
wePay(option);
```

支付成功后跳回指定页面

option 参数：

| 参数名             | 变量      | 类型[长度限制] | 必填 | 描述                                                                                                                                          |
| ------------------ | --------- | -------------- | ---- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 公众号 APPID       | appId     | string[1,32]   | 是   | 商户申请的小程序对应的 appid，由微信支付生成，可在小程序后台查看。示例值：wx8888888888888888                                                  |
| 时间戳             | timeStamp | string[1,32]   | 是   | 部分系统取到的值为毫秒级，需要转换成秒(10 位数字)                                                                                             |
| 随机字符串         | nonceStr  | string[1,32]   | 是   | 随机字符串，不长于 32 位。推荐随机。[生成算法](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=4_1)                                  |
| 订单详情扩展字符串 | package   | string[1,128]  | 是   | 小程序下单接口返回的 prepay\*id 参数值，提交格式如：prepay_id=\*\*\*                                                                          |
| 签名方式           | signType  | string[1,32]   | 是   | 签名类型，默认为 RSA，仅支持 RSA                                                                                                              |
| 签名               | paySign   | string[1,512]  | 是   | 签名，使用字段 appId、timeStamp、nonceStr、package[计算得出的签名值 ](https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_5_4.shtml#menu1) |

> 注意：JSAPI 支付需要配置支付授权目录

## H5 支付

1. 用户点击下单按钮向后台发起下单请求

```js
// 创建订单获取orderId
const orderId = await createOrder()

// 使用订单ID获取支付跳转URL
const url = await createOrder({
  orderId,
  redirect_url: "", // 微信支付完成后的重定向URL，一般情况就是当前页面地址。
});

// 跳转微信支付界面
location.href = url
```

2. 轮询后台接口查询订单状态。
```js
setInterval(checkOrderStatus, 1000)
```

> 注意：1. 在商户平台设置正确的支付域名。 2. H5支付适用于外部浏览器，微信内请使用JSAPI支付 3. redirect_url需要encode处理