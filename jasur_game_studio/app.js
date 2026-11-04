/**
 * JASUR SHUKUROV (@machampk) — GAME UNIVERSE PORTFOLIO CONTROLLER
 * Handles i18n (UZ/RU/EN), Interactive Under-The-Hood Modals, Dev Terminal & Audio
 */

const I18N_DATA = {
  uz: {
    badge_status: "LEVEL 8 • IRBIS TRIBE • SCHOOL 21 SAMARKAND",
    nav_games: "O'yinlar",
    nav_play: "Sahnada O'ynash",
    nav_origin: "Mexanika & Kod",
    nav_tech: "Texnologiyalar",
    nav_terminal: "Terminal (~)",
    
    hero_title_1: "O'YINLARNING KAPOT OSTI",
    hero_title_2: "FIZIKA, AI VA C/C++ ARXITEKTURASI",
    hero_desc: "Tibbiyot, sanoat tikuv mashinalari (Jack & Bruce) mexanikasi va School 21 fundamental C kodi birlashgan joyda tug'ilgan GameDev loyihalari. Shunchaki o'ynash emas, har bir bayt va Nyuton formulasini boshqarish.",
    hero_btn_play: "OrbitCrash'ni O'ynash",
    hero_btn_explore: "Loyihalarni Ko'rish",
    hero_stat_jam: "5+ Game Jam",
    hero_stat_jam_desc: "48-soatlik non-stop xakatonlar",
    hero_stat_rank: "3-O'RIN",
    hero_stat_rank_desc: "School 21 Game Dev chempionati",
    hero_stat_level: "Level 8",
    hero_stat_level_desc: "School 21 Samarkand (IRBIS)",
    hero_stat_speed: "60 FPS",
    hero_stat_speed_desc: "Zero-latency WebGL & Go Backend",

    game_sec_title: "YARATILGAN O'YINLAR VA MEXANIKALAR",
    game_sec_sub: "Har bir loyiha ustiga bosing — uning arxitekturasi, matematik formulalari va kapot ostidagi kodini ko'ring.",
    filter_all: "Barchasi",
    filter_3d: "3D WebGL & Unity",
    filter_systems: "C / C# & Mexanika",
    filter_ai: "AI & Simulyatorlar",

    game_card_underthehood: "Kapot Ostini Ko'rish",
    game_card_playnow: "O'ynash / Ko'rish",

    origin_sec_badge: "NOODATIY BACKSTORY",
    origin_sec_title: "TEMIR MEXANIKADAN C XOTIRASIGA VA O'YINLARGA",
    origin_p1: "Ko'pchilik mendan: <strong>'Qanday qilib tikuv mashinasi ustasi va tibbiyot talabasi GameDev'ga kirib kelgan?'</strong> deb so'raydi. Javob oddiy: <em>kapot ostidagi mexanizmni tushunish ishtiyoqi</em>.",
    origin_p2: "Men bolaligimdan oilaviy biznesimizda sanoat tikuv mashinalari (<strong>Jack, Bruce, Cassel, Zenox</strong>) ustasi bo'lib, motorni, differensial shesternyalarni va igna mexanizmining mikrosekundlik sinxronini qo'lim bilan ushlab katta bo'lganman. Dvigateldagi shesternyalar qanday birlashsa, kompyuterda ham C tili xotira (RAM) bilan xuddi shunday ishlaydi.",
    origin_p3: "School 21'ning mashhur 'Basseyn'iga kirganimda pointerlar, <code>malloc</code>, <code>free</code> va segfaultlar menga begona tuyulmadi — bu xuddi shesternyasi noto'g'ri o'rnatilgan mashinaning tiqilib qolishidek edi. Fundamental poydevorni qo'yib, C#, Unity, Three.js va Go yordamida real o'yinlar fizikasi va sun'iy intellektiga sho'ng'idim.",

    stack_sec_title: "TEXNOLOGIK ARSENAL",
    stack_sec_sub: "O'yin dvijoklaridan tortib past darajali tizimlar va neyrotarmoqlargacha.",

    cta_title: "BUXORODA BIRGA O'YIN QILAMIZMI?",
    cta_sub: "School 21 'Basseyn'iga tayyormisiz? Game Jam'da jamoa kerakmi? Yoki o'yin mexanikasi bo'yicha maslahat? Menga to'g'ridan-to'g'ri yozing!",
    cta_tg: "Telegram: @Shukurov_Jasur",
    cta_jam: "Game Jam Chaqiruvi",

    terminal_title: "MACHAMPK DEV CONSOLE // v2.6.4",
    terminal_welcome: "Jasur Shukurov dev terminaliga xush kelibsiz. Mavjud buyruqlar uchun 'help' deb yozing.",
    terminal_placeholder: "Buyruq kiriting (help, games, buxoro, segfault, clear)...",

    modal_title_architecture: "Tizim Arxitekturasi",
    modal_title_physics: "Fizika & Matematika",
    modal_title_code: "Kapot Ostidagi Kod",
    modal_close: "Yopish"
  },

  ru: {
    badge_status: "LEVEL 8 • IRBIS TRIBE • SCHOOL 21 SAMARKAND",
    nav_games: "Игры",
    nav_play: "Играть на сцене",
    nav_origin: "Механика и Код",
    nav_tech: "Стек технологий",
    nav_terminal: "Терминал (~)",

    hero_title_1: "ЧТО ПОД КАПОТОМ ИГР",
    hero_title_2: "ФИЗИКА, AI И АРХИТЕКТУРА C/C++",
    hero_desc: "Геймдев-проекты на стыке медицины, реальной механики промышленных швейных машин (Jack & Bruce) и фундаментального C в School 21. Не просто играем, а управляем каждым байтом памяти и формулами Ньютона.",
    hero_btn_play: "Играть в OrbitCrash",
    hero_btn_explore: "Смотреть проекты",
    hero_stat_jam: "5+ Game Jam",
    hero_stat_jam_desc: "48-часовые хакатоны без сна",
    hero_stat_rank: "3-е МЕСТО",
    hero_stat_rank_desc: "Game Dev соревнование School 21",
    hero_stat_level: "Level 8",
    hero_stat_level_desc: "School 21 Samarkand (IRBIS)",
    hero_stat_speed: "60 FPS",
    hero_stat_speed_desc: "Zero-latency WebGL & Go бэкенд",

    game_sec_title: "СОЗДАННЫЕ ИГРЫ И МЕХАНИКИ",
    game_sec_sub: "Нажмите на любой проект, чтобы открыть архитектуру, математику и разобрать код под капотом.",
    filter_all: "Все",
    filter_3d: "3D WebGL & Unity",
    filter_systems: "C / C# и Механика",
    filter_ai: "AI и Симуляторы",

    game_card_underthehood: "Под капот (Архитектура)",
    game_card_playnow: "Запустить / Играть",

    origin_sec_badge: "НЕОБЫЧНЫЙ БЭКГРАУНД",
    origin_sec_title: "ОТ ШВЕЙНОЙ МЕХАНИКИ ДО ПАМЯТИ C И ГЕЙМДЕВА",
    origin_p1: "Многие удивляются: <strong>«Как мастер по швейным машинам и студент медицинского вуза стал геймдев-разработчиком?»</strong> Ответ простой: <em>страсть разобрать сложный механизм до последнего винтика</em>.",
    origin_p2: "С детства я работал с промышленным оборудованием (<strong>Jack, Bruce, Cassel, Zenox</strong>) — шестерни, моторы, регулировка челночного хода с точностью до десятых долей миллиметра. Когда шестерни сцепляются, машина шьёт без сбоев. В компьютере язык C работает с памятью (RAM) абсолютно так же.",
    origin_p3: "Когда я пришёл в «Бассейн» School 21, указатели, <code>malloc</code>, <code>free</code> и сегфолты были мне понятны на физическом уровне: это как заклинивший механизм при неправильной сборке. Построив фундамент, я ушёл в C#, Unity, WebGL и мультиплеерный бэкенд на Go.",

    stack_sec_title: "ТЕХНОЛОГИЧЕСКИЙ АРСЕНАЛ",
    stack_sec_sub: "От игровых физических движков до низкоуровневых систем и нейросетей.",

    cta_title: "СОБЕРЁМ ИГРУ ВМЕСТЕ В БУХАРЕ?",
    cta_sub: "Готовы прыгнуть в Бассейн School 21? Нужен тиммейт на Game Jam или совет по геймдеву? Пишите напрямую!",
    cta_tg: "Telegram: @Shukurov_Jasur",
    cta_jam: "Вызов на Game Jam",

    terminal_title: "MACHAMPK DEV CONSOLE // v2.6.4",
    terminal_welcome: "Добро пожаловать в dev-терминал Жасура Шукурова. Введите 'help' для списка команд.",
    terminal_placeholder: "Введите команду (help, games, buxoro, segfault, clear)...",

    modal_title_architecture: "Архитектура системы",
    modal_title_physics: "Физика и Математика",
    modal_title_code: "Исходный код под капотом",
    modal_close: "Закрыть"
  },

  en: {
    badge_status: "LEVEL 8 • IRBIS TRIBE • SCHOOL 21 SAMARKAND",
    nav_games: "Games",
    nav_play: "Play Live",
    nav_origin: "Mechanics & Code",
    nav_tech: "Tech Stack",
    nav_terminal: "Terminal (~)",

    hero_title_1: "UNDER THE HOOD OF GAMEDEV",
    hero_title_2: "PHYSICS, AI & LOW-LEVEL C/C++",
    hero_desc: "Born at the confluence of healthcare, industrial machinery (Jack & Bruce) mechanics, and rigorous School 21 C memory fundamentals. We don't just play games; we engineer every byte and Newtonian equation.",
    hero_btn_play: "Play OrbitCrash Live",
    hero_btn_explore: "Inspect Projects",
    hero_stat_jam: "5+ Game Jams",
    hero_stat_jam_desc: "48-hour non-stop hackathons",
    hero_stat_rank: "3rd PLACE",
    hero_stat_rank_desc: "School 21 Game Dev Tournament",
    hero_stat_level: "Level 8",
    hero_stat_level_desc: "School 21 Samarkand (IRBIS)",
    hero_stat_speed: "60 FPS",
    hero_stat_speed_desc: "Zero-latency WebGL & Go Backend",

    game_sec_title: "GAMES & ENGINE ARCHITECTURES",
    game_sec_sub: "Click any project to inspect its architecture diagram, mathematical equations, and raw code.",
    filter_all: "All",
    filter_3d: "3D WebGL & Unity",
    filter_systems: "C / C# & Mechanics",
    filter_ai: "AI & Simulators",

    game_card_underthehood: "Under The Hood",
    game_card_playnow: "Play / Inspect",

    origin_sec_badge: "UNCONVENTIONAL ORIGIN",
    origin_sec_title: "FROM HEAVY MACHINERY TO C MEMORY & GAMEDEV",
    origin_p1: "People frequently ask: <strong>'How does an industrial sewing machine technician & healthcare student become a GameDev engineer?'</strong> The answer is simple: <em>an obsession with understanding the gears beneath the casing</em>.",
    origin_p2: "Growing up working on heavy industrial sewing machines (<strong>Jack, Bruce, Cassel, Zenox</strong>), I tuned electric motors, differential feed dogs, and rotary looper timings down to fractions of a millimeter. Hardware gears mesh mechanically; low-level C pointers mesh across memory pages in the exact same manner.",
    origin_p3: "Entering School 21's legendary Piscine, pointer arithmetic, <code>malloc</code>, <code>free</code>, and segfaults were intuitive — identical to diagnosing jammed mechanical gearboxes. With ironclad low-level discipline established, I scaled up to C#, Unity, Three.js WebGL, and Go WebSocket multiplayer engines.",

    stack_sec_title: "TECHNICAL ARSENAL",
    stack_sec_sub: "From 3D game engines to bare-metal memory systems and autonomous AI agents.",

    cta_title: "READY TO BUILD IN BUKHARA?",
    cta_sub: "Entering School 21 Piscine? Need a veteran Game Jam teammate? Or curious about physics engines? Reach out directly!",
    cta_tg: "Telegram: @Shukurov_Jasur",
    cta_jam: "Challenge to Game Jam",

    terminal_title: "MACHAMPK DEV CONSOLE // v2.6.4",
    terminal_welcome: "Welcome to Jasur Shukurov's dev console. Type 'help' for available commands.",
    terminal_placeholder: "Enter command (help, games, buxoro, segfault, clear)...",

    modal_title_architecture: "System Architecture",
    modal_title_physics: "Physics & Math",
    modal_title_code: "Under-The-Hood Code",
    modal_close: "Close"
  }
};

