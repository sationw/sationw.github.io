---
layout: note
title: "NumPy 速查表"
date: 2026-07-27
description: "NumPy 常用操作快速参考"
category: "Python/数据科学"
---

## 创建数组

```python
import numpy as np

np.array([1, 2, 3])           # 从列表创建
np.zeros((3, 4))              # 全零数组
np.ones((2, 3))               # 全一数组
np.eye(3)                     # 单位矩阵
np.random.randn(3, 3)         # 随机数组
np.arange(10)                 # 0-9
np.linspace(0, 1, 5)         # 0 到 1 均匀取 5 个数
```

## 数组操作

```python
arr.shape                     # 形状
arr.reshape(3, 4)             # 重塑
arr.T                         # 转置
np.concatenate([a, b])       # 拼接
np.split(arr, 3)             # 分割
```

## 数学运算

```python
arr.sum()                     # 求和
arr.mean()                    # 均值
arr.std()                     # 标准差
arr.max() / arr.min()         # 最大/最小值
np.dot(a, b)                  # 矩阵乘法
```
