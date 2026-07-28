# CBRC.github.io

🎯 个人博客网站 | Personal Blog & Portfolio

基于 GitHub Pages + Jekyll 构建的个人网站。

## 技术栈

- **框架**: Jekyll (GitHub Pages 原生支持)
- **样式**: 纯 CSS (自定义设计)
- **图标**: Font Awesome 6
- **部署**: GitHub Pages

## 本地运行

### 方式一：使用 Ruby

```bash
# 安装依赖
bundle install

# 本地运行
bundle exec jekyll serve

# 访问 http://localhost:4000
```

### 方式二：使用 Docker

```bash
docker run --rm -v "$PWD:/srv/jekyll" -p 4000:4000 jekyll/jekyll jekyll serve
```

## 目录结构

```
├── _config.yml          # 网站配置
├── _layouts/            # 布局模板
│   ├── default.html     # 默认布局
│   ├── post.html        # 文章布局
│   ├── page.html        # 页面布局
│   ├── project.html     # 项目布局
│   └── note.html        # 笔记布局
├── _posts/              # 博客文章 (Markdown)
├── _projects/           # 项目展示
├── _notes/              # 学习笔记
├── assets/              # 静态资源
│   ├── css/main.css     # 样式文件
│   ├── js/main.js       # JavaScript
│   └── images/          # 图片
├── index.html           # 首页
├── about.md             # 关于页面
├── blog.md              # 博客列表
├── projects.md          # 项目列表
└── notes.md             # 笔记列表
```

## 如何添加内容

### 写博客文章
在 `_posts/` 目录下创建 `YYYY-MM-DD-title.md` 文件。

### 添加项目
在 `_projects/` 目录下创建 `.md` 文件。

### 添加笔记
在 `_notes/` 目录下创建 `.md` 文件。
