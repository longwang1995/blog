---
title: GitFlow工作流
description: GitFlow工作流
date: 2022-10-27
author: 龙旺
sidebar: "auto"
categories:
  - 前端
tags:
  - git
publish: true
---

## 背景

为了提升团队工作效率，团队制定了 Git 分支管理规范，搭配云效 DevOps 流水线实现自动化部署。

## 分支类型

- `master` 分支：主要分支也是保护分支，用于部署生产环境，只能由 release，fix 分支合并。不允许任何人直接本地提交代码
- `develop` 分支：开发分支同样也是保护分支，从`master`分支切出，保持最新开发完成代码的同步。
- `feature` 分支：新功能分支，基于 `develop` 分支创建，功能开发完成后合并入 `develop` 分支，命名格式 feature/xx
- `beta` 分支：测试环境分支，基于 `develop` 分支创建，用于触发云效测试流水线，测试通过后合并回`develop`，命名格式 beta/xx
- `release` 分支：预发布环境分支，基于 `develop` 分支创建，用于触发云效预发布流水线，测试通过后合并回`develop`和`master`，命名格式 release/xx
- `fix` 分支：线上紧急 BUG 修复分支，基于`master`创建，修复完成后创建`release`分支进行测试并且删除该分支，通过后将`release`合并回`master`然后同步修改到`develop`

> tips：开发结束后远程只保留 master 和 develop 其他分全部删除。[Git练习网址](https://learngitbranching.js.org/?locale=zh_CN&NODEMO=)
