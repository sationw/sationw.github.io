---
layout: page
title: 学习笔记
permalink: /notes/
---

<p style="color: var(--text-light); margin-bottom: 2rem;">
  系统整理的学习笔记，涵盖数据科学、EM仿真与分析等领域的知识。
</p>

<div class="card-grid">
  {% for note in site.notes %}
  <a href="{{ note.url | relative_url }}" style="text-decoration: none; color: inherit;">
    <div class="card">
      <div class="card-icon"><i class="fas fa-sticky-note"></i></div>
      <h3>{{ note.title }}</h3>
      <p>{{ note.description }}</p>
      <div class="card-meta">
        <i class="fas fa-tag"></i> {{ note.category }}
        &nbsp;&nbsp;
        <i class="far fa-calendar-alt"></i> {{ note.date | date: "%Y-%m-%d" }}
      </div>
    </div>
  </a>
  {% else %}
  <div class="card">
    <div class="card-icon"><i class="fas fa-book"></i></div>
    <h3>笔记整理中</h3>
    <p>学习笔记正在整理中，敬请期待！</p>
  </div>
  {% endfor %}
</div>
