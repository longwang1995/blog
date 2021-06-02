module.exports = {
  title: "一路向北",
  description: "个人博客",
  theme: "reco",
  base: "/blog/",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  head: [
    ["meta", { name: "viewport", content: "width=device-width,initial-scale=1,user-scalable=no" }],
    ["meta", { name: "google", value: "notranslate" }],
    ["link", { rel: "icon", href: "/logo.jpg" }],
  ],
  plugins: ["@vuepress/nprogress"],
  themeConfig: {
    logo: "/logo.jpg",
    authorAvatar: "/logo.jpg",
    auth: "一路向北",
    type: "blog",
    sidebarDepth: "3",
    lastUpdated: "最近更新时间",
    subSidebar: "auto",
    smoothScroll: true,
    codeTheme: 'tomorrow',
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: "分类",
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: "标签",
      },
    },
    nav: [
      { text: "主页", link: "/" },
      { text: "个人简介", link: "/outh/", icon: "reco-blog" },
      { text: "时间轴", link: "/timeline/", icon: "reco-date" },
      { text: "片库", link: "/movie/", icon: "reco-document" },
      { text: "GitHub", link: "https://github.com/longwang1995", icon: "reco-github", target: "_blank" },
    ],
  }
};
