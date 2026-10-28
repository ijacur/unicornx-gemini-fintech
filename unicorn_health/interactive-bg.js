/**
 * TahlilAI MedLoop — Apple-Grade Monochromatic Interactive Background Engine
 * Pure Black & White: Dynamic Grid, Floating Clinical Biomarker Mesh,
 * Mouse Proximity Repulsion & Filament Tethering, Ultrasound Shockwave Pulses.
 */

(function () {
  'use strict';

  // Create & mount canvas container
  let container = document.getElementById('interactive-bg-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'interactive-bg-container';
    container.className = 'fixed inset-0 pointer-events-none z-0 overflow-hidden';
    container.setAttribute('aria-hidden', 'true');
    container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden;background:#000000;';
    document.body.prepend(container);
  }

  let canvas = document.getElementById('interactive-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'interactive-canvas';
    canvas.style.cssText = 'display:block;width:100%;height:100%;position:absolute;top:0;left:0;';
    container.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // State
  let width = 0;
  let height = 0;
  let dpr = 1;

  const mouse = {
    x: -2000,
    y: -2000,
    targetX: -2000,
    targetY: -2000,
    active: false,
    radius: 170
  };

  // Particles & Waves
  let particles = [];
  const waves = [];
  const sparks = [];

  // Modes: 0 = Full (Grid + Mesh + Filaments), 1 = Constellation (Mesh only), 2 = Architectural Grid
  let ambientMode = 0;
  const MODES = ['Full System', 'Constellation', 'Architectural Grid'];

  // Particle Class
  class BiomarkerNode {
    constructor(w, h) {
      this.reset(w, h);
    }

    reset(w, h) {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.baseVx = (Math.random() - 0.5) * 0.45;
      this.baseVy = (Math.random() - 0.5) * 0.45;
      this.vx = this.baseVx;
      this.vy = this.baseVy;
      this.baseRadius = Math.random() * 1.4 + 1.0; // 1.0px to 2.4px
      this.radius = this.baseRadius;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.025 + 0.015;
      this.alpha = Math.random() * 0.35 + 0.25;
      // 10% are "priority biomarkers" with sharper glow
      this.isPriority = Math.random() < 0.12;
    }

    update(w, h) {
      this.pulsePhase += this.pulseSpeed;
      const breathing = Math.sin(this.pulsePhase);
      this.radius = this.baseRadius + (this.isPriority ? breathing * 0.8 : breathing * 0.3);

      // Mouse Proximity Fluid Force
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 1.8;
          this.vx += (dx / dist) * force;
          this.vy += (dy / dist) * force;
        }
      }

      // Smooth return to base velocity (viscous damping)
      this.vx += (this.baseVx - this.vx) * 0.035;
      this.vy += (this.baseVy - this.vy) * 0.035;

      this.x += this.vx;
      this.y += this.vy;

      // Soft screen wrap / bounce
      if (this.x < -20) this.x = w + 20;
      else if (this.x > w + 20) this.x = -20;
      if (this.y < -20) this.y = h + 20;
      else if (this.y > h + 20) this.y = -20;
    }

    draw(context) {
      const currentAlpha = Math.max(0.1, Math.min(0.9, this.alpha + Math.sin(this.pulsePhase) * 0.2));

      context.beginPath();
      context.arc(this.x, this.y, Math.max(0.6, this.radius), 0, Math.PI * 2);

      if (this.isPriority) {
        context.shadowBlur = 10;
        context.shadowColor = 'rgba(255, 255, 255, 0.7)';
        context.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 1.2})`;
      } else {
        context.shadowBlur = 0;
        context.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
      }

      context.fill();
      context.shadowBlur = 0;
    }
  }

  // Ultrasound Shockwave Class
  class UltrasoundWave {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = 2;
      this.maxRadius = Math.min(width, height) * 0.35 + 160;
      this.speed = 5.5;
      this.alpha = 0.55;
      this.dead = false;
    }

    update() {
      this.radius += this.speed;
      this.alpha = 0.55 * (1 - this.radius / this.maxRadius);
      if (this.radius >= this.maxRadius || this.alpha <= 0.01) {
        this.dead = true;
      }
    }

    draw(context) {
      if (this.dead) return;
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
      context.lineWidth = 1.0;
      context.stroke();

      // Inner subtle harmonic ring
      if (this.radius > 40) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius * 0.65, 0, Math.PI * 2);
        context.strokeStyle = `rgba(255, 255, 255, ${this.alpha * 0.4})`;
        context.lineWidth = 0.6;
        context.stroke();
      }
    }
  }

  // Sparkle particle on click
  class ClickSpark {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 0.8;
      this.size = Math.random() * 1.8 + 0.8;
      this.dead = false;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.94;
      this.vy *= 0.94;
      this.alpha -= 0.025;
      if (this.alpha <= 0.01) this.dead = true;
    }

    draw(context) {
      if (this.dead) return;
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      context.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
      context.fill();
    }
  }

  // Setup / Resize
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    // Calculate node count based on screen area
    const targetCount = Math.max(30, Math.min(85, Math.floor((width * height) / 19000)));

    if (particles.length === 0) {
      for (let i = 0; i < targetCount; i++) {
        particles.push(new BiomarkerNode(width, height));
      }
    } else if (particles.length < targetCount) {
      while (particles.length < targetCount) {
        particles.push(new BiomarkerNode(width, height));
      }
    } else if (particles.length > targetCount) {
      particles = particles.slice(0, targetCount);
    }
  }

  // Render Grid Layer (Apple Precision)
  function drawGrid(context) {
    if (ambientMode === 1) return; // Skip in Constellation only mode

    const gridSize = 64;
    const startX = 0;
    const startY = 0;

    context.lineWidth = 0.5;

    // Draw grid intersections & proximity illumination
    for (let x = startX; x <= width; x += gridSize) {
      for (let y = startY; y <= height; y += gridSize) {
        let alpha = 0.025;

        if (mouse.active) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 260) {
            alpha += (1 - dist / 260) * 0.11;
          }
        }

        // Draw micro crosshairs (+) at grid junctions
        context.strokeStyle = `rgba(255, 255, 255, ${alpha * 1.5})`;
        context.beginPath();
        context.moveTo(x - 2.5, y);
        context.lineTo(x + 2.5, y);
        context.moveTo(x, y - 2.5);
        context.lineTo(x, y + 2.5);
        context.stroke();
      }
    }

    // Hairline boundary grid lines
    if (ambientMode === 2 || (mouse.active && ambientMode === 0)) {
      context.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      context.beginPath();
      for (let x = startX; x <= width; x += gridSize) {
        context.moveTo(x, 0);
        context.lineTo(x, height);
      }
      for (let y = startY; y <= height; y += gridSize) {
        context.moveTo(0, y);
        context.lineTo(width, y);
      }
      context.stroke();
    }
  }

  // Render Torch Ambient Spotlight
  function drawTorch(context) {
    if (!mouse.active) return;

    const grad = context.createRadialGradient(
      mouse.x, mouse.y, 0,
      mouse.x, mouse.y, 420
    );
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.045)');
    grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.015)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    context.fillStyle = grad;
    context.beginPath();
    context.arc(mouse.x, mouse.y, 420, 0, Math.PI * 2);
    context.fill();
  }

  // Render Node Network & Filaments
  function drawNetwork(context) {
    if (ambientMode === 2) return; // Skip in Grid only mode

    const maxDist = 125;
    const len = particles.length;

    // Connect close nodes
    context.lineWidth = 0.65;
    for (let i = 0; i < len; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < len; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const factor = (1 - dist / maxDist);
          const alpha = factor * 0.12 * Math.min(p1.alpha, p2.alpha);
          context.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          context.beginPath();
          context.moveTo(p1.x, p1.y);
          context.lineTo(p2.x, p2.y);
          context.stroke();
        }
      }

      // Laser filament to cursor
      if (mouse.active) {
        const mdx = p1.x - mouse.x;
        const mdy = p1.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < mouse.radius) {
          const mFactor = (1 - mdist / mouse.radius);
          context.strokeStyle = `rgba(255, 255, 255, ${mFactor * 0.22})`;
          context.lineWidth = 0.8;
          context.beginPath();
          context.moveTo(p1.x, p1.y);
          context.lineTo(mouse.x, mouse.y);
          context.stroke();
        }
      }
    }

    // Draw individual nodes
    for (let i = 0; i < len; i++) {
      particles[i].update(width, height);
      particles[i].draw(context);
    }
  }

  // Main Animation Loop
  let isRunning = true;
  function animate() {
    if (!isRunning) return;

    // Interpolate mouse with inertia
    mouse.x += (mouse.targetX - mouse.x) * 0.12;
    mouse.y += (mouse.targetY - mouse.y) * 0.12;

    // Clear with pure deep black
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, width, height);

    // Layer 1: Ambient Torch
    drawTorch(ctx);

    // Layer 2: Geometric Hairline Grid
    drawGrid(ctx);

    // Layer 3: Ultrasound Shockwaves
    for (let i = waves.length - 1; i >= 0; i--) {
      waves[i].update();
      waves[i].draw(ctx);

      // Radial impulse to nearby particles
      const wave = waves[i];
      for (let j = 0; j < particles.length; j++) {
        const p = particles[j];
        const dx = p.x - wave.x;
        const dy = p.y - wave.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (Math.abs(dist - wave.radius) < 22 && dist > 0) {
          p.vx += (dx / dist) * 1.2;
          p.vy += (dy / dist) * 1.2;
        }
      }

      if (wave.dead) {
        waves.splice(i, 1);
      }
    }

    // Layer 4: Sparks
    for (let i = sparks.length - 1; i >= 0; i--) {
      sparks[i].update();
      sparks[i].draw(ctx);
      if (sparks[i].dead) {
        sparks.splice(i, 1);
      }
    }

    // Layer 5: Biomarker Nodes & Filaments
    drawNetwork(ctx);

    requestAnimationFrame(animate);
  }

  // Trigger Ultrasound Shockwave
  function triggerShockwave(x, y) {
    waves.push(new UltrasoundWave(x, y));
    for (let i = 0; i < 9; i++) {
      sparks.push(new ClickSpark(x, y));
    }
  }

  // Listeners
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.targetX = -2000;
    mouse.targetY = -2000;
  });

  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      const touch = e.touches[0];
      mouse.targetX = touch.clientX;
      mouse.targetY = touch.clientY;
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
      mouse.active = true;
      triggerShockwave(touch.clientX, touch.clientY);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      mouse.targetX = e.touches[0].clientX;
      mouse.targetY = e.touches[0].clientY;
      mouse.active = true;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    setTimeout(() => {
      mouse.active = false;
    }, 1500);
  });

  // Global Click Shockwave
  window.addEventListener('click', (e) => {
    // Check if target is not a modal or interactive element
    triggerShockwave(e.clientX, e.clientY);
  });

  // Visibility optimization (save battery on background tab)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
    } else {
      isRunning = true;
      requestAnimationFrame(animate);
    }
  });

  // Mode Switcher Pill in Footer (Minimal Luxury Control)
  function createAmbientController() {
    const pill = document.createElement('div');
    pill.id = 'ambient-mode-pill';
    pill.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 40;
      background: rgba(18, 18, 20, 0.7);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 9999px;
      padding: 6px 14px;
      font-size: 11px;
      font-family: 'JetBrains Mono', 'SF Mono', monospace;
      color: #a1a1a6;
      display: flex;
      align-items: center;
      gap: 7px;
      cursor: pointer;
      user-select: none;
      transition: all 0.25s ease;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    `;
    pill.title = 'Fonga bosib rejimni almashtiring (Full, Constellation, Grid)';
    pill.innerHTML = `
      <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:#ffffff;box-shadow:0 0 8px rgba(255,255,255,0.8);"></span>
      <span id="ambient-mode-text" style="color:#ffffff;font-weight:600;">Full Mesh</span>
    `;

    pill.addEventListener('mouseenter', () => {
      pill.style.borderColor = 'rgba(255, 255, 255, 0.35)';
      pill.style.color = '#ffffff';
      pill.style.transform = 'translateY(-2px)';
    });

    pill.addEventListener('mouseleave', () => {
      pill.style.borderColor = 'rgba(255, 255, 255, 0.12)';
      pill.style.color = '#a1a1a6';
      pill.style.transform = 'translateY(0)';
    });

    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      ambientMode = (ambientMode + 1) % MODES.length;
      const textSpan = document.getElementById('ambient-mode-text');
      if (textSpan) textSpan.innerText = MODES[ambientMode];
      triggerShockwave(e.clientX, e.clientY);
      if (window.showToast) {
        window.showToast('Fon rejimi: ' + MODES[ambientMode]);
      }
    });

    document.body.appendChild(pill);
  }

  // Initialize
  resize();
  requestAnimationFrame(animate);

  // Mount controller once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createAmbientController);
  } else {
    createAmbientController();
  }

  console.log('TahlilAI Apple Monochromatic Interactive Background Engine Initialized.');
})();
