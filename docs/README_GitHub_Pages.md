# GitHub Pages 部署解决方案

## 问题诊断
GitHub Pages 白屏通常由以下原因引起：
1. 资源路径问题（绝对路径 vs 相对路径）
2. SPA 路由问题（刷新页面 404）
3. Jekyll 处理问题
4. 存储访问权限问题

## 解决方案

### 1. 已创建的文件

#### index.html
- 添加了 `<base href="./" />` 标签处理基础路径
- 安全替换了 localStorage 和 sessionStorage
- URL 规范化处理

#### 404.html
- GitHub Pages 专用路由重定向页面
- 处理 SPA 路由刷新问题

#### .nojekyll
- 禁用 GitHub Pages 的 Jekyll 处理
- 防止以下划线开头的文件被忽略

### 2. 部署步骤

1. 将所有文件推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择源分支（通常是 main 或 gh-pages）
4. 等待部署完成（通常需要几分钟）

### 3. 验证部署

访问：`https://<your-username>.github.io/<repo-name>/`

## 文件结构

```
www/
├── index.html          # 主页面
├── 404.html            # 路由重定向页面
├── .nojekyll           # 禁用 Jekyll
├── server.js           # 本地开发服务器
├── favicon.svg         # 图标
├── assets/             # 资源文件
│   ├── index-BIvBQkjC.js
│   └── index-Bih4pgCf.css
└── README_GitHub_Pages.md  # 本文件
```

## 技术说明

### 资源路径处理
使用相对路径（`./assets/`）而不是绝对路径（`/assets/`），确保在任何子路径下都能正确加载资源。

### Storage 安全包装
在受限环境（如 iframe、PakePlus）中，使用内存存储替代浏览器 storage API。

### SPA 路由处理
通过 404.html + 重定向机制，确保刷新页面时能正确返回应用。