const PROJECTS_DATA = [
  {
    id: "orbitcrash",
    category: "3d",
    title: "OrbitCrash: Gravity Heist",
    badge: "3D WebGL • Go WebSocket • Multiplayer",
    desc: {
      uz: "Real-vaqtli kosmik tortishish kuchi va orbital slingshot mexanikasi. Toshkent va Buxorodagi o'yinchilar past kechikishli Go backend orqali bir xonada to'qnashadi.",
      ru: "Реально-временная гравитационная механика и орбитальные слинги. Синхронизация игроков между Ташкентом и Бухарой через низколатентный бэкенд на Go.",
      en: "Real-time celestial gravitational physics and orbital slingshot mechanics. Synchronizes players with low-latency Go WebSocket backend."
    },
    metrics: ["60 FPS WebGL", "Go WebSocket (15ms)", "Verlet Physics"],
    architecture: `
┌──────────────────────────┐      WebSocket Binary Packet      ┌──────────────────────────┐
│   Three.js Client (UZ)   │ ◄──────────────────────────────► │    Go Dedicated Server   │
│  - Orbital Prediction    │           (60 Tick/s)            │  - Collision QuadTree    │
│  - Client Dead Reckoning │                                  │  - Authority State Synch │
└──────────────────────────┘                                  └──────────────────────────┘
`,
    math: `
1. Gravitational Attraction:
   F_g = G * (m_1 * m_2) / (||r||^2 + epsilon)

2. Velocity Verlet Numerical Integration:
   x(t + dt) = x(t) + v(t)*dt + 0.5 * a(t)*dt^2
   v(t + dt) = v(t) + 0.5 * [a(t) + a(t + dt)]*dt

3. Orbital Slingshot Velocity Gain:
   v_exit = v_entry + 2 * v_celestial_body
`,
    codeSnippet: `// OrbitCrash Gravitational Force Calculation (C# / JS)
function computeGravity(bodyA, bodyB, G = 0.95, epsilon = 2.0) {
    const dx = bodyB.x - bodyA.x;
    const dy = bodyB.y - bodyA.y;
    const dz = bodyB.z - bodyA.z;
    const distSq = dx*dx + dy*dy + dz*dz + epsilon;
    const dist = Math.sqrt(distSq);
    
    // Newtonian pull with softening parameter epsilon to prevent infinity
    const force = (G * bodyA.mass * bodyB.mass) / distSq;
    return {
        fx: force * (dx / dist),
        fy: force * (dy / dist),
        fz: force * (dz / dist)
    };
}`,
    actionUrl: "#game-canvas-wrapper"
  },
  {
    id: "blackhole",
    category: "3d",
    title: "You Are Black Hole",
    badge: "GLSL Shader • Event Horizon • Procedural",
    desc: {
      uz: "O'yinchi qora tuynukni boshqaradi: materiyani yutish, Shvartsshild radiusi bo'yicha massaning o'sishi va gravitatsion linzalash maxsus GLSL shaderi.",
      ru: "Игрок управляет черной дырой: поглощение материи, рост массы по радиусу Шварцшильда и шейдер гравитационного линзирования на GLSL.",
      en: "Play as a cosmic Singularity: matter accretion, Schwarzschild radius expansion, and custom GLSL gravitational lensing distortion."
    },
    metrics: ["Custom GLSL Fragment", "Mass Accretion", "Procedural Space"],
    architecture: `
[Input Vector] ──► [Singularity Kernel] ──► [Raymarching GLSL Shader]
                         │
                         ├──► Accretion Disk Particle Vortex
                         └──► Dynamic Event Horizon: R_s = 2GM / c^2
`,
    math: `
1. Schwarzschild Radius:
   R_s = (2 * G * M) / c^2

2. Gravitational Deflection Angle (Photon bending):
   theta = (4 * G * M) / (b * c^2)
   (Where b is the photon impact parameter)
`,
    codeSnippet: `// GLSL Fragment Shader: Gravitational Lensing Approximation
uniform vec2 u_blackHolePos;
uniform float u_mass;
varying vec2 vUv;

void main() {
    vec2 toHole = u_blackHolePos - vUv;
    float dist = length(toHole);
    float schwRadius = u_mass * 0.002;
    
    // Discard photon if absorbed inside event horizon
    if (dist < schwRadius) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }
    
    // Light ray deflection distortion
    vec2 offset = normalize(toHole) * (schwRadius / (dist * 8.0));
    vec4 backgroundTex = texture2D(u_starfield, vUv + offset);
    gl_FragColor = backgroundTex;
}`,
    actionUrl: "#game-canvas-wrapper"
  },
  {
    id: "sensory_ai",
    category: "ai",
    title: "Nightmare Protocol: Sensory AI",
    badge: "Project Zomboid / RE2 Inspired • Finite State Machine",
    desc: {
      uz: "Zombilar va yirtqichlarning AI mantiqi: ko'rish konusi (FOV raycasts), qadam tovushlarining tarqalishi va A* yo'l topish algoritmi.",
      ru: "AI логика зомби и мутантов: конусы зрения (FOV), акустическое распространение шума шагов и алгоритм поиска пути A*.",
      en: "Survival horror AI logic: FOV vision cones, acoustic noise propagation, and dynamic A* pathfinding."
    },
    metrics: ["Sensory Cone Raycasts", "Acoustic Decibel Decay", "FSM State Engine"],
    architecture: `
[Player Footstep Noise] ──► [Acoustic Distance Radius] ──► [NPC Suspicion Gauge]
                                                                  │
[Player in Vision Cone] ──► [Line-of-Sight Raycast]   ──► [ALERT / CHASE FSM]
`,
    math: `
1. Vision Cone Angle Test:
   cos(theta) = dot(Forward_Vector, normalize(Player_Pos - NPC_Pos))
   Visible if: cos(theta) >= cos(FOV / 2) AND dist <= View_Distance

2. Acoustic Decibel Attenuation:
   dB(r) = dB_0 - 20 * log10(r / r_0) - alpha * r
`,
    codeSnippet: `// Sensory AI Detection Loop (C# / Unity)
public class ZombieSensoryAI : MonoBehaviour {
    public float fieldOfView = 85f;
    public float hearingRadius = 18f;
    public LayerMask obstructionMask;

    public bool CanDetectPlayer(Transform player, float playerNoiseDb) {
        Vector3 dirToPlayer = (player.position - transform.position).normalized;
        float dist = Vector3.Distance(transform.position, player.position);

        // 1. Acoustic Hearing Check
        if (playerNoiseDb > 20f && dist <= hearingRadius) return true;

        // 2. Optical Vision Cone Check
        if (Vector3.Angle(transform.forward, dirToPlayer) < fieldOfView * 0.5f) {
            if (!Physics.Raycast(transform.position, dirToPlayer, dist, obstructionMask)) {
                return true; // Unobstructed Line of Sight!
            }
        }
        return false;
    }
}`,
    actionUrl: "#"
  },
  {
    id: "machinist_core",
    category: "systems",
    title: "The Machinist Engine: Jack & Bruce -> C Memory",
    badge: "Industrial Mechanics • Low-Level C • Zero Segfault",
    desc: {
      uz: "Sanoat tikuv mashinalari (Jack & Bruce) mexanikasidan C tili xotirasiga ko'prik. Shesternyalar nisbati, igna sinxroni va malloc/free xotira kafolati.",
      ru: "Мост от механики швейных машин (Jack & Bruce) к ручной памяти Си. Передаточные числа, синхрон иглы и строгий контроль malloc/free.",
      en: "The bridge from industrial sewing machines (Jack & Bruce) to low-level C memory allocation, gear timing, and leak-free execution."
    },
    metrics: ["Manual Pointer Math", "Zero Memory Leaks (Valgrind)", "100% C Norminette"],
    architecture: `
[Mechanical Rotary Hook]   ◄── Identical Principles ──►   [Circular Memory Buffer]
- Needle Bar Timing (0.05mm)                              - Ring Buffer Pointer Wrapping
- Differential Feed Dog Gear                              - Cache Line Alignment (64 bytes)
`,
    math: `
1. Gear Ratio Torque Output:
   tau_out = tau_in * (N_driven / N_driving) * eta

2. Pointer Alignment Formula (Cache line):
   aligned_ptr = (ptr + (align - 1)) & ~(align - 1)
`,
    codeSnippet: `// C Low-Level Cyclic Event Buffer with Zero Leak Proof
#include <stdlib.h>
#include <stdint.h>

typedef struct {
    uint32_t *buffer;
    size_t head;
    size_t tail;
    size_t capacity;
} t_mechanic_ring;

t_mechanic_ring* ring_init(size_t capacity) {
    t_mechanic_ring *ring = (t_mechanic_ring*)malloc(sizeof(t_mechanic_ring));
    if (!ring) return NULL;
    ring->buffer = (uint32_t*)malloc(capacity * sizeof(uint32_t));
    if (!ring->buffer) { free(ring); return NULL; }
    ring->head = 0;
    ring->tail = 0;
    ring->capacity = capacity;
    return ring;
}

void ring_destroy(t_mechanic_ring *ring) {
    if (ring) {
        if (ring->buffer) free(ring->buffer);
        free(ring);
    }
}`,
    actionUrl: "#origin-section"
  },
  {
    id: "kiber_magnat",
    category: "3d",
    title: "Kiber-Magnat 3D: Samarqand 2050",
    badge: "3D WebGL Arcade • AI Autonomous CEO • Three.js",
    desc: {
      uz: "Samarqand 2050 futuristik kiber-arkadasi. 5 dollarlik veb-sayt yasashdan boshlab avtonom AI CEO yordamida 1 milliard dollarlik texno-imperiya qurish.",
      ru: "Футуристическая 3D кибер-аркада Самарканда 2050. От сайтов за 5$ до империи на 1 млрд$ с автономным AI CEO.",
      en: "Futuristic 3D arcade tycoon set in Samarkand 2050. Build a \$1B tech unicorn from \$5 websites with an autonomous AI CEO."
    },
    metrics: ["Three.js PBR Engine", "Confetti VFX", "Autonomous AI CEO Mode"],
    architecture: `
[User Tap / AI CEO Agent] ──► [Exponential Market Multiplier] ──► [3D Landmark Mesh Scaling]
                                          │
                                          └──► WebGL Floating Hologram Render
`,
    math: `
1. Compound Capital Scaling:
   Capital(t) = Base_Rev * (1 + Growth_Rate)^t + AI_Arbitrage_Bonus

2. Valuation Metric:
   Valuation = ARR * Multiple + Autonomous_IP_Value
`,
    codeSnippet: `// Autonomous AI CEO Logic in Kiber-Magnat 3D
function runAutonomousAICEO(state) {
    const roiOptions = [
        { name: "Low-Latency Cloud Shard", cost: 1000, multiplier: 1.4 },
        { name: "School 21 Peer Guild", cost: 2500, multiplier: 2.1 },
        { name: "3D Neural Game Studio", cost: 10000, multiplier: 4.5 }
    ];
    
    // Greedy heuristic for maximum exponential yield
    const bestChoice = roiOptions
        .filter(opt => state.balance >= opt.cost)
        .sort((a, b) => (b.multiplier / b.cost) - (a.multiplier / a.cost))[0];
        
    if (bestChoice) {
        state.balance -= bestChoice.cost;
        state.revenuePerSecond *= bestChoice.multiplier;
        triggerHolographicConfetti();
    }
}`,
    actionUrl: "/Users/jasur/Projects/jasur-universe-portfolio/game.html"
  },
  {
    id: "medloop_stat",
    category: "ai",
    title: "MedLoop AI & MedStat Suite",
    badge: "Healthcare Management • AI Triage • Zenodo Published",
    desc: {
      uz: "SamDTU va School 21 hamkorligidagi tibbiy texnologiyalar: 8 soniyalik AI triaj va ilmiy tadqiqotlar uchun xalqaro indekslangan tibbiy statistika tizimi.",
      ru: "Медицинские технологии СамГМУ и School 21: 8-секундный AI-триаж и международно индексированный калькулятор медстатистики на Zenodo.",
      en: "Healthcare systems from SamSMU & School 21: 8-second AI clinical triage and internationally indexed medical biostatistics calculator."
    },
    metrics: ["Zenodo DOI Verified", "8s Latency Triage", "Bayesian Clinical Probability"],
    architecture: `
[Patient Symptom Intake] ──► [Bayesian Priority Classifier] ──► [Emergency Alert Dispatch (8s)]
                                         │
                                         └──► Zenodo Medical Research Statistical Matrix
`,
    math: `
1. Bayesian Diagnostic Probability:
   P(Disease | Symptoms) = [P(Symptoms | Disease) * P(Disease)] / P(Symptoms)

2. Sensitivity & Specificity ROC Curve Area:
   AUC = int_0^1 True_Positive_Rate(t) d(False_Positive_Rate(t))
`,
    codeSnippet: `// Bayesian Triage Confidence Metric
function calculateTriageRisk(symptomsArray, priorPrevalence = 0.05) {
    let likelihoodRatio = 1.0;
    for (const s of symptomsArray) {
        likelihoodRatio *= (s.sensitivity / (1.0 - s.specificity));
    }
    const postOdds = (priorPrevalence / (1.0 - priorPrevalence)) * likelihoodRatio;
    return postOdds / (1.0 + postOdds); // Returns probability 0.0 - 1.0
}`,
    actionUrl: "#"
  }
];

