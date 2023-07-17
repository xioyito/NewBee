
English | [简体中文](https://github.com/xioyito/NewBee/blob/master/README.zh-cn.md)

## Preview
---
![NewBee-Preview-1](https://raw.githubusercontent.com/xioyito/NewBee/main/images/preview-1.png "light-mode")
![NewBee-Preview-2](https://raw.githubusercontent.com/xioyito/NewBee/main/images/preview-2.png "dark-mode")
![NewBee-Preview-3](https://raw.githubusercontent.com/xioyito/NewBee/main/images/preview-3.png "categories taxonomy")
![NewBee-Preview-4](https://raw.githubusercontent.com/xioyito/NewBee/main/images/preview-4.png "local search")

## Demo Site
You can see this theme in action on [demo site](https://xioyito.top).

## Features
* Functions
    * local search without any configuration
    * multi-language
    * Syntax Highlight
    * Custom Header
    * Custom footer
    * night mode
    * A sidebar can be open or close at all times
    * Extended Shortcodes
    * Valine comment
    * Music player based on Aplayer and MetingJS
    * Count of Visitor and views
* Components
    * Archive(posts) page
    * Categories taxonomy
    * Tags taxonomy
    * series taxonomy
    * Author card
    * Pre and Next button
    * sponsor card
* Other
    * Responsive
    * Light-Neumorphism style
    * High interaction
    * Smooth transitions

## Quick Start
For more information, please go to: <https://gohugo.io/getting-started/quick-start/>

### Install Hugo(extended version)
The following is For macOS system, other systems see: <https://gohugo.io/getting-started/installing/>

#### Homebrew
``` bash
~ % brew install hugo
```

#### MacPorts
``` bash
~ % port install hugo
```

### install NewBee
First, you need to create a new site(e.g. my-blog) by Hugo:
``` bash
~ % hugo new site my-blog
```

You have 2 methods to install NewBee after creating a new site:
#### Method 1

download the theme manually by going to <https://github.com/xioyito/NewBee> and pasting it to `themes` in your root directory.

#### Method 2

clone it directly to `themes`:
``` bash
~ % cd my-blog
my-blog % git clone https://github.com/xioyito/NewBee.git themes/NewBee
```

### Configuration
That's simple, just copy the file `NewBee/config-example/hugo.toml` to your Hugo root directory.

### First post
create a new post:
``` bash
my-blog % hugo new "posts/first-post.md"
```
create about page:
``` bash
my-blog % hugo new "about/_index.md"
```
Now:
``` bash
my-blog % hugo server -D
```
go to <http://localhost:1313/> in your browser. From now your browser will refresh automatically when the files in your site changes , so you don’t need to refresh your browser every time.

## Customize NewBee
if you want to override some of the styles, just create a file `static/css/_custom.css` and add your own styles into this file.

## Help NewBee be better
### Found a bug?
If you find any bugs, welcome to use [Issue](https://github.com/xioyito/NewBee/issues) or create a new [Pull Request](https://github.com/xioyito/NewBee/pulls)  to fix the issue.

### A NewBee theme user?
I'd appreciate your support, if you want to share your site, please make a contribution and add your site to the [list](https://github.com/xioyito/NewBee/blob/master/USERS.md).


## Sponsoring
If you like the theme and support my work, just do:
* [Alipay](https://github.com/xioyito/NewBee/raw/master/images/Alipay.jpeg)
* [Wechat](https://github.com/xioyito/NewBee/raw/master/images/Wechat.jpeg)

Thank you.

## License
Copyright © 2022 [xioyito](https://github.com/xioyito)

NewBee theme is released under the MIT License, see more: <https://github.com/xioyito/NewBee/blob/master/LICENSE>

