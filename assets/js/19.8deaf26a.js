(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{434:function(e,v,_){"use strict";_.r(v);var t=_(2),o=Object(t.a)({},(function(){var e=this,v=e._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[v("h2",{attrs:{id:"背景"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#背景"}},[e._v("#")]),e._v(" 背景")]),e._v(" "),v("p",[e._v("为了提升团队工作效率，团队制定了 Git 分支管理规范，搭配云效 DevOps 流水线实现自动化部署。")]),e._v(" "),v("h2",{attrs:{id:"分支类型"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#分支类型"}},[e._v("#")]),e._v(" 分支类型")]),e._v(" "),v("ul",[v("li",[v("code",[e._v("master")]),e._v(" 分支：主要分支也是保护分支，用于部署生产环境，只能由 release，fix 分支合并。不允许任何人直接本地提交代码")]),e._v(" "),v("li",[v("code",[e._v("develop")]),e._v(" 分支：开发分支同样也是保护分支，从"),v("code",[e._v("master")]),e._v("分支切出，保持最新开发完成代码的同步。")]),e._v(" "),v("li",[v("code",[e._v("feature")]),e._v(" 分支：新功能分支，基于 "),v("code",[e._v("develop")]),e._v(" 分支创建，功能开发完成后合并入 "),v("code",[e._v("develop")]),e._v(" 分支，命名格式 feature/xx")]),e._v(" "),v("li",[v("code",[e._v("beta")]),e._v(" 分支：测试环境分支，基于 "),v("code",[e._v("develop")]),e._v(" 分支创建，用于触发云效测试流水线，测试通过后合并回"),v("code",[e._v("develop")]),e._v("，命名格式 beta/xx")]),e._v(" "),v("li",[v("code",[e._v("release")]),e._v(" 分支：预发布环境分支，基于 "),v("code",[e._v("develop")]),e._v(" 分支创建，用于触发云效预发布流水线，测试通过后合并回"),v("code",[e._v("develop")]),e._v("和"),v("code",[e._v("master")]),e._v("，命名格式 release/xx")]),e._v(" "),v("li",[v("code",[e._v("fix")]),e._v(" 分支：线上紧急 BUG 修复分支，基于"),v("code",[e._v("master")]),e._v("创建，修复完成后创建"),v("code",[e._v("release")]),e._v("分支进行测试并且删除该分支，通过后将"),v("code",[e._v("release")]),e._v("合并回"),v("code",[e._v("master")]),e._v("然后同步修改到"),v("code",[e._v("develop")])])]),e._v(" "),v("blockquote",[v("p",[e._v("tips：开发结束后远程只保留 master 和 develop 其他分全部删除。"),v("a",{attrs:{href:"https://learngitbranching.js.org/?locale=zh_CN&NODEMO=",target:"_blank",rel:"noopener noreferrer"}},[e._v("Git练习网址"),v("OutboundLink")],1)])])])}),[],!1,null,null,null);v.default=o.exports}}]);