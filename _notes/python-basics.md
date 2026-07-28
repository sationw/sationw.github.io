---
layout: note
title: "Python 基础速查手册"
date: 2026-07-28
description: "Python 编程语言核心知识点速查"
category: "Python"
---

## 数据类型

| 类型 | 示例 | 说明 |
|------|------|------|
| `int` | `42` | 整数 |
| `float` | `3.14` | 浮点数 |
| `str` | `"hello"` | 字符串 |
| `bool` | `True` | 布尔值 |
| `list` | `[1, 2, 3]` | 列表 |
| `dict` | `{"a": 1}` | 字典 |
| `tuple` | `(1, 2)` | 元组 |
| `set` | `{1, 2, 3}` | 集合 |

## 常用操作

### 列表推导式

```python
squares = [x**2 for x in range(10)]
```

### 字典操作

```python
d = {"name": "Alice", "age": 25}
d.get("name")  # "Alice"
d.keys()       # dict_keys(['name', 'age'])
d.values()     # dict_values(['Alice', 25])
```

### 文件操作

```python
with open("file.txt", "r", encoding="utf-8") as f:
    content = f.read()
```
