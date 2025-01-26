import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "My Awesome Project",
  description: "A VitePress Site", 
  base: "/Demo/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/开发中.png', // 配置logo位置，public目录
    outlineTitle: '页面导航', // 目录说明
    outline: [1, 6], // 根据标题生成目录深度
    aside: "left", // 设置目录在左侧显示
    nav: [
      { text: '首页', link: '/' },
      { text: '示例', link: '/markdown-examples' },
      { text: '指导', link: '/docs/guide' },
      { text: '配置', link: '/docs/config' }
    ],

    // sidebar: [
    //   {
    //     text: '页面导航1',
    //     items: [
    //       { text: 'Markdown演示1', link: '/markdown-examples' },
    //       { text: 'API运行演示1', link: '/api-examples' }
    //     ]
    //   },
    //   {
    //     text: '页面导航2',
    //     items: [
    //       { text: 'Markdown演示2', link: '/markdown-examples' },
    //       { text: 'API运行演示2', link: '/api-examples' }
    //     ]
    //   }
    // ],

    sidebar: {
      '/docs/guide/': [
        {
          text: 'guide',
          items: [
            { text: '前言', link: '/docs/guide/' },
            { text: '指导one', link: '/docs/guide/one' },
            { text: '指导two', link: '/docs/guide/two' }
          ]
        }
      ],
      'docs/config/': [
        {
          text: 'config',
          items: [
            { text: '前言', link: '/docs/guide/' },
            { text: '配置one', link: '/docs/config/' },
            { text: '配置two', link: '/docs/config/two' } 
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      copyright: 'Copyright © 2024-present VitePress Contributors'
    }
  }
})
