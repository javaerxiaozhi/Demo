# VitePress + Github Pages搭建博客

------

## 前言

最近借助VitePress搭建了个人博客网站，于是就顺便写了这篇博客记录一下过程。这里吐槽一下，其实一开始我是打算用VuePress搭建的，找教程试了一下，用的是最新版本，但我发现它的热更新有bug（热更新失效），虽然后搜了一下有解决bug的办法，但是我对后期网站的维护更新还是有点担忧，如果冷不丁再来一个bug那怎么办，而且官方是比较推荐使用VitePress的，下面是官方的说法

![image-20250120210504091](imgs/image-20250120210504091.png)

VitePress官网地址：https://vitepress.dev/

博客地址：https://javaerxiaozhi.github.io/Interview-Notes/

## 准备工作

首先需要本地安装Node.js，18版本及以上的。推荐去下载nvm，方便安装、卸载和切换多个版本的 Node.js。

包管理工具推荐使用pnpm，命令行安装

```sh
npm install -g pnpm
```

建议同个项目不要使用多个包管理工具，不然可能会出现奇奇怪怪的问题。

这是我node和pnpm的版本

![image-20250125231058211](imgs/image-20250125231058211.png)

版本不一样一般也没什么问题，如果出现问题就换成跟我一样的版本即可。

## 初始化项目

新建项目文件夹，然后在文件夹下打开命令行窗口

**安装 VitePress**

```sh
pnpm add -D vitepress
```

**初始化 VitePress**

```sh
pnpm vitepress init
```

执行完命令可以看到这个界面

![image-20250125234249926](imgs/image-20250125234249926.png)

简单介绍下我的个人配置

- 第一个是在当前根目录下创建vitepress项目
- 站点标题和描述。后续可以在配置中改
- 选择主题，我的那个博客网站选择的是第二个，可以参考一下
- 是否使用ts，我们个人学习就没必要ts了
- 是否添加脚本到package.json，这个还是需要的，启动命令，打包命令这些都得用

初始化成功后，使用vscode或webstorm打开项目，会看到这样一个目录结构。

![image-20240108190658316](imgs/image-20240108190658316.png)

简单介绍一下每个文件的含义

- .vitepress，最核心的目录
- theme目录，自定义主题配置，css样式等
- config.mjs，最核心的文件，各种配置导航栏、侧边栏、标题什么的都是在这里
- node_modules，安装的依赖
- api-examples.md和markdown-examples.md，官方给的两个示例
- index.md，主页相关
- package.json和pnpm-lock.yml，包管理工具需要用的

**启动项目**

```sh
pnpm run docs:dev
```

![image-20250125235428194](imgs/image-20250125235428194.png)

打开看到这个，说明初始化成功

![image-20240108191252240](imgs/image-20240108191252240.png)

## 自定义配置

### 页面布局

VitePress 提供了三种布局，`doc`， `home`， `page`。

