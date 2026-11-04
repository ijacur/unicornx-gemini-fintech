# Jasur Shukurov (@machampk) — 3D Game Universe & Engineering Showcase

Playable 3D WebGL game website and engineering showcase built for **IT Navigator Bukhara 2026** and **School 21 Samarkand (IRBIS Tribe, Level 8)**.

---

## 🎮 What Is Included

1. **Playable 3D WebGL Game (`Singularity: OrbitCrash Arena`)**:
   - Built on Three.js (r128) running at rock-solid 60 FPS.
   - Real-time Newtonian Gravity ($F_g = G \frac{m_1 m_2}{r^2 + \epsilon}$) with Verlet numerical integration.
   - Matter accretion: absorbs asteroids, expands Event Horizon ($R_s = \frac{2GM}{c^2}$), and triggers particle shockwaves.
   - Built-in procedural Web Audio API synthesizer for thruster sub-bass, crystal chimes, and gravitational pulse bursts (no external mp3 files needed).
   - Responsive on mobile (touch drag) and desktop (WASD / Mouse / Space).

2. **Under-The-Hood ("Kapot Osti") Interactive Modals**:
   - System Architecture diagrams (Three.js client, Go WebSocket server, C# Unity Sensory AI).
   - Mathematical equations (Newtonian gravity, acoustic decibel falloff, gear ratios).
   - Real low-level C memory allocation buffers, GLSL fragment shaders, and Unity C# AI loops.

3. **Featured Projects**:
   - **OrbitCrash: Gravity Heist** (3D WebGL, Go WebSocket low-latency backend)
   - **You Are Black Hole** (GLSL lensing shader, matter accretion)
   - **Nightmare Protocol: Sensory AI** (Project Zomboid & Resident Evil 2 inspired sensory raycasting)
   - **Kiber-Magnat 3D: Samarqand 2050** (3D WebGL arcade & autonomous AI CEO engine)
   - **The Machinist Core: Jack & Bruce Mechanics -> C Memory Architecture** (Zero-leak circular buffers, pointer arithmetic)
   - **MedLoop AI & MedStat** (SamSMU 8s clinical triage & Zenodo-verified statistics)

4. **Dev Console / Easter Egg Terminal (`~`)**:
   - Press `~` (backtick) or click the **Terminal** button in the header.
   - Commands: `help`, `status`, `games`, `play`, `buxoro`, `school21`, `segfault`, `clear`.
   - `buxoro`: Triggers celebration confetti for Bukhara IT peers!
   - `segfault`: Simulates low-level C memory crash and auto-recovers with GDB.

5. **Trilingual Localization**:
   - Instant toggle between **O'zbekcha (UZ)**, **Русский (RU)**, and **English (EN)**.

---

## 🚀 How to Run & Deploy

### Quick Local Access:
- Simply double-click `game_studio.html` or run:
  ```bash
  open /Users/jasur/Desktop/Turnir/game_studio.html
  ```

### Local Development Server:
```bash
cd /Users/jasur/Desktop/Turnir/jasur_game_studio
python3 -m http.server 3000
# Open http://localhost:3000
```

### 1-Click Deploy to Vercel / Netlify:
- **Vercel**: `npx vercel deploy /Users/jasur/Desktop/Turnir/jasur_game_studio --prod`
- **Netlify**: `npx netlify deploy --dir=/Users/jasur/Desktop/Turnir/jasur_game_studio --prod`
