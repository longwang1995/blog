---
title: Tinymce + Vue
description: Tinymce在Vue中是正确姿势
date: 2021-06-02
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

### 安装依赖

```sh
npm install @tinymce/tinymce-vue tinymce --save

yarn add @tinymce/tinymce-vue tinymce
```

### Vue 中使用

1. 在 `node_module/tinymce` 中复制出相关文件夹到 `public/tinymce`

2. 使用方法

- 引入文件

```vue
<template>
  <Editor
    ref="editor"
    :init="init"
    :value="value"
    @input="handleInput"
  ></Editor>
</template>

<script>
import tinymce from "tinymce/tinymce"
import Editor from "@tinymce/tinymce-vue"
import "tinymce/icons/default/icons"
import "tinymce/themes/silver/theme"
import "tinymce/plugins/advlist"
import "tinymce/plugins/autolink"
import "tinymce/plugins/lists"
import "tinymce/plugins/link"
import "tinymce/plugins/image"
import "tinymce/plugins/media"
import "tinymce/plugins/table"
import "tinymce/plugins/colorpicker"
import "tinymce/plugins/hr"
import "tinymce/plugins/preview"

mounted() {
  tinymce.init({})
}
</script>
```

- 配置中文
  > 请到官网下载：[language-packages](https://www.tiny.cloud/get-tiny/language-packages/)

```vue
<script>
data() {
  return {
    init: {
      language_url: "tinymce/langs/zh_CN.js",
      language: "zh_CN",
    }
  }
}
</script>
```

- `plugins` 和 `toolbar` 配置：
  > `toolbar`中按钮分组可用通过 | 符号分隔开

```vue
<script>
data() {
  return {
    init: {
      plugins: [
        "advlist autolink lists link image hr preview",
        "media table",
      ],
      toolbar: [
        "undo redo | formatselect | fontsizeselect forecolor backcolor | bold italic underline lineheight | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | blockquote hr link unlink| removeformat | table media image preview | customInsertButton ",
      ],
    }
  }
}
</script>
```

- 自定义上传图片和视频

```vue
<script>
data() {
  return {
    init: {
      // 配置图片视频上传
      automatic_uploads: true,
      image_title: true,
      file_picker_types: "media image",
      file_picker_callback: (cb, value, meta) => {
        const input = document.createElement("input")
        input.setAttribute("type", "file")
        // media=>视频，通过meta.filetype参数可以判断上传类型
        input.setAttribute("accept", meta.filetype === "media" ? "video/*" : "image/*")
        input.onchange = async () => {
          const file = input.files[0]
          const res = await upload(file)
          cb(res.url, { title: file.name })
        }
        input.click()
      }
    }
  }
}
</script>
```

- 添加自定义 `button`

```vue
<script>
data() {
  return {
    init: {
      toolbar: ["undo redo | formatselect | customInsertButton"]
      setup: (editor) => {
        editor.ui.registry.addButton("customInsertButton", {
          icon: "new-tab",
          tooltip: "秀米",
          text: "秀米",
          onAction: () => {
            window.open("http://xiumi.us/studio/v5#/paper", "xiumi");
          },
        });
      },
    }
  }
}
</script>
```

- 使用自定义 `video` 模板

```vue
<script>
data() {
  return {
    init: {
      video_template_callback: (data) => {
        return `<video src="${data.source }" style="max-width: 100%;" width='auto' height='auto' controls preload='metadata'><video>`
      },
  }
  }
}
</script>
```