可以通过设置页面 [frontmatter](https://vitepress.dev/zh/reference/frontmatter-config) 选项来选择页面布局。默认为 `doc` 页面。

```markdown
---
layout: doc
---
```

- home：`home` 将生成模板化的“主页”。在此布局中，可以设置额外的选项，例如 `hero` 和 `features` 以进一步自定义内容。
- doc：`doc` 是默认布局，它将整个 Markdown 内容设置为“documentation”外观，其实就是 md 文档生成的网页那种布局。
- page：`page` 被视为“空白页”。Markdown 仍然会被解析，所有的 Markdown 扩展都和 `doc` 布局一样运行，但它没有任何默认样式。

详情查看官网说明：[布局 | VitePress](https://vitepress.dev/zh/reference/default-theme-layout)

### 美化主页

对于主页，我们有以下9个地方可以自定义

![image-20250126000828149](imgs/image-20250126000828149.png)

2-6是在index.md文件中自定义的，简单介绍一下对应关系

`name<==>2` `text<==>3` `tagline<==>4` `actions<==>5` `features<==>6`

需要说明的是，对于5这两个按钮，是可以跳转的，**link指定路径**，比如/api-example就是指向项目根目录下api-example.md这个文件

![image-20250126101548867](imgs/image-20250126101548867.png)

1、7、8、9这四个配置是在config.mjs中配置的其中

`title<==>1` `nav<==>7` `socialLinks<==>8` `footer<==>9`

description是SEO要用的，我们不用关注。

![image-20250126103403133](imgs/image-20250126103403133.png)

最后的效果

![image-20250126103504793](imgs/image-20250126103504793.png)

我们可能还想要对页面进行进一步美化，添加主页 logo 和网页 logo 。可以去这个网站找图片https://www.iconfont.cn/

将图片放在根目录下的public目录下。

![image-20250126111910248](imgs/image-20250126111910248.png)

主页 logo

![image-20250126112107959](imgs/image-20250126112107959.png)

网页 logo

![image-20250126112646780](imgs/image-20250126112646780.png)

最后效果

![image-20250126112807157](imgs/image-20250126112807157.png)

**Tips**

- vitepress原生支持国外的sociallink，如果是国内需要自行复制svg代码。如图：

![image-20240108195501321](imgs/image-20240108195501321.png)



- 添加搜索栏，config.mjs中的themeConfig（更多查看官网[搜索 | VitePress](https://vitepress.dev/zh/reference/default-theme-search)）

  ![image-20240108215134634](imgs/image-20240108215134634.png)

### 美化文章页

默认进来官方给的示例是三边栏的，左边是sidebar的配置，右边是显示的文章目录（默认显示一二级标题）。

![image-20250126114616953](imgs/image-20250126114616953.png)

下面叙述这个是怎么配置的。

#### 左边侧边栏

sidebar可以是数组，也可以是对象。还是修改config.mjs

**数组**

![image-20250126133703164](imgs/image-20250126133703164.png)

每个数组元素中应该包含作为小标题的 `text` 和作为实际导航链接的 `items`。

每个 `link` 都应指定以 `/` 开头的实际文件的路径。如果在链接末尾添加斜杠，它将显示相应目录的 `index.md`。

显示效果

![image-20250126133931366](imgs/image-20250126133931366.png)

可以进一步将侧边栏项目嵌入到 6 级深度，从根级别上计数。请注意，深度超过 6 级将被忽略，并且不会在侧边栏上显示。

```javascript
export default {
  themeConfig: {
    sidebar: [
      {
        text: 'Level 1',
        items: [
          {
            text: 'Level 2',
            items: [
              {
                text: 'Level 3',
                items: [
                  ...
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

**对象**

一般我们希望根据不同的页面显示不同的侧边栏，这个时候就要对象这种方式配置侧边栏。

![image-20250126135328410](imgs/image-20250126135328410.png)

显示效果

guide页面

![image-20250126135352882](imgs/image-20250126135352882.png)

config页面

![image-20250126135516528](imgs/image-20250126135516528.png)

#### 右边侧边栏

![image-20250126135800279](imgs/image-20250126135800279.png)

右侧导航栏默认显示的是md文件的一二级标题，可能需要定义显示的标题级别和`On this page`这个说明。这个时候需要在config.mjs中配置下面这两个选项，`outlineTitle`用于替代On this page。`outline`定义展示的标题级别，这里定义2-6级

## 插件

### LaTeX数学公式

VitePress默认的markdown-it解析器是无法渲染LaTeX数学公式的，有两种解决方案：

**一、Katex**

安装markdown-it-katex包

```sh
npm install markdown-it-katex
```

在 `.vitepress/config.mjs`文件中：

```javascript
import { defineConfig } from 'vitepress'
import markdownItKatex from 'markdown-it-katex'

const customElements = [
  'math',
  'maction',
  'maligngroup',
  'malignmark',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mi',
  'mlongdiv',
  'mmultiscripts',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'ms',
  'mscarries',
  'mscarry',
  'mscarries',
  'msgroup',
  'mstack',
  'mlongdiv',
  'msline',
  'mstack',
  'mspace',
  'msqrt',
  'msrow',
  'mstack',
  'mstack',
  'mstyle',
  'msub',
  'msup',
  'msubsup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'semantics',
  'math',
  'mi',
  'mn',
  'mo',
  'ms',
  'mspace',
  'mtext',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'msqrt',
  'mstyle',
  'mmultiscripts',
  'mover',
  'mprescripts',
  'msub',
  'msubsup',
  'msup',
  'munder',
  'munderover',
  'none',
  'maligngroup',
  'malignmark',
  'mtable',
  'mtd',
  'mtr',
  'mlongdiv',
  'mscarries',
  'mscarry',
  'msgroup',
  'msline',
  'msrow',
  'mstack',
  'maction',
  'semantics',
  'annotation',
  'annotation-xml'
]

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(markdownItKatex)
    }
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag)
      }
    }
  }
})
```

在 **.md文件中引入Katex的样式文件

```markdown
---
head:
  - - link
    - rel: stylesheet
      href: https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css
