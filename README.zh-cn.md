

简体中文 | [English](https://github.com/xioyito/NewBee/blob/master/README.md)

## 预览
![NewBee Preview](https://raw.githubusercontent.com/xioyito/NewBee/main/images/desktop-preview.png)

## 示例网站
查看 [示例网站](https://xioyito.github.io)。

## 浏览器支持
完美支持的浏览器：

* Chrome
* Edge

其他浏览器支持待优化中。

## 特性
* 功能
    * 代码高亮
    * 自定义导航栏
    * 自定义页脚
    * 深色模式
    * 可随时打开和关闭的侧边栏
    * 文章页面返回顶部
    * 扩展的 Shortcodes
    * Valine 评论系统
    * 基于 APlayer 和 MetingJS 的音乐播放器
    * 站点访客数和站点访问量统计
    * 赞赏
* 组件
    * 归档（文章）页面
    * 分类页面
    * 标签页面
    * 系列页面
    * 作者卡片
    * 切换上下篇按钮
    * 赞赏
* 其它
    * 响应式布局
    * 轻拟物风格
    * 更好的交互性
    * 顺滑的过渡效果

## 快速开始
详情请移步: <https://gohugo.io/getting-started/quick-start/>。

### 安装 Hugo(extended 版本)
以下安装过程针对macOS系统，其他操作系统请移步: <https://gohugo.io/getting-started/installing/>。

#### Homebrew
``` bash
~ % brew install hugo
```

#### MacPorts
``` bash
~ % port install hugo
```

### 安装 NewBee
首先你需要通过 hugo new 命令创建一个新的网站（如：my-blog）：
``` bash
~ % hugo new site my-blog
```

在创建完新的网站后你有3种方法来安装 NewBee：
#### 方法 1

从 <https://github.com/xioyito/NewBee> 下载 NewBee 主题，然后放到根目录里 `themes` 文件夹中。

#### 方法 2

将主题克隆到 `themes` 目录下。
``` bash
my-blog % git clone https://github.com/xioyito/NewBee.git themes/NewBee
```
#### 方法 3
为了方便更新主题，你可以将其作为你网站的子模块来安装：
``` bash
~ % cd my-blog
my-blog % git init
my-blog % git submodule add https://github.com/xioyito/NewBee.git themes/NewBee
```

### 配置
把文件 `NewBee/config-example/config.toml` 复制到你的网站根目录即可。

### 新文章
创建一篇新的文章:
``` bash
my-blog % hugo new "posts/first-post.md"
```
创建关于页面：
``` bash
my-blog % hugo new "about/_index.md"
```
现在：
``` bash
my-blog % hugo server -D
```
浏览器打开 <http://localhost:1313/>。现在当你网站的文件发生改变后，网页会自动刷新，所以你不用每次都需要去手动刷新了。

## 自定义 NewBee
如果你想更改某些样式，只需要在 `static/css` 目录里创建一个文件 `_custom.css` ，然后在里面加入你自己的样式即可。

## 更新 NewBee
``` bash
my-blog % git submodule update --rebase --remote
```

## 帮助 NewBee 变得更好
### 发现问题？
如果你在使用过程中发现了任何问题，欢迎在 [Issues](https://github.com/xioyito/NewBee/issues) 提问或者创建一个新的 [Pull Request](https://github.com/xioyito/NewBee/pulls) 来解决问题。

### NewBee 主题的使用者?

非常感谢你的支持，如果你想分享你的网站，可以将它添加到[这里](https://github.com/xioyito/NewBee/edit/master/USERS.md)。


## 赞赏
你的支持是我持续的动力：
* [Alipay](https://github.com/xioyito/NewBee/raw/master/images/Alipay.jpeg)
* [Wechat](https://github.com/xioyito/NewBee/raw/master/images/Wechat.jpeg)

谢谢。

## License
Copyright © 2022 xioyito

NewBee 主题遵循 MIT 协议，详情请移步：<https://github.com/xioyito/NewBee/blob/master/LICENSE>
