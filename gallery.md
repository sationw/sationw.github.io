---
layout: page
title: 相册
permalink: /gallery/
---

<p style="color: var(--text-light); margin-bottom: 2rem;">
  记录生活中的美好瞬间与值得珍藏的回忆。
</p>

<div class="gallery-slider" id="gallerySlider">
  <div class="slider-track" id="sliderTrack">
    <figure class="slider-slide">
      <img src="{{ '/assets/images/晚霞_2024-4.jpg' | relative_url }}" alt="晚霞">
      <figcaption>
        <span class="slide-caption">追逐落日，期待绚丽的晚霞。<br>行至桥上，目送沉落的余晖。</span>
        <span class="slide-copyright">&copy; 2026 xxxn. All rights reserved.</span>
      </figcaption>
    </figure>
    <figure class="slider-slide">
      <img src="{{ '/assets/images/日出.jpg' | relative_url }}" alt="日出">
      <figcaption>
        <span class="slide-caption">🌅日出，<em>祝融峰</em>。</span>
        <span class="slide-copyright">&copy; 2026 xxxn. All rights reserved.</span>
      </figcaption>
    </figure>
  </div>
  <button class="slider-btn slider-prev" type="button" aria-label="上一张"><i class="fas fa-chevron-left"></i></button>
  <button class="slider-btn slider-next" type="button" aria-label="下一张"><i class="fas fa-chevron-right"></i></button>
</div>
<div class="slider-dots" id="sliderDots"></div>