---
# KaTeX Demo
$\sqrt{3x-1}+(1+x)^2$
```

效果

![](imgs/202308262333511.png)

**二、MathJax**

安装markdown-it-mathjax3包

```sh
npm install markdown-it-mathjax3
```

在 `.vitepress/config.mjs`文件中：

```javascript
import mathjax3 from 'markdown-it-mathjax3';

const customElements = [
	'mjx-container',
    'mjx-assistive-mml',
	'math',
	'maction',
	'maligngroup',
	'malignmark',
	'menclose',
	'merror',
	'mfenced',
	'mfrac',
	'mi',
	'mlongdiv',
	'mmultiscripts',
	'mn',
	'mo',
	'mover',
	'mpadded',
	'mphantom',
	'mroot',
	'mrow',
	'ms',
	'mscarries',
	'mscarry',
	'mscarries',
	'msgroup',
	'mstack',
	'mlongdiv',
	'msline',
	'mstack',
	'mspace',
	'msqrt',
	'msrow',
	'mstack',
	'mstack',
	'mstyle',
	'msub',
	'msup',
	'msubsup',
	'mtable',
	'mtd',
	'mtext',
	'mtr',
	'munder',
	'munderover',
	'semantics',
	'math',
	'mi',
	'mn',
	'mo',
	'ms',
	'mspace',
	'mtext',
	'menclose',
	'merror',
	'mfenced',
	'mfrac',
	'mpadded',
	'mphantom',
	'mroot',
	'mrow',
	'msqrt',
	'mstyle',
	'mmultiscripts',
	'mover',
	'mprescripts',
	'msub',
	'msubsup',
	'msup',
	'munder',
	'munderover',
	'none',
	'maligngroup',
	'malignmark',
	'mtable',
	'mtd',
	'mtr',
	'mlongdiv',
	'mscarries',
	'mscarry',
	'msgroup',
	'msline',
	'msrow',
	'mstack',
	'maction',
	'semantics',
	'annotation',
	'annotation-xml',
];

export default {
  markdown: {
    config: (md) => {
      md.use(mathjax3);
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => customElements.includes(tag),
      },
    },
  },
};
```

但是这样会出现一个问题：

![Quicker_20230826_212546.png](imgs/202308262337438.png)

样式显示不正确，我们需要对MathJax插件渲染的样式进行一个修改，我们可以在 .vitepress/theme/ 里添加一个 `mathjax3.css`文件：

```css
mjx-container {
  display: inline-block;
  margin: auto 2px -2px;
}

mjx-container > svg {
  margin: auto;
  display: inline-block;
}
```

还有一个更细节的点，在之前的配置 `.vitepress/config.mjs`文件中，我们定义了一个数组 `customElements`，看起来是一串很长的配置项，这是为了防止Vue给出下面这些警告信息，并且让组件能够正确被解析。

![image.png](imgs/202308262352090.png)

这样将当更新包后会有一些组件无法解析时，只需将组件的名称（报告错误）添加到 `customElements` 数组中即可。

### Mermaid

如果你想要配置mermaid支持(这是一个可以使用md语法绘制流程图，饼状图的md扩展),需要按照下面的步骤操作。 

安装：

```bash
npm i vitepress-plugin-mermaid mermaid -D
```

如果使用pnpm，还需要下面的配置改变pnpm的默认行为兼容插件

```bash
pnpm install --shamefully-hoist
# 或者在根目录新建.npmrc文件，配置
shamefully-hoist=true
```

更改`.vitepress/config.mjs`配置项

```javascript
import { withMermaid } from "vitepress-plugin-mermaid";

// defineConfig—>withMermaid
export default withMermaid({
  mermaid: {
    // refer https://mermaid.js.org/config/setup/modules/mermaidAPI.html#mermaidapi-configuration-defaults for options
  },

  mermaidPlugin: {
    class: "mermaid my-class", // set additional css classes for parent container
  },
```

