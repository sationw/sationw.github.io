---
layout: post
title: "Python 数据科学入门指南"
date: 2026-07-29 14:00:00 +0800
categories: [Python, 数据科学]
tags: [Python, NumPy, Pandas, 入门]
---

数据科学是当今最热门的领域之一，而 Python 是数据科学的首选语言。本文将介绍 Python 数据科学的基础工具链。

## 核心工具

### NumPy

NumPy 是 Python 数值计算的基础库，提供了高性能的多维数组对象。

```python
import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])
print(arr.mean())  # 3.0
print(arr.sum())   # 15
```

### Pandas

Pandas 提供了 DataFrame 数据结构，让数据处理变得简单直观。

```python
import pandas as pd

# 创建 DataFrame
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 35],
    'city': ['北京', '上海', '深圳']
})
print(df.head())
```

### Matplotlib

数据可视化利器，可以创建各种统计图表。

```python
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]
plt.plot(x, y)
plt.xlabel('X')
plt.ylabel('Y')
plt.title('简单折线图')
plt.show()
```

## 学习路线

1. **Python 基础** — 变量、数据类型、控制流、函数
2. **NumPy** — 数组操作、数学运算
3. **Pandas** — 数据加载、清洗、分析
4. **Matplotlib / Seaborn** — 数据可视化
5. **Scikit-learn** — 机器学习入门

希望这份指南对你有所帮助！🚀
