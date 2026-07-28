---
layout: page
title: 项目
permalink: /projects/
---

<p style="color: var(--text-light); margin-bottom: 2rem;">
  这里展示了我参与和完成的一些项目。
</p>

<div class="card-grid">
  {% for project in site.projects %}
  <a href="{{ project.url | relative_url }}" style="text-decoration: none; color: inherit;">
    <div class="card">
      <div class="card-icon">
        {% if project.icon %}
        <i class="{{ project.icon }}"></i>
        {% else %}
        <i class="fas fa-code-branch"></i>
        {% endif %}
      </div>
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
      {% if project.tech_stack %}
      <div class="card-meta">
        <i class="fas fa-wrench"></i> {{ project.tech_stack | join: ", " }}
      </div>
      {% endif %}
    </div>
  </a>
  {% else %}
  <div class="card">
    <div class="card-icon"><i class="fas fa-folder-open"></i></div>
    <h3>项目筹备中</h3>
    <p>项目展示内容即将上线，敬请期待！</p>
  </div>
  {% endfor %}
</div>
