// ============================================
// CBRC.github.io - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  // Mobile navigation toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.navbar-nav');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // Highlight current page in navigation
  if (navMenu) {
    const currentPath = window.location.pathname;
    navMenu.querySelectorAll('a').forEach(function (link) {
      const linkPath = link.getAttribute('href');
      if (currentPath === linkPath ||
        (linkPath !== '/' && currentPath.startsWith(linkPath))) {
        link.classList.add('active');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Gallery slider (PPT-style autoplay)
  const slider = document.getElementById('gallerySlider');
  if (slider) {
    const track = document.getElementById('sliderTrack');
    const slides = slider.querySelectorAll('.slider-slide');
    const prevBtn = slider.querySelector('.slider-btn.prev');
    const nextBtn = slider.querySelector('.slider-btn.next');
    const dotsWrap = document.getElementById('sliderDots');
    const interval = 5000;

    if (track && slides.length > 1) {
      let index = 0;
      let timer = null;

      // Build indicator dots
      slides.forEach(function (_, i) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', '第 ' + (i + 1) + ' 张');
        dot.addEventListener('click', function () {
          goTo(i);
          restart();
        });
        dotsWrap.appendChild(dot);
      });
      const dots = dotsWrap.querySelectorAll('.slider-dot');

      function goTo(i) {
        index = (i + slides.length) % slides.length;
        track.style.transform = 'translateX(-' + index * 100 + '%)';
        dots.forEach(function (d, j) {
          d.classList.toggle('active', j === index);
        });
      }

      function next() {
        goTo(index + 1);
      }

      function prev() {
        goTo(index - 1);
      }

      function play() {
        if (!timer) {
          timer = setInterval(next, interval);
        }
      }

      function pause() {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }

      function restart() {
        pause();
        play();
      }

      prevBtn.addEventListener('click', function () {
        prev();
        restart();
      });

      nextBtn.addEventListener('click', function () {
        next();
        restart();
      });

      slider.addEventListener('mouseenter', pause);
      slider.addEventListener('mouseleave', play);

      // Pause when the tab is hidden to save resources
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          pause();
        } else {
          play();
        }
      });

      play();
    }
  }
});
