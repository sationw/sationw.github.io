---
layout: project
title: "SgelinLog 文献阅读器 · 桌面版"
date: 2026-08-06
description: "基于 C# WinForms + WebView2 + SQLite 的 Windows 桌面文献阅读与笔记工具"
icon: "fas fa-book-reader"
tech_stack: [C#, .NET 8, WinForms, WebView2, SQLite]
github_url: "https://github.com/sationw"
---

## 项目简介

将原「本地文献阅读器」（Python HTTP 服务 + 浏览器）封装为 **Windows 桌面应用程序**：
**C# WinForms + WebView2 + SQLite**，前端复用原版 `reader.html`（原生 JS，功能 100% 保留）。
全程本地运行、无需联网，纯个人桌面工具。

## 主要功能

- **文献阅读** — WebView2 内置 PDF 阅读器，边读边写笔记
- **笔记管理** — 文字 + 图片笔记，SQLite 存储，自动备份（`notes_backup.db`）
- **数据更新** — 本地 C# 解析 `S*/CNT-OV_*.md` 文献总结 → `data.js`，无需 Python
- **多主题** — 浅色 / 深色 / 护眼绿 / 极简
- **数据目录自定义** — `Literature Cache`、`References and Reading`、`user_data` 三个目录可自由指定位置
- **单文件发布** — win-x64 单文件 exe（框架依赖模式，无需随包内置 .NET 运行时）

## 技术架构

| 层 | 技术 | 说明 |
|----|------|------|
| 外壳 | C# WinForms (.NET 8) | 极低内存开销，毫秒级响应 |
| 渲染 | WebView2（Edge Chromium 内核） | 内嵌浏览器，自带 PDF 阅读器 |
| 前端 | 原版 `reader.html`（原生 HTML/CSS/JS） | 功能 100% 保留，无需 Python / Node 运行时 |
| 通信 | WebView2 消息桥接 | 前端 `fetch("/api/...")` → C# 后端 |
| 数据 | SQLite（Microsoft.Data.Sqlite） | 笔记（文字 + 图片）、设置 |
| 数据管道 | C# 重写 `update_data.py` | 解析 `S*/CNT-OV_*.md` → `data.js`，摆脱 Python |

## 运行方式

双击 `SgelinLog.exe` 即可（首次运行自动创建三个依赖目录；若缺少 `data.js` 自动解析生成）。

- 「⚙️ 设置」中可切换主题、开关笔记备份、查看/更改/恢复三个数据目录位置
- 「🔄 更新数据」= 重新解析文献总结（C# 本地完成，无需 Python）
- PDF 阅读：WebView2 内置 PDF 查看器，边读边写笔记
