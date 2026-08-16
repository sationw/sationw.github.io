---
layout: note
title: "测量不确定度计算 — 参考资料总结"
description: "GUM (JCGM 100:2008) 与 Monte Carlo 方法 (JCGM 101:2008) 的不确定度评定框架，以及反演值与仪器测量值比对的不确定度分析"
category: 测量与数据分析
date: 2026-08-16
---

# 测量不确定度计算 — 参考资料总结

> References：
> - **[1]** **GUM** (JCGM 100:2008) — *Evaluation of measurement data — Guide to the expression of uncertainty in measurement*
> - **[2]** **GUM Supplement 1** (JCGM 101:2008) — *Propagation of distributions using a Monte Carlo method*
---

## 目录

- [一、GUM 不确定度评定框架](#一gum-不确定度评定框架jcgm-1002008)
  - [1.1 基本流程](#11-基本流程)
  - [1.2 不确定度传播定律](#12-不确定度传播定律law-of-propagation-of-uncertainty)
  - [1.3 A 类评定](#13-a-类评定type-a-evaluation)
  - [1.4 B 类评定](#14-b-类评定type-b-evaluation)
  - [1.5 扩展不确定度](#15-扩展不确定度expanded-uncertainty)
- [二、Monte Carlo 不确定度传播方法](#二monte-carlo-不确定度传播方法jcgm-1012008)
  - [2.1 适用场景](#21-适用场景)
  - [2.2 基本步骤](#22-基本步骤)
  - [2.3 自适应 Monte Carlo 方法](#23-自适应-monte-carlo-方法)
  - [2.4 相关性处理](#24-相关性处理)
- [三、反演值与仪器测量值比对的不确定度分析](#三反演值与仪器测量值比对的不确定度分析)
  - [3.1 问题场景](#31-问题场景)
  - [3.2 不确定度来源分析](#32-不确定度来源分析)
  - [3.3 完整计算步骤](#33-完整计算步骤)
  - [3.4 Monte Carlo 方法处理比对](#34-monte-carlo-方法处理比对)
  - [3.5 特殊情况：仪器测量值本身有重复数据](#35-特殊情况仪器测量值本身有重复数据)
- [四、关键公式对照表](#四关键公式对照表)
- [五、参考资料](#五参考资料)
- [六、参考资料位置（PDF页码）](#六参考资料位置pdf页码)

---

## 一、GUM 不确定度评定框架（JCGM 100:2008）

> 参考：[1] JCGM 100:2008

### 1.1 基本流程

> 参考：[1] §8

| 步骤 | 说明 |
|------|------|
| **1. 建立数学模型** | $Y = f(X_1, X_2, \dots, X_N)$，明确被测量 $Y$ 与各输入量 $X_i$ 的关系 |
| **2. 估计输入量** | 确定每个 $X_i$ 的最佳估计值 $x_i$ |
| **3. 评定标准不确定度** | 分别用 A 类或 B 类方法评定 $u(x_i)$ |
| **4. 计算合成标准不确定度** | 应用不确定度传播定律 |
| **5. 确定扩展不确定度** | $U = k \cdot u_c(y)$，通常取 $k=2$（95%置信水平） |
| **6. 报告结果** | $y \pm U$，注明包含因子 $k$ |

### 1.2 不确定度传播定律（Law of Propagation of Uncertainty）

> 参考：[1] §5.1.2

对于模型 $y = f(x_1, x_2, \dots, x_N)$：

$$
u_c^2(y) = \sum_{i=1}^{N} \sum_{j=1}^{N} \frac{\partial f}{\partial x_i} \frac{\partial f}{\partial x_j} u(x_i, x_j)
$$

当输入量**不相关**时简化为：

$$
u_c^2(y) = \sum_{i=1}^{N} \left( \frac{\partial f}{\partial x_i} \right)^2 u^2(x_i)
$$

其中灵敏度系数（sensitivity coefficient）：

$$
c_i = \frac{\partial f}{\partial x_i}
$$

### 1.3 A 类评定（Type A Evaluation）

> 参考：[1] §4.2

基于重复测量的统计分析：

$$
u(x_i) = \frac{s}{\sqrt{n}} = \sqrt{\frac{1}{n(n-1)} \sum_{k=1}^{n} (x_{ik} - \bar{x}_i)^2}
$$

### 1.4 B 类评定（Type B Evaluation）

> 参考：[1] §4.3

基于非统计信息（如校准证书、说明书、经验）：

- **正态分布**：校准证书给出扩展不确定度 $U_p$ 和包含因子 $k_p$，则 $u(x_i) = U_p / k_p$
- **均匀分布**：已知上下限 $[a_-, a_+]$，则 $u(x_i) = (a_+ - a_-) / (2\sqrt{3})$
- **三角分布**：$u(x_i) = (a_+ - a_-) / (2\sqrt{6})$

### 1.5 扩展不确定度（Expanded Uncertainty）

> 参考：[1] §6

$$
U = k \cdot u_c(y)
$$

- 通常取 $k = 2$（约 95% 置信水平）
- 需要高置信度时取 $k = 3$

---

## 二、Monte Carlo 不确定度传播方法（JCGM 101:2008）

> 参考：[2] JCGM 101:2008

### 2.1 适用场景

> 参考：[2] §5.7–5.8

当以下情况时，推荐 MCM 替代 GUM 不确定度框架：

- 模型**非线性**强
- 输入量的 PDF 不对称（Probability Density Function（概率密度函数））
- 输出量的 PDF 明显偏离正态分布或 t 分布
- GUM 方法的有效自由度难以确定

### 2.2 基本步骤

> 参考：[2] §5–§7

#### 阶段一：公式化（Formulation）

1. 定义被测量 $Y$ 和输入量 $X = (X_1, \dots, X_N)^T$
2. 建立测量模型 $Y = f(X)$
3. 为每个 $X_i$ 分配概率密度函数（PDF）

常用 PDF 分配规则（参考 [2] §6.4）：

| 信息类型 | 分配的 PDF |
|---------|-----------|
| 最佳估计值 $x$ + 标准不确定度 $u(x)$ | 高斯分布 $N(x, u^2(x))$ |
| 多次重复测量数据 $x_1, \dots, x_n$ | t 分布 $t_{n-1}(\bar{x}, s^2/n)$ |
| 已知界限 $[a_-, a_+]$ | 均匀分布 $R(a_-, a_+)$ |
| 校准证书（$x, U_p, k_p, \nu_{\text{eff}}$） | t 分布 $t_{\nu_{\text{eff}}}(x, (U_p/k_p)^2)$ |

#### 阶段二：传播（Propagation）

1. 从各输入量的 PDF 中抽取 $M$ 个随机样本
2. 对每组样本计算模型值 $y_r = f(x_{1,r}, \dots, x_{N,r})$

#### 阶段三：汇总（Summarizing）

1. 输出量估计值：
   $$
   \hat{y} = \frac{1}{M} \sum_{r=1}^{M} y_r
   $$

2. 标准不确定度：
   $$
   u(\hat{y}) = \sqrt{\frac{1}{M-1} \sum_{r=1}^{M} (y_r - \hat{y})^2}
   $$

3. 包含区间（coverage interval）：
   - 概率对称区间：取 $[\eta_{\text{low}}, \eta_{\text{high}}]$
   - 最短包含区间：取长度最小的区间

### 2.3 自适应 Monte Carlo 方法

> 参考：[2] §7.9

- 推荐初始试验次数 $M = 10^6$，通常可获得 95% 包含区间的 1-2 位有效数字精度（参考 [2] §7.2）
- 通过逐步增加 $M$ 直到结果达到预设的数值容差

### 2.4 相关性处理

> 参考：[2] §6.4.8

当输入量相关时，使用**多元高斯分布**采样：

$$
X \sim N(\boldsymbol{x}, U_x)
$$

其中 $U_x$ 为不确定度矩阵（含协方差项），通过 Cholesky 分解实现采样。

---

## 三、反演值与仪器测量值比对的不确定度分析

> 参考：[1][2]

### 3.1 问题场景

```
测量物理量 A  ──→  反演模型  ──→  K_calc（反演计算值）
                                     对比
仪器直接测量    ──→  K_meas（仪器测量值，作为参考）
                                      ↓
                                   误差 ΔK = K_calc − K_meas
```

**反演方法验证**的常见场景：用一个或多个物理量$A_i$反演得到某个物理量 $K$，然后用一台独立仪器测量的 $K$ 值作为参考，通过比对来评估反演方法的准确性。

### 3.2 不确定度来源分析

比对涉及三个不确定度分量：

| 分量 | 符号 | 来源 | 评定方法 |
|------|------|------|---------|
| 反演值不确定度 | $u(K_{\text{calc}})$ | $A_i$ 的测量误差经反演模型传播 | A 类评定 [1] §4.2 或 GUM/MCM |
| 仪器测量值不确定度 | $u(K_{\text{meas}})$ | 参考仪器的校准证书、精度指标 | B 类评定 [1] §4.3 |
| 比对差值的合成不确定度 | $u(\Delta K)$ | 上述两者的合成 | 不确定度传播定律 [1] §5.1.2 |

### 3.3 完整计算步骤

#### 步骤 1：计算反演值 $K_{\text{calc}}$ 的不确定度

与之前相同，使用 GUM 误差传播或 Monte Carlo 方法：

$$
K_{\text{calc}} = f(A_1, A_3)
$$

- GUM 法：$u(K_{\text{calc}}) = \sqrt{ \left(\frac{\partial f}{\partial A_1}\right)^2 u^2(A_1) + \left(\frac{\partial f}{\partial A_2}\right)^2 u^2(A_2)+\left(\frac{\partial f}{\partial A_3}\right)^2 u^2(A_3)+... }$
- MCM 法：从 $A_1, A_2,A_3,...$ 的 PDF 抽样，计算 $K_{\text{calc}}$ 分布的标准差

#### 步骤 2：确定仪器测量值 $K_{\text{meas}}$ 的不确定度

> 参考：[1] §4.3

根据仪器的技术指标或校准证书进行 **B 类评定**：

- **情况 A**：校准证书给出扩展不确定度 $U_{\text{inst}}$ 和包含因子 $k_{\text{inst}}$
  $$
  u(K_{\text{meas}}) = \frac{U_{\text{inst}}}{k_{\text{inst}}}
  $$

- **情况 B**：仪器说明书给出精度（accuracy）$\pm \delta$，假设**均匀分布**
  $$
  u(K_{\text{meas}}) = \frac{\delta}{\sqrt{3}}
  $$

- **情况 C**：仪器说明书给出精度 $\pm \delta$，假设**正态分布**（更保守）
  $$
  u(K_{\text{meas}}) = \frac{\delta}{2} \quad \text{或} \quad \frac{\delta}{3}
  $$

- **情况 D**：对同一参考样品进行 $n$ 次独立重复测量（A 类评定）
  $$
  u(K_{\text{meas}}) = \frac{s}{\sqrt{n}}
  $$

#### 步骤 3：计算比对差值与合成不确定度

> 参考：[1] §5.1.2

比对差值：
$$
\Delta K = K_{\text{calc}} - K_{\text{meas}}
$$

若 $K_{\text{calc}}$ 与 $K_{\text{meas}}$ **不相关**（即反演使用的物理量A(i)数据与仪器测量独立进行），则：

$$
u(\Delta K) = \sqrt{ u^2(K_{\text{calc}}) + u^2(K_{\text{meas}}) }
$$

#### 步骤 4：判断反演结果是否可接受

计算归一化偏差 $E_n$ 值（国际上常用的比对评价指标）：

$$
E_n = \frac{|\Delta K|}{k \cdot u(\Delta K)}
$$

其中 $k$ 为包含因子（通常取 $k = 2$，对应约 95% 置信水平）。

- **$E_n \leq 1$**：反演值与仪器测量值在不确定度范围内一致，反演方法有效
- **$E_n > 1$**：两者存在显著偏差，需检查反演模型或测量过程是否存在未考虑的系统误差

### 3.4 Monte Carlo 方法处理比对

若反演模型复杂或想更准确地评估比对结果，可用 Monte Carlo 方法同时处理所有不确定度来源：

1. 从 $A_1 \sim N(\bar{A}_1, u_{A_1}^2)$、$A_2 \sim N(\bar{A}_2, u_{A_2}^2)$、$A_3 \sim N(\bar{A}_3, u_{A_3}^2)$ 中抽样
2. 对每组样本计算 $K_{\text{calc}, i} = f(A_{1,i}, A_{3,i})$
3. 从 $K_{\text{meas}} \sim N(\bar{K}_{\text{meas}}, u_{K_{\text{meas}}}^2)$ 中独立抽样（或按仪器 PDF 抽样）
4. 计算 $\Delta K_i = K_{\text{calc}, i} - K_{\text{meas}, i}$
5. 统计 $\Delta K_i$ 的分布，得到：
   - 平均偏差 $\overline{\Delta K}$：反映**系统偏差**
   - 标准差 $u(\Delta K)$：反映**随机不确定度**
   - 95% 包含区间：判断零值是否在区间内（零在区间内说明反演与测量无显著差异）

### 3.5 特殊情况：仪器测量值本身有重复数据

如果同一参考样品也用仪器重复测量了 $n$ 次：

- 获得 $K_{\text{meas},1}, K_{\text{meas},2}, \dots, K_{\text{meas},n}$
- 平均值 $\bar{K}_{\text{meas}}$ 和 A 类不确定度 $u(\bar{K}_{\text{meas}}) = s_{K_{\text{meas}}} / \sqrt{n}$
- 此时比对可采用**双样本 t 检验**的思路，或直接用 MCM 处理两组数据的 PDF


---

## 四、关键公式对照表

> 参考：[1][2]

| 概念 | GUM 方法 | Monte Carlo 方法 |
|------|----------|-----------------|
| 输入量分布 | 均值和标准差 | 完整的 PDF |
| 传播方式 | 一阶泰勒展开（灵敏度系数） | 大量随机抽样 |
| 输出量估计 | $y = f(x_1, \dots, x_N)$ | $\hat{y} = \frac{1}{M}\sum y_r$ |
| 标准不确定度 | $u_c(y) = \sqrt{\sum c_i^2 u^2(x_i)}$ | $u(\hat{y}) = \text{std}(y_r)$ |
| 包含区间 | $y \pm k \cdot u_c(y)$（假设对称） | 排序后分位数（无需对称假设） |
| 优点 | 计算快、公式简洁 | 适用于任何非线性、非对称情况 |
| 缺点 | 需求偏导、线性近似可能不准 | 计算量大 |

---

## 五、参考资料

1. **JCGM 100:2008** — *Evaluation of measurement data — Guide to the expression of uncertainty in measurement* (GUM)
2. **JCGM 101:2008** — *Evaluation of measurement data — Supplement 1 to the GUM — Propagation of distributions using a Monte Carlo method*
3. **Taylor, B. N., Kuyatt, C. E.** — *Guidelines for Evaluating and Expressing the Uncertainty of NIST Measurement Results*, NIST Technical Note 1297, 1994

---

## 六、参考资料位置（PDF页码）

### [1] JCGM 100:2008（GUM）

| 内容 | PDF 页码 |
|------|---------|
| 第 4 章：标准不确定度的评定（4.2 A 类评定、4.3 B 类评定） | 第 11–17 页 |
| 第 5 章：合成标准不确定度的确定（5.1.2 不确定度传播定律） | 第 18–25 页 |
| 第 6 章：扩展不确定度 | 第 25–27 页 |
| 第 7 章：不确定度的报告 | 第 28–32 页 |
| 第 8 章：评定与表达不确定度的步骤总结 | 第 44 页 |
| 附录 G：自由度与包含因子 | 第 93–100 页 |
| 附录 C：统计术语 | 第 55–63 页 |
| 附录 E：INC-1(1980) 建议的动机与基础 | 第 66–67 页 |
| 符号表 | 第 125–126 页 |
| 参考文献 | 第 127 页 |
| 索引 | 第 128–130 页 |

### [2] JCGM 101:2008（GUM Supplement 1 — Monte Carlo）

| 内容 | PDF 页码 |
|------|---------|
| 第 5 章：不确定度评定的步骤概述 | 第 13–20 页 |
| 第 6 章：输入量的概率密度函数分配（6.4 各分布类型） | 第 21–38 页 |
| 6.4.2 均匀分布 | 第 22 页 |
| 6.4.6 反正弦分布 | 第 23 页 |
| 6.4.7 高斯分布（正态分布） | 第 32 页 |
| 6.4.8 多元高斯分布（含相关性处理） | 第 32–33 页 |
| 6.4.9 t 分布（含 A 类评定 PDF） | 第 33–34 页 |
| 6.4.11 伽马分布 | 第 35 页 |
| 第 7 章：MCM 的实施（7.2 试验次数 $M$、7.9 自适应 MCM） | 第 36–45 页 |
| 第 8 章：GUM 框架与 MCM 的比较 | 第 46–49 页 |
| 第 9 章：实例 | 第 50–79 页 |
| 附录 C：抽样方法（C.3 均匀随机数、C.4 正态抽样、C.5 Cholesky 分解） | 第 82–86 页 |
| 附录 D：包含区间的确定 | 第 87–90 页 |
| 索引 | 第 88–90 页 |
