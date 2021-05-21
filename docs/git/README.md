---
title: Git基础操作
description:  Git基础操作
date: 2021-03-27 23:49:00
author: 龙旺
sidebar: 'auto'
categories:
 - 技术分享
 - 其他
tags:
 - Git
publish: true
---
# git基础操作
## 1.git配置命令
>查询配置
1. 列出当前配置：`git config --list`
2. 列出repository配置：`git config --local --list`
3. 列出全局配置：`git config --global --list`
4. 列出系统配置：`git config --system --list`
>第一次使用git，配置用户名
1. 配置用户名：`git config --global user.name "your name"`
2. 配置用户邮箱：`git config --global user.email "your email"`

## 2.工作区上的操作命令
>新建仓库
1. 新建项目文件夹然后执行`git init`
2. 从远程git仓库复制项目：`git clone <url>`，可以在clone命令后指定新的项目名：`git clone <url> <name>`
>提交
1. 提交工作区所有文件到暂存区：`git add .`
2. 提交工作区指定文件到暂存区：`git add <file1> <file2> ...`
3. 提交工作区中某个文件夹中所有文件到暂存区：`git add [dir]`
>撤销
1. 删除工作区文件，并且也从暂存区删除对应文件的记录：`git rm <file1> <file2>`
2. 从暂存区中删除文件，但是工作区依然还有该文件： `git rm --cached <file>`
3. 取消暂存区已经暂存的文件：`git reset HEAD <file>...`
4. 撤销文件修改：`git checkout --<file>`
5. 储藏工作，以便能切换分支：`git stash`
6. 查看储藏的工作：`git stash list`
7. 应用最新的储藏：`git stash apply`，应用指定储藏：`git stash apply stash@{index}`
8. 使用apply命令只是应用储藏，内容任然在栈上。需要移除指定的储藏：`git stash drop stash{0}`
>查看信息
1. 查询当前工作区所有文件的状态：`git status`
2. 比较工作区文件与暂存区之间的差异：`git diff`,`git diff <filename>`

## 3.暂存区的操作命令
>提交文件到版本库
1. 将暂存区中的文件提交到本地仓库中，即打上新版本：`git commit -m "commit_info"`
2. 将所有已经使用git管理过的文件暂存后一并提交，跳过add到暂存区的过程：`git commit -a -m "commit_info"`
3. 撤销上一次提交：`git commit --amend`
>查看信息
1. 比较暂存区与上一版本的差异：`git diff --cached`
2. 指定文件在暂存区和本地仓库的不同：`git diff <file-name> --cached`
3. 查看提交历史：`git log`
>打标签
1. 列出现在所有的标签：`git tag`
2. 使用特定的搜索模式列出符合条件的标签，例如只对1.4.2系列的版本感兴趣：`git tag -l "v1.4.2.*"`
3. 创建一个含附注类型的标签，需要加-a参数，如：`git tag -a v1.4 -m "my version 1.4"`
4. 使用git show命令查看相应标签的版本信息，并连同显示打标签时的提交对象：`git show v1.4`
5. 如果有自己的私钥，可以使用GPG来签署标签，只需要在命令中使用-s参数：`git tag -s v1.5 -m "my signed 1.5 tag"`
6. 验证已签署的标签：git tag -v，如：`git tag -v v1.5`
7. 创建轻量级标签：`git tag v1.4`
8. 将标签推送到远程仓库中：`git push origin v1.5`, 将本地所有标签全部推送到远程仓库中：`git push origin --tags`
>分制管理
1. 创建分支：`git branch <branch-name>`
2. 从当前所处的分支切换到其他分支：`git checkout <branch-name>`
3. 新建并切换到新建分支上：`git checkout -b <branch-name>`
4. 删除分支：`git branch -d <branch-name>`
5. 将当前分支与指定分支进行合并：`git merge <branch-name>`
6. 显示本地仓库的所有分支：`git branch`
7. 查看各个分支最后一个提交对象的信息：`git branch -v`
8. 查看哪些分支已经合并到当前分支：`git branch --merged`
9. 查看当前哪些分支还没有合并到当前分支：`git branch --no-merged`
10. 把远程分支合并到当前分支：`git merge <remote-name>/<branch-name>`
11. 在远程分支的基础上创建新的本地分支：`git checkout -b <branch-name> <remote-name>/<branch-name>`，如：`git checkout -b serverfix origin/serverfix`
12. 从远程分支checkout出来的本地分支，称之为跟踪分支。在跟踪分支上向远程分支上推送内容：`git push`。该命令会自动判断应该向远程仓库中的哪个分支推送数据；在跟踪分支上合并远程分支：`git pull`
13. 将一个分支里提交的改变移到基底分支上重放一遍：`git rebase <rebase-branch> <branch-name>`，如：`git rebase master server`，将特性分支server提交的改变在基底分支master上重演一遍；使用rebase操作最大的好处是像在单个分支上操作的，提交的修改历史也是一根线；如果想把基于一个特性分支上的另一个特性分支变基到其他分支上，可以使用--onto操作：`git rebase --onto <rebase-branch> <feature branch> <sub-feature-branch>`，如：`git rebase --onto master server client`；使用rebase操作应该遵循的原则是：**一旦分支中的提交对象发布到公共仓库，就千万不要对该分支进行rebase操作**

## 4.本地仓库的操作
1. 查看本地仓库关联的远程仓库：`git remote`；在克隆完每个远程仓库后，远程仓库默认为origin;加上-v的参数后，会显示远程仓库的url地址
2. 添加远程仓库，一般会取一个简短的别名：`git remote add [remote-name] [url]`，比如：`git remote add example git://github.com/example/example.git`
3. 从远程仓库中抓取本地仓库中没有的更新：`git fetch [remote-name]`，如`git fetch origin`;使用fetch只是将远端数据拉到本地仓库，并不自动合并到当前工作分支，只能人工合并。如果设置了某个分支关联到远程仓库的某个分支的话，可以使用`git pull`来拉去远程分支的数据，然后将远端分支自动合并到本地仓库中的当前分支
4. 将本地仓库某分支推送到远程仓库上：`git push [remote-name] [branch-name]`，如`git push origin master`；如果想将本地分支推送到远程仓库的不同名分支：`git push <remote-name> <local-branch>:<remote-branch>`，如`git push origin serverfix:awesomebranch`;如果想删除远程分支：`git push [romote-name] :<remote-branch>`，如`git push origin :serverfix`。这里省略了本地分支，也就相当于将空白内容推送给远程分支，就等于删掉了远程分支
5. 查看远程仓库的详细信息：`git remote show origin`
6. 修改某个远程仓库在本地的简称：`git remote rename [old-name] [new-name]`，如`git remote rename origin org`
7. 移除远程仓库：`git remote rm [remote-name]`

## 5.忽略文件.gitignore
```git
# 此为注释 – 将被 Git 忽略
# 忽略所有 .a 结尾的文件
*.a
# 但 lib.a 除外
!lib.a
# 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
/TODO
# 忽略 build/ 目录下的所有文件
build/
# 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
doc/*.txt
# 忽略 doc/ 目录下所有扩展名为 txt 的文件
doc/**/*.txt
```

## 6.Git子仓库深入浅出
>Git两种子仓库使用方案：`git submodule`|`git subtree`

