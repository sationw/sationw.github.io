---
layout: page
title: 博客
permalink: /blog/
---

<ul class="post-list">
  {% for post in site.posts %}
  <li class="post-item">
    <div class="post-date-badge">
      <span class="day">{{ post.date | date: "%d" }}</span>
      <span class="month">{{ post.date | date: "%b" }}</span>
    </div>
    <div class="post-info">
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p class="post-excerpt">{{ post.excerpt | strip_html | truncate: 150 }}</p>
      {% if post.categories %}
      <div class="post-categories">
        <i class="fas fa-folder"></i> {{ post.categories | join: ", " }}
        {% if post.tags %}
        &nbsp;&nbsp;<i class="fas fa-tags"></i> {{ post.tags | join: ", " }}
        {% endif %}
      </div>
      {% endif %}
    </div>
  </li>
  {% else %}
  <li class="post-item">
    <div class="post-info">
      <h3>还没有文章</h3>
      <p class="post-excerpt">博客文章正在路上，敬请期待！</p>
    </div>
  </li>
  {% endfor %}
</ul>
