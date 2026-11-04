/**
 * SINGULARITY: ORBITCRASH — 3D WebGL Physics Engine & Interactive Arena
 * Created by Jasur Shukurov (@machampk, Level 8 School 21 Samarkand)
 * High-performance Three.js Engine with Newtonian Gravity, Procedural Audio & Particle Systems
 */

class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.initAudio();
  }

  initAudio() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    } catch (e) {
      console.warn("Web Audio not supported", e);
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playThrust() {
    if (!this.enabled || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(45, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(75, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch(e) {}
  }

  playCollect() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(1040, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.18);
    } catch(e) {}
  }

  playPulse() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(now + 0.35);
    } catch(e) {}
  }

  playExplosion() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      // White noise buffer
      const bufferSize = this.ctx.sampleRate * 0.3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(60, now + 0.3);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      whiteNoise.start();
    } catch(e) {}
  }

  playLevelUp() {
    if (!this.enabled || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.22);
      });
    } catch(e) {}
  }
}

class OrbitCrashGame {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container #${containerId} not found`);
      return;
    }

    this.sound = new SoundSynthesizer();
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('orbitcrash_highscore') || '0', 10);
    this.wave = 1;
    this.combo = 1;
    this.comboTimer = 0;
    this.mass = 250; // Initial Singularity mass in arbitrary units
    this.baseRadius = 1.6;
    this.gravitationalConstant = 0.95;
    this.isOverdrive = false;
    this.overdriveCooldown = 0;
    this.paused = false;

    // Movement & Inputs
    this.keys = {};
    this.mouse = { x: 0, y: 0, worldX: 0, worldZ: 0, down: false };
    this.touchActive = false;

    // Physics Collections
    this.asteroids = [];
    this.energyCores = [];
    this.rogueDrones = [];
    this.particles = [];
    this.accretionParticles = [];

    // Telemetry
    this.fps = 60;
    this.lastFrameTime = performance.now();
    this.frameCount = 0;
    this.fpsTimer = performance.now();

    this.init();
  }

  init() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x05070d, 0.008);

    // Camera
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.set(0, 55, 38);
    this.camera.lookAt(0, 0, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.2);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00f0ff, 1.8);
    dirLight.position.set(30, 40, 20);
    this.scene.add(dirLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 2.5, 90);
    purpleLight.position.set(-25, 20, -20);
    this.scene.add(purpleLight);

    // Starfield Background
    this.createStarfield();

    // Cosmic Grid Plane
    this.createCosmicGrid();

    // Player Singularity Core
    this.createPlayerSingularity();

    // Initial Spawns
    this.spawnWave(this.wave);

    // Setup Event Listeners
    this.setupInputs();

    // Start Animation Loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);

    // Window Resize handling
    window.addEventListener('resize', () => this.onResize());
  }

  createStarfield() {
    const starCount = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color(0x00f0ff),
      new THREE.Color(0xa855f7),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0xffffff)
    ];

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      positions[idx] = (Math.random() - 0.5) * 450;
      positions[idx + 1] = (Math.random() - 0.5) * 200 - 30;
      positions[idx + 2] = (Math.random() - 0.5) * 450;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[idx] = col.r;
      colors[idx + 1] = col.g;
      colors[idx + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    this.starfield = new THREE.Points(geometry, material);
    this.scene.add(this.starfield);
  }

  createCosmicGrid() {
    const gridHelper = new THREE.GridHelper(160, 40, 0x00f0ff, 0x1e293b);
    gridHelper.position.y = -4;
    gridHelper.material.opacity = 0.22;
    gridHelper.material.transparent = true;
    this.scene.add(gridHelper);
    this.cosmicGrid = gridHelper;
  }

  createPlayerSingularity() {
    this.playerGroup = new THREE.Group();
    this.playerPos = new THREE.Vector3(0, 0, 0);
    this.playerVel = new THREE.Vector3(0, 0, 0);

    // Event Horizon Sphere (Deep pitch black with Fresnel aura)
    const coreGeo = new THREE.SphereGeometry(this.baseRadius, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x010204 });
    this.eventHorizonMesh = new THREE.Mesh(coreGeo, coreMat);
    this.playerGroup.add(this.eventHorizonMesh);

    // Glowing Gravitational Lensing Ring
    const ringGeo = new THREE.TorusGeometry(this.baseRadius * 1.55, 0.16, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      emissive: 0x00f0ff,
      emissiveIntensity: 1.2,
      roughness: 0.2,
      metalness: 0.8
    });
    this.lensingRing = new THREE.Mesh(ringGeo, ringMat);
    this.lensingRing.rotation.x = Math.PI / 2.3;
    this.playerGroup.add(this.lensingRing);

    // Secondary Accretion Ring (Purple)
    const ringGeo2 = new THREE.TorusGeometry(this.baseRadius * 2.1, 0.08, 16, 64);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0xa855f7,
      emissiveIntensity: 0.9,
      roughness: 0.3
    });
    this.lensingRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    this.lensingRing2.rotation.x = Math.PI / 1.9;
    this.playerGroup.add(this.lensingRing2);

    // Gravitational Field Indicator (Translucent Wireframe Sphere)
    const fieldGeo = new THREE.SphereGeometry(this.getGravitationalRadius(), 18, 18);
    const fieldMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    this.gravFieldMesh = new THREE.Mesh(fieldGeo, fieldMat);
    this.playerGroup.add(this.gravFieldMesh);

    // Singularity Light Source
    this.singularityLight = new THREE.PointLight(0x00f0ff, 2.5, 35);
    this.playerGroup.add(this.singularityLight);

    // Swirling Accretion Disk Particles around player
    this.createAccretionDiskParticles();

    this.scene.add(this.playerGroup);
  }

  createAccretionDiskParticles() {
    const pCount = 200;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(pCount * 3);
    this.accretionData = [];

    for (let i = 0; i < pCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = this.baseRadius * (1.6 + Math.random() * 2.2);
      positions[i * 3] = Math.cos(angle) * dist;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
      positions[i * 3 + 2] = Math.sin(angle) * dist;

      this.accretionData.push({
        angle: angle,
        dist: dist,
        speed: (0.02 + Math.random() * 0.035) * (Math.random() > 0.5 ? 1 : 1)
      });
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.7,
      transparent: true,
      opacity: 0.8
    });

    this.accretionPoints = new THREE.Points(geom, mat);
    this.playerGroup.add(this.accretionPoints);
  }

  getGravitationalRadius() {
    // Radius proportional to sqrt(mass)
    return Math.min(38, 9 + Math.sqrt(this.mass) * 0.7);
  }

  spawnWave(waveNum) {
    // Clear old debris if wave advanced
    const asteroidCount = 8 + waveNum * 4;
    const energyCount = 4 + waveNum * 2;
    const droneCount = Math.min(6, Math.floor(waveNum * 1.5));

    for (let i = 0; i < asteroidCount; i++) {
      this.spawnAsteroid();
    }
    for (let i = 0; i < energyCount; i++) {
      this.spawnEnergyCore();
    }
    for (let i = 0; i < droneCount; i++) {
      this.spawnRogueDrone();
    }

    this.sound.playLevelUp();
    this.updateHUDNotification(`WAVE ${waveNum}: CELESTIAL ANOMALY`);
  }

  spawnAsteroid() {
    const size = 0.7 + Math.random() * 1.4;
    const geo = new THREE.DodecahedronGeometry(size, 1);
    
    // Perturb vertices slightly for jagged asteroid look
    const posAttr = geo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      const vz = posAttr.getZ(i);
      const factor = 1 + (Math.random() - 0.5) * 0.35;
      posAttr.setXYZ(i, vx * factor, vy * factor, vz * factor);
    }
    geo.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.85,
      metalness: 0.15
    });

    const mesh = new THREE.Mesh(geo, mat);
    const angle = Math.random() * Math.PI * 2;
    const dist = 24 + Math.random() * 45;
    mesh.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);

    const massVal = size * 45;
    const speed = 0.05 + Math.random() * 0.12;
    // Tangential orbital velocity + slight radial drift
    const vel = new THREE.Vector3(
      -Math.sin(angle) * speed + (Math.random() - 0.5) * 0.03,
      0,
      Math.cos(angle) * speed + (Math.random() - 0.5) * 0.03
    );

    const rotSpeed = new THREE.Vector3(
      (Math.random() - 0.5) * 0.04,
      (Math.random() - 0.5) * 0.04,
      (Math.random() - 0.5) * 0.04
    );

    this.scene.add(mesh);
    this.asteroids.push({
      mesh: mesh,
      vel: vel,
      rotSpeed: rotSpeed,
      mass: massVal,
      radius: size,
      hp: size > 1.4 ? 2 : 1
    });
  }

  spawnEnergyCore() {
    const geo = new THREE.OctahedronGeometry(0.85, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 1.4,
      roughness: 0.1,
      metalness: 0.9
    });
    const mesh = new THREE.Mesh(geo, mat);
    const angle = Math.random() * Math.PI * 2;
    const dist = 18 + Math.random() * 40;
    mesh.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);

    const vel = new THREE.Vector3(
      (Math.random() - 0.5) * 0.06,
      0,
      (Math.random() - 0.5) * 0.06
    );

    this.scene.add(mesh);
    this.energyCores.push({
      mesh: mesh,
      vel: vel,
      radius: 0.85,
      massValue: 35,
      points: 250
    });
  }

  spawnRogueDrone() {
    const group = new THREE.Group();
    // Drone core (Tetrahedron with amber glow)
    const coreGeo = new THREE.ConeGeometry(0.9, 1.6, 4);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 1.1,
      roughness: 0.3
    });
    const droneMesh = new THREE.Mesh(coreGeo, coreMat);
    droneMesh.rotation.x = Math.PI / 2;
    group.add(droneMesh);

    const angle = Math.random() * Math.PI * 2;
    const dist = 35 + Math.random() * 30;
    group.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);

    this.scene.add(group);
    this.rogueDrones.push({
      group: group,
      vel: new THREE.Vector3(0, 0, 0),
      radius: 1.2,
      hp: 2,
      patrolAngle: angle,
      orbitDist: dist,
      speed: 0.1 + Math.random() * 0.08
    });
  }

  setupInputs() {
    // Keyboard
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
      if (e.code === 'Space') {
        e.preventDefault();
        this.triggerOverdrive();
      }
      this.sound.resume();
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    // Mouse / Pointer
    const canvas = this.renderer.domElement;
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.calculateWorldMouse();
    });

    canvas.addEventListener('mousedown', (e) => {
      this.mouse.down = true;
      this.sound.resume();
      this.triggerOverdrive();
    });

    canvas.addEventListener('mouseup', () => {
      this.mouse.down = false;
    });

    // Touch support for mobile devices
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        this.touchActive = true;
        const rect = canvas.getBoundingClientRect();
        this.mouse.x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
        this.calculateWorldMouse();
        this.sound.resume();
        this.triggerOverdrive();
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        this.mouse.x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
        this.calculateWorldMouse();
      }
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
      this.touchActive = false;
    });
  }

  calculateWorldMouse() {
    // Raycast from camera to plane y = 0
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(this.mouse.x, this.mouse.y), this.camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const target = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, target)) {
      this.mouse.worldX = target.x;
      this.mouse.worldZ = target.z;
    }
  }

  triggerOverdrive() {
    if (this.overdriveCooldown > 0) return;
    this.isOverdrive = true;
    this.overdriveCooldown = 3.5; // seconds
    this.sound.playPulse();

    // Spawn massive shockwave ring
    this.createShockwave(this.playerPos.clone());

    // Gravitational blast effect
    this.gravFieldMesh.material.opacity = 0.35;
    this.singularityLight.intensity = 5.5;

    // Apply impulse to all nearby entities
    const gravRadius = this.getGravitationalRadius() * 1.5;
    this.asteroids.forEach(ast => {
      const toPlayer = new THREE.Vector3().subVectors(this.playerPos, ast.mesh.position);
      const dist = toPlayer.length();
      if (dist < gravRadius && dist > 0.1) {
        toPlayer.normalize();
        // In overdrive, sling with extreme force towards player
        ast.vel.add(toPlayer.multiplyScalar(0.75));
      }
    });

    setTimeout(() => {
      this.isOverdrive = false;
      if (this.gravFieldMesh) this.gravFieldMesh.material.opacity = 0.08;
      if (this.singularityLight) this.singularityLight.intensity = 2.5;
    }, 600);
  }

  createShockwave(center) {
    const geo = new THREE.RingGeometry(1, 1.8, 32);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });
    const ring = new THREE.Mesh(geo, mat);
    ring.rotation.x = Math.PI / 2;
    ring.position.copy(center);
    ring.position.y = 0.2;
    this.scene.add(ring);

    let scale = 1;
    const expandInterval = setInterval(() => {
      scale += 0.8;
      ring.scale.set(scale, scale, 1);
      mat.opacity -= 0.06;
      if (mat.opacity <= 0.01) {
        clearInterval(expandInterval);
        this.scene.remove(ring);
        geo.dispose();
        mat.dispose();
      }
    }, 25);
  }

  createExplosion(pos, colorHex = 0x00f0ff, count = 25) {
    for (let i = 0; i < count; i++) {
      const geo = new THREE.SphereGeometry(0.18, 6, 6);
      const mat = new THREE.MeshBasicMaterial({ color: colorHex });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(pos);

      const angle = Math.random() * Math.PI * 2;
      const speed = 0.15 + Math.random() * 0.35;
      const vel = new THREE.Vector3(
        Math.cos(angle) * speed,
        (Math.random() - 0.5) * 0.2,
        Math.sin(angle) * speed
      );

      this.scene.add(mesh);
      this.particles.push({
        mesh: mesh,
        vel: vel,
        life: 1.0,
        decay: 0.025 + Math.random() * 0.03
      });
    }
  }

  updatePhysics(delta) {
    // 1. Player Movement Dynamics
    const moveVector = new THREE.Vector3(0, 0, 0);

    // Keyboard checks
    if (this.keys['w'] || this.keys['arrowup']) moveVector.z -= 1;
    if (this.keys['s'] || this.keys['arrowdown']) moveVector.z += 1;
    if (this.keys['a'] || this.keys['arrowleft']) moveVector.x -= 1;
    if (this.keys['d'] || this.keys['arrowright']) moveVector.x += 1;

    // Mouse attraction vector
    const toMouse = new THREE.Vector3(this.mouse.worldX - this.playerPos.x, 0, this.mouse.worldZ - this.playerPos.z);
    const mouseDist = toMouse.length();

    if (moveVector.lengthSq() > 0) {
      moveVector.normalize().multiplyScalar(0.28);
      this.playerVel.add(moveVector);
      this.sound.playThrust();
    } else if (mouseDist > 1.5) {
      // Smooth lerp towards cursor
      toMouse.normalize().multiplyScalar(Math.min(0.24, mouseDist * 0.05));
      this.playerVel.add(toMouse);
    }

    // Velocity Damping (Space friction / engine inertia)
    this.playerVel.multiplyScalar(0.93);
    this.playerPos.add(this.playerVel);

    // Keep player within boundary
    const maxBound = 65;
    if (this.playerPos.length() > maxBound) {
      this.playerPos.normalize().multiplyScalar(maxBound);
      this.playerVel.multiplyScalar(-0.5);
    }

    this.playerGroup.position.copy(this.playerPos);

    // Rotate Accretion Rings
    this.lensingRing.rotation.z += 0.035;
    this.lensingRing2.rotation.z -= 0.025;

    // Accretion disk particles rotation around player
    if (this.accretionPoints) {
      const posAttr = this.accretionPoints.geometry.attributes.position;
      for (let i = 0; i < this.accretionData.length; i++) {
        const item = this.accretionData[i];
        item.angle += item.speed;
        const x = Math.cos(item.angle) * item.dist;
        const z = Math.sin(item.angle) * item.dist;
        posAttr.setX(i, x);
        posAttr.setZ(i, z);
      }
      posAttr.needsUpdate = true;
    }

    // Camera follow lerp
    const targetCamX = this.playerPos.x * 0.45;
    const targetCamZ = this.playerPos.z * 0.45 + 38;
    this.camera.position.x += (targetCamX - this.camera.position.x) * 0.08;
    this.camera.position.z += (targetCamZ - this.camera.position.z) * 0.08;
    this.camera.lookAt(this.playerPos.x * 0.2, 0, this.playerPos.z * 0.2);

    // Update gravitational field size according to mass
    const curGravRadius = this.getGravitationalRadius();
    this.gravFieldMesh.scale.set(curGravRadius / 9, curGravRadius / 9, curGravRadius / 9);

    // Cooldown management
    if (this.overdriveCooldown > 0) {
      this.overdriveCooldown = Math.max(0, this.overdriveCooldown - delta);
    }
    if (this.comboTimer > 0) {
      this.comboTimer -= delta;
      if (this.comboTimer <= 0) this.combo = 1;
    }

    // 2. Gravitational Physics on Asteroids
    const currentSingularityRadius = this.baseRadius * (1 + Math.sqrt(this.mass / 250) * 0.5);
    this.eventHorizonMesh.scale.set(currentSingularityRadius / this.baseRadius, currentSingularityRadius / this.baseRadius, currentSingularityRadius / this.baseRadius);

    for (let i = this.asteroids.length - 1; i >= 0; i--) {
      const ast = this.asteroids[i];
      const toPlayer = new THREE.Vector3().subVectors(this.playerPos, ast.mesh.position);
      const dist = toPlayer.length();

      // Newtonian Gravity $F = G * (m1 * m2) / r^2$
      if (dist < curGravRadius && dist > 0.2) {
        const force = (this.gravitationalConstant * (this.mass * 0.05)) / (dist * dist + 4.0);
        toPlayer.normalize();
        ast.vel.add(toPlayer.multiplyScalar(force));
      }

      // Update position & rotation
      ast.mesh.position.add(ast.vel);
      ast.mesh.rotation.x += ast.rotSpeed.x;
      ast.mesh.rotation.y += ast.rotSpeed.y;
      ast.mesh.rotation.z += ast.rotSpeed.z;

      // Event Horizon Absorption Collision!
      if (dist < currentSingularityRadius + ast.radius * 0.6) {
        // Absorbed into singularity!
        this.sound.playExplosion();
        this.createExplosion(ast.mesh.position, 0x38bdf8, 18);
        this.scene.remove(ast.mesh);
        this.asteroids.splice(i, 1);

        // Mass accretion
        this.mass += Math.round(ast.mass * 0.35);
        const pts = Math.round(150 * this.combo);
        this.addScore(pts);
        this.triggerCombo();
        continue;
      }

      // Out of bounds wrap
      if (ast.mesh.position.length() > 85) {
        ast.mesh.position.multiplyScalar(-0.95);
      }
    }

    // 3. Energy Cores Collection
    for (let i = this.energyCores.length - 1; i >= 0; i--) {
      const core = this.energyCores[i];
      const toPlayer = new THREE.Vector3().subVectors(this.playerPos, core.mesh.position);
      const dist = toPlayer.length();

      // Pull energy cores faster
      if (dist < curGravRadius * 1.2 && dist > 0.1) {
        toPlayer.normalize();
        core.vel.add(toPlayer.multiplyScalar(0.12));
      }

      core.mesh.position.add(core.vel);
      core.mesh.rotation.y += 0.05;
      core.mesh.rotation.x += 0.02;

      // Collection check
      if (dist < currentSingularityRadius + core.radius + 0.5) {
        this.sound.playCollect();
        this.createExplosion(core.mesh.position, 0x10b981, 20);
        this.scene.remove(core.mesh);
        this.energyCores.splice(i, 1);

        this.mass += core.massValue;
        this.addScore(core.points * this.combo);
        this.triggerCombo();
      }
    }

    // 4. Rogue Drones AI & Evasion
    for (let i = this.rogueDrones.length - 1; i >= 0; i--) {
      const drone = this.rogueDrones[i];
      drone.patrolAngle += drone.speed * 0.03;
      const targetX = Math.cos(drone.patrolAngle) * drone.orbitDist;
      const targetZ = Math.sin(drone.patrolAngle) * drone.orbitDist;
      const droneTarget = new THREE.Vector3(targetX, 0, targetZ);

      // Seek target waypoint
      const toTarget = new THREE.Vector3().subVectors(droneTarget, drone.group.position);
      drone.vel.add(toTarget.multiplyScalar(0.015));

      // Gravity pull on drone
      const toPlayer = new THREE.Vector3().subVectors(this.playerPos, drone.group.position);
      const dist = toPlayer.length();

      if (dist < curGravRadius * 0.9) {
        // Drone attempts to thruster away if under heavy gravity!
        toPlayer.normalize();
        const pull = (this.gravitationalConstant * 25) / (dist * dist + 2);
        drone.vel.add(toPlayer.multiplyScalar(pull));
      }

      drone.vel.multiplyScalar(0.92);
      drone.group.position.add(drone.vel);
      drone.group.lookAt(this.playerPos);

      // Check collision with singularity
      if (dist < currentSingularityRadius + drone.radius) {
        this.sound.playExplosion();
        this.createExplosion(drone.group.position, 0xf59e0b, 30);
        this.scene.remove(drone.group);
        this.rogueDrones.splice(i, 1);

        this.mass += 80;
        this.addScore(500 * this.combo);
        this.triggerCombo();
      }
    }

    // 5. Particles Update
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.mesh.position.add(p.vel);
      p.life -= p.decay;
      p.mesh.scale.set(p.life, p.life, p.life);

      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        this.particles.splice(i, 1);
      }
    }

    // Check Wave Completion
    if (this.asteroids.length === 0 && this.energyCores.length === 0) {
      this.wave++;
      this.spawnWave(this.wave);
    }
  }

  triggerCombo() {
    this.combo = Math.min(8, this.combo + 1);
    this.comboTimer = 2.8; // seconds to keep combo
  }

  addScore(val) {
    this.score += val;
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('orbitcrash_highscore', this.highScore.toString());
    }
    this.updateHUD();
  }

  updateHUD() {
    const scoreEl = document.getElementById('hud-score');
    const highEl = document.getElementById('hud-highscore');
    const massEl = document.getElementById('hud-mass');
    const waveEl = document.getElementById('hud-wave');
    const comboEl = document.getElementById('hud-combo');
    const cooldownEl = document.getElementById('hud-cooldown');

    if (scoreEl) scoreEl.innerText = this.score.toLocaleString();
    if (highEl) highEl.innerText = this.highScore.toLocaleString();
    if (massEl) massEl.innerText = `${this.mass} M☉`;
    if (waveEl) waveEl.innerText = `WAVE ${this.wave}`;
    if (comboEl) {
      if (this.combo > 1) {
        comboEl.innerText = `x${this.combo} COMBO!`;
        comboEl.style.opacity = '1';
      } else {
        comboEl.style.opacity = '0';
      }
    }
    if (cooldownEl) {
      if (this.overdriveCooldown > 0) {
        cooldownEl.innerText = `OVERDRIVE: ${this.overdriveCooldown.toFixed(1)}s`;
        cooldownEl.style.color = '#f59e0b';
      } else {
        cooldownEl.innerText = `OVERDRIVE: READY [SPACE / CLICK]`;
        cooldownEl.style.color = '#00f0ff';
      }
    }
  }

  updateHUDNotification(msg) {
    const notifyEl = document.getElementById('hud-notification');
    if (notifyEl) {
      notifyEl.innerText = msg;
      notifyEl.style.opacity = '1';
      setTimeout(() => {
        notifyEl.style.opacity = '0';
      }, 2600);
    }
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate(currentTime) {
    requestAnimationFrame(this.animate);

    const delta = Math.min(0.1, (currentTime - this.lastFrameTime) / 1000);
    this.lastFrameTime = currentTime;

    // Calculate FPS
    this.frameCount++;
    if (currentTime - this.fpsTimer >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.fpsTimer = currentTime;
      const fpsEl = document.getElementById('hud-fps');
      if (fpsEl) fpsEl.innerText = `${this.fps} FPS`;
    }

    if (!this.paused) {
      this.updatePhysics(delta);
    }

    // Slowly rotate background starfield
    if (this.starfield) {
      this.starfield.rotation.y += 0.0003;
    }

    this.renderer.render(this.scene, this.camera);
  }

  toggleSound() {
    this.sound.enabled = !this.sound.enabled;
    return this.sound.enabled;
  }

  resetGame() {
    // Clear entities
    this.asteroids.forEach(a => this.scene.remove(a.mesh));
    this.energyCores.forEach(c => this.scene.remove(c.mesh));
    this.rogueDrones.forEach(d => this.scene.remove(d.group));
    this.particles.forEach(p => this.scene.remove(p.mesh));

    this.asteroids = [];
    this.energyCores = [];
    this.rogueDrones = [];
    this.particles = [];

    this.score = 0;
    this.mass = 250;
    this.wave = 1;
    this.combo = 1;
    this.playerPos.set(0, 0, 0);
    this.playerVel.set(0, 0, 0);
    this.spawnWave(1);
    this.updateHUD();
  }
}

// Global initialization helper
window.initOrbitCrashGame = function(containerId) {
  return new OrbitCrashGame(containerId);
};