class AppManager {
  constructor() {
    this.currentLang = 'uz';
    this.gameInstance = null;
    this.activeFilter = 'all';
    this.soundEnabled = true;

    this.init();
  }

  init() {
    // 1. Language switcher setup
    this.bindLanguageSwitcher();

    // 2. Render Project Cards
    this.renderProjects(this.activeFilter);
    this.bindFilterButtons();

    // 3. Initialize Playable 3D Game
    setTimeout(() => {
      this.gameInstance = window.initOrbitCrashGame('game-viewport');
      this.bindGameControls();
    }, 150);

    // 4. Modal event listeners
    this.bindModalEvents();

    // 5. Interactive Dev Terminal
    this.bindTerminal();

    // 6. Sound toggle
    this.bindSoundToggle();

    // 7. Update UI with initial language
    this.applyLanguage(this.currentLang);
  }

  bindLanguageSwitcher() {
    const langBtns = document.querySelectorAll('[data-lang-btn]');
    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang-btn');
        this.applyLanguage(lang);
        langBtns.forEach(b => b.classList.remove('bg-cyan-500/30', 'text-cyan-300', 'border-cyan-400'));
        btn.classList.add('bg-cyan-500/30', 'text-cyan-300', 'border-cyan-400');
        this.playUiClick();
      });
    });
  }

  applyLanguage(lang) {
    if (!I18N_DATA[lang]) return;
    this.currentLang = lang;
    const dict = I18N_DATA[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Re-render project descriptions in chosen language
    this.renderProjects(this.activeFilter);
  }

  renderProjects(filter) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const filtered = filter === 'all' 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category === filter);

    grid.innerHTML = filtered.map(p => {
      const desc = p.desc[this.currentLang] || p.desc['en'];
      const dict = I18N_DATA[this.currentLang];

      return `
        <div class="glass-panel rounded-2xl p-6 border-neon flex flex-col justify-between hover:scale-[1.015] transition duration-300">
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 font-semibold">
                ${p.badge}
              </span>
              <span class="text-xs font-mono text-slate-500 uppercase">#${p.category}</span>
            </div>
            
            <h3 class="text-xl font-black text-white mb-2 font-display tracking-wide">${p.title}</h3>
            <p class="text-slate-300 text-sm leading-relaxed mb-4">${desc}</p>
            
            <div class="flex flex-wrap gap-1.5 mb-6">
              ${p.metrics.map(m => `
                <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-700/50">
                  ${m}
                </span>
              `).join('')}
            </div>
          </div>

          <div class="flex items-center gap-3 pt-4 border-t border-slate-800/80">
            <button onclick="window.app.openUnderTheHood('${p.id}')" 
                    class="flex-1 py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs font-mono tracking-wider transition shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-1.5 active:scale-95">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              <span>${dict.game_card_underthehood}</span>
            </button>
            
            <a href="${p.actionUrl}" 
               class="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs font-mono transition flex items-center justify-center gap-1.5 border border-slate-700 active:scale-95">
              <span>${dict.game_card_playnow}</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  bindFilterButtons() {
    const filterBtns = document.querySelectorAll('[data-filter-btn]');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter-btn');
        this.activeFilter = filter;
        filterBtns.forEach(b => b.classList.remove('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-400'));
        btn.classList.add('bg-cyan-500/20', 'text-cyan-300', 'border-cyan-400');
        this.renderProjects(filter);
        this.playUiClick();
      });
    });
  }

  openUnderTheHood(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('hood-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBadge = document.getElementById('modal-badge');
    const modalArch = document.getElementById('modal-arch');
    const modalMath = document.getElementById('modal-math');
    const modalCode = document.getElementById('modal-code');

    modalTitle.innerText = project.title;
    modalBadge.innerText = project.badge;
    modalArch.innerText = project.architecture.trim();
    modalMath.innerText = project.math.trim();
    modalCode.innerText = project.codeSnippet.trim();

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    this.playUiClick();
  }

  bindModalEvents() {
    const modal = document.getElementById('hood-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        this.playUiClick();
      });
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        }
      });
    }
  }

  bindGameControls() {
    const resetBtn = document.getElementById('game-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (this.gameInstance) this.gameInstance.resetGame();
        this.playUiClick();
      });
    }

    const soundBtn = document.getElementById('game-sound-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        if (this.gameInstance) {
          const isEnabled = this.gameInstance.toggleSound();
          soundBtn.innerHTML = isEnabled 
            ? `<svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>`
            : `<svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/></svg>`;
        }
        this.playUiClick();
      });
    }
  }

  bindTerminal() {
    const termModal = document.getElementById('terminal-modal');
    const termToggle = document.getElementById('nav-terminal-btn');
    const termClose = document.getElementById('terminal-close-btn');
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');

    const toggleTerminal = () => {
      termModal.classList.toggle('hidden');
      termModal.classList.toggle('flex');
      if (!termModal.classList.contains('hidden')) {
        termInput.focus();
      }
      this.playUiClick();
    };

    if (termToggle) termToggle.addEventListener('click', toggleTerminal);
    if (termClose) termClose.addEventListener('click', toggleTerminal);

    // Toggle with backtick key (~)
    window.addEventListener('keydown', (e) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        toggleTerminal();
      }
    });

    if (termInput) {
      termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = termInput.value.trim().toLowerCase();
          termInput.value = '';
          this.executeTerminalCommand(cmd, termOutput);
        }
      });
    }
  }

  executeTerminalCommand(cmd, outputEl) {
    const append = (html) => {
      outputEl.innerHTML += `<div class="mb-1">${html}</div>`;
      outputEl.scrollTop = outputEl.scrollHeight;
    };

    append(`<span class="text-cyan-400 font-bold">machampk@school21:~$</span> <span class="text-white">${cmd}</span>`);

    switch(cmd) {
      case 'help':
        append(`
          <div class="text-slate-300 text-xs space-y-1">
            <p><span class="text-cyan-300 font-mono">status</span> — Jasur's School 21 & University live telemetry</p>
            <p><span class="text-cyan-300 font-mono">games</span> — List all engineered game engines</p>
            <p><span class="text-cyan-300 font-mono">play</span> — Jump directly to OrbitCrash arena</p>
            <p><span class="text-cyan-300 font-mono">buxoro</span> — Special message to Bukhara IT Navigator peers!</p>
            <p><span class="text-cyan-300 font-mono">school21</span> — What Piscine & Level 8 really mean</p>
            <p><span class="text-cyan-300 font-mono">segfault</span> — Simulate a low-level C memory segmentation fault</p>
            <p><span class="text-cyan-300 font-mono">clear</span> — Clear terminal output</p>
          </div>
        `);
        break;

      case 'status':
        append(`
          <div class="text-emerald-400 text-xs font-mono space-y-0.5">
            <p>[STATUS] Jasur Shukurov (@machampk)</p>
            <p>[TRIBE] IRBIS • School 21 Samarkand • Level 8</p>
            <p>[MEDICINE] SamSMU Healthcare Management</p>
            <p>[INDUSTRY] Industrial Machinery Mechanic (Jack & Bruce)</p>
            <p>[GAMEDEV] 3rd Place School 21 Game Dev, 5+ Game Jams</p>
            <p>[STACK] C, C#, Unity, WebGL/Three.js, Go, AI Agents</p>
          </div>
        `);
        break;

      case 'games':
        append(`
          <div class="text-cyan-300 text-xs font-mono space-y-0.5">
            <p>1. OrbitCrash: Gravity Heist (3D WebGL / Go WebSocket)</p>
            <p>2. You Are Black Hole (GLSL Shaders & Mass Accretion)</p>
            <p>3. Nightmare Protocol: Sensory AI (Project Zomboid inspired FOV)</p>
            <p>4. Kiber-Magnat 3D: Samarqand 2050 (Autonomous AI CEO Arcade)</p>
            <p>5. The Machinist Engine: Jack & Bruce Mechanical Core</p>
          </div>
        `);
        break;

      case 'play':
        append(`<span class="text-amber-400">Jumping to OrbitCrash Arena...</span>`);
        window.location.hash = "game-canvas-wrapper";
        break;

      case 'buxoro':
        append(`
          <div class="text-yellow-300 text-xs font-mono p-2 bg-yellow-950/40 border border-yellow-700/50 rounded">
            🎉 ASSALOMU ALAYKUM, BUXORO IT NAVIGATOR!
            Agar tikuv mashinalari ustasi va tibbiyot talabasi o'yin fizikasi va AI yozgan bo'lsa,
            Siz har qanday sohani zabt eta olasiz! Olg'a, School 21 piyirlari!
          </div>
        `);
        if (window.confetti) {
          window.confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
        break;

      case 'school21':
        append(`
          <div class="text-indigo-300 text-xs font-mono">
            School 21: No teachers. No rote memorization. Pure Peer-to-Peer grit.
            From C pointers to high-performance engines, you learn to solve problems in real battle conditions!
          </div>
        `);
        break;

      case 'segfault':
        append(`
          <div class="text-rose-400 text-xs font-mono bg-rose-950/40 p-2 rounded border border-rose-800">
            [FATAL] Segmentation fault (core dumped) at 0x00007fffdeadbeef!
            Dangling pointer detected: memory accessed after free().
            Recovering via School 21 GDB peer-review protocol... OK! System operational.
          </div>
        `);
        break;

      case 'clear':
        outputEl.innerHTML = '';
        break;

      default:
        append(`<span class="text-rose-400">Command not found: ${cmd}. Type 'help' for available commands.</span>`);
    }
  }

  playUiClick() {
    if (!this.soundEnabled) return;
    try {
      if (this.gameInstance && this.gameInstance.sound) {
        this.gameInstance.sound.playThrust();
      }
    } catch(e) {}
  }

  bindSoundToggle() {
    // Sound is integrated with the game engine sound toggle
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AppManager();
});
