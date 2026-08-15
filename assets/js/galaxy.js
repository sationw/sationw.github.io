// ============================================
// CBRC.github.io - Galaxy Background
// Dynamic (rotate + mouse parallax) on home/about
// Static (single frame) on all other pages
// ============================================
(function () {
  const canvas = document.getElementById('galaxy-bg');
  if (!canvas || typeof THREE === 'undefined') return;

  // 首页 / 关于页使用动态星系，其他页面使用静态星系
  const isDynamic =
    document.body.classList.contains('home') ||
    document.body.classList.contains('about');

  // ---- 1. 初始化场景与相机 ----
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(3, 3, 3);
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // ---- 2. 星系参数设置 ----
  const parameters = {
    count: 50000,          // 粒子数量
    size: 0.012,           // 粒子基础尺寸
    radius: 5,             // 星系半径
    branches: 3,           // 旋臂数量
    spin: 1,               // 旋臂弯曲度
    randomness: 0.5,       // 离散度
    power: 3,              // 离散聚集度
    insideColor: '#ff6030',// 中心发光颜色 (暖橙色)
    outsideColor: '#1b3984'// 边缘颜色 (蓝紫色)
  };

  let points = null;

  // ---- 3. 生成螺旋星系几何体 ----
  const generateGalaxy = () => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);

    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;

      const radius = Math.random() * parameters.radius;
      const spinAngle = radius * parameters.spin;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const randomX = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomY = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomZ = Math.pow(Math.random(), parameters.power) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });

    points = new THREE.Points(geometry, material);
    scene.add(points);
  };

  generateGalaxy();

  // ---- 4. 窗口大小自适应 ----
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // 静态模式下窗口变化后重绘一帧
    if (!isDynamic) {
      renderer.render(scene, camera);
    }
  };
  window.addEventListener('resize', onResize);

  if (isDynamic) {
    // ---- 5. 鼠标移动视角响应 (Parallax) ----
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    });

    // ---- 6. 逐帧渲染与自转动画 ----
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      if (points) {
        points.rotation.y = elapsedTime * 0.08;
      }

      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };

    tick();
  } else {
    // ---- 静态模式：仅渲染一帧 ----
    renderer.render(scene, camera);
  }
})();
