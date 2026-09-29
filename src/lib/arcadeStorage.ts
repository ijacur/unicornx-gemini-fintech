import type { ArcadeGame, PlayerStats, LeaderboardEntry, DailyQuest } from '../types/arcade';

const ARCADE_GAMES_KEY = 'nexus_arcade_games_v1';
const PLAYER_STATS_KEY = 'nexus_player_stats_v1';
const LEADERBOARD_KEY = 'nexus_leaderboard_v1';

export const DEFAULT_ARCADE_GAMES: ArcadeGame[] = [
  {
    id: '3d-cyber-runner',
    title: '3D Cyber Runner (WebGL PBR)',
    tagline: 'Toshkent 2050 Kiber-Osmono\'par Parkuri',
    description: 'Haqiqiy 60 FPS WebGL grafikasi, dinamik yorug\'lik (PBR), devor bo\'ylab yugurish va futuristik Toshkent ko\'chalari.',
    category: '3D',
    author: 'Jasur (School 21)',
    thumbnail: '🚀',
    type: 'iframe',
    url: '/games/platformer3d.html',
    playCount: 14280,
    rating: 4.9,
    likes: 1240,
    tags: ['WebGL', '3D', 'Parkour', 'Cyberpunk', '60FPS'],
    featured: true,
    createdAt: '2026-09-20',
  },
  {
    id: '2d-retro-platformer',
    title: 'Retro Platformer Quest',
    tagline: 'Klassik Piksel Sarguzashti',
    description: 'Rang-barang platformalar, sakrash fizikasi, to\'planadigan kristallar va dushmanlar bilan to\'liq 2D platformer.',
    category: '2D',
    author: 'Vibe Coding Team',
    thumbnail: '🍄',
    type: 'iframe',
    url: '/games/platformer2d.html',
    playCount: 9840,
    rating: 4.8,
    likes: 890,
    tags: ['2D', 'Retro', 'Arcade', 'Platformer'],
    featured: true,
    createdAt: '2026-09-21',
  },
  {
    id: 'neon-starfighter',
    title: 'Neon Starfighter: Bullet Blitz',
    tagline: 'Lazerli Kosmik Arkada Otishmasi',
    description: '60 FPS Canvas kosmik jangchisi. Lazerlar, portlash zarralari, bonus kuchlar va yuqori ballar jangi!',
    category: 'action',
    author: 'Nexus Arcade Lab',
    thumbnail: '🛸',
    type: 'canvas',
    componentKey: 'neon-shooter',
    playCount: 18500,
    rating: 4.95,
    likes: 2100,
    tags: ['Shooter', 'Action', 'Arcade', 'Neon'],
    featured: true,
    createdAt: '2026-09-22',
  },
  {
    id: 'quantum-2048',
    title: 'Quantum 2048: Cyber Fusion',
    tagline: 'Kiberpank Kvant Boshqotirmasi',
    description: 'Kvant yadrolarini birlashtiring va 2048 darajasiga yeting! Maxsus neon effektlari va ovozli mulohaza.',
    category: 'puzzle',
    author: 'FinGemini Devs',
    thumbnail: '⚛️',
    type: 'canvas',
    componentKey: 'quantum-2048',
    playCount: 11200,
    rating: 4.7,
    likes: 750,
    tags: ['Puzzle', '2048', 'Strategy', 'Brain'],
    featured: false,
    createdAt: '2026-09-22',
  },
  {
    id: 'cyber-bazaar-rpg',
    title: 'Cyber-Bazaar 2050 RPG',
    tagline: 'Gemini AI Boshqaradigan Jonli Savdo',
    description: 'Akram aka, Sora va Mayor Rustam bilan real vaqtda savdolashib, Toshkentning eng boy savdogariga aylaning.',
    category: 'ai',
    author: 'UnicornX Team',
    thumbnail: '🤖',
    type: 'custom',
    componentKey: 'cyber-bazaar',
    playCount: 16700,
    rating: 4.9,
    likes: 1890,
    tags: ['AI RPG', 'Gemini AI', 'Procedural', 'Trading'],
    featured: true,
    createdAt: '2026-09-23',
  },
  {
    id: 'mulk-detective-game',
    title: 'MulkX: Ko‘chmas Mulk & Kadastr Detektivi',
    tagline: 'Samarqand Uy-Joy & Yer Firibgarligidan Himoya Simulyatori',
    description: 'Instagramdagi soxta millioner quruvchilar, gazsiz domlar, tilxat balosi va qizil chiziq tuzoqlarini fosh eting!',
    category: 'ai',
    author: 'Samarqand Master-Klass',
    thumbnail: '🏢',
    type: 'custom',
    componentKey: 'mulk-detective',
    playCount: 15400,
    rating: 5.0,
    likes: 2450,
    tags: ['Ekspertiza', 'Simulyator', 'Samarqand', 'Kadastr', 'Ta\'limiy'],
    featured: true,
    createdAt: '2026-09-29',
  },
];

export const INITIAL_PLAYER_STATS: PlayerStats = {
  username: 'Kiber-O\'yinchi',
  level: 3,
  xp: 340,
  nextLevelXp: 500,
  coins: 1250,
  gamesPlayed: 14,
  highScores: {
    'neon-starfighter': 4520,
    'quantum-2048': 2048,
    '3d-cyber-runner': 1200,
  },
  unlockedAchievements: ['first_blood', 'speed_demon'],
};

export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  { id: '1', player: 'CyberAlisher', gameId: 'neon-starfighter', gameTitle: 'Neon Starfighter', score: 18450, avatar: '⚡', date: 'Bugun' },
  { id: '2', player: 'SamarkandGamer', gameId: '3d-cyber-runner', gameTitle: '3D Cyber Runner', score: 14200, avatar: '👑', date: 'Bugun' },
  { id: '3', player: 'MalikaPro', gameId: 'quantum-2048', gameTitle: 'Quantum 2048', score: 8192, avatar: '🔥', date: 'Kecha' },
  { id: '4', player: 'Jasur_Dev', gameId: 'cyber-bazaar-rpg', gameTitle: 'Cyber-Bazaar 2050', score: 65000, avatar: '🤖', date: 'Kecha' },
  { id: '5', player: 'TashkentSniper', gameId: 'neon-starfighter', gameTitle: 'Neon Starfighter', score: 12300, avatar: '🎯', date: '2 k oldin' },
];

export const DAILY_QUESTS: DailyQuest[] = [
  { id: 'q1', title: 'Istalgan 2 ta o\'yinni o\'ynang', rewardXp: 100, rewardCoins: 150, completed: true, progress: 2, total: 2 },
  { id: 'q2', title: 'Neon Starfighter\'da 2000 balldan oshiring', rewardXp: 200, rewardCoins: 300, completed: false, progress: 1450, total: 2000 },
  { id: 'q3', title: 'O\'zingizning birinchi o\'yiningizni joylang', rewardXp: 350, rewardCoins: 500, completed: false, progress: 0, total: 1 },
];

export function loadArcadeGames(): ArcadeGame[] {
  try {
    const raw = localStorage.getItem(ARCADE_GAMES_KEY);
    if (!raw) return DEFAULT_ARCADE_GAMES;
    const customGames: ArcadeGame[] = JSON.parse(raw);
    return [...DEFAULT_ARCADE_GAMES, ...customGames];
  } catch {
    return DEFAULT_ARCADE_GAMES;
  }
}

export function saveCustomGame(game: ArcadeGame): void {
  try {
    const raw = localStorage.getItem(ARCADE_GAMES_KEY);
    const existing: ArcadeGame[] = raw ? JSON.parse(raw) : [];
    existing.unshift(game);
    localStorage.setItem(ARCADE_GAMES_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save game:', e);
  }
}

export function loadPlayerStats(): PlayerStats {
  try {
    const raw = localStorage.getItem(PLAYER_STATS_KEY);
    return raw ? JSON.parse(raw) : INITIAL_PLAYER_STATS;
  } catch {
    return INITIAL_PLAYER_STATS;
  }
}

export function savePlayerStats(stats: PlayerStats): void {
  try {
    localStorage.setItem(PLAYER_STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error(e);
  }
}

export function addPlayerXp(amount: number): PlayerStats {
  const current = loadPlayerStats();
  current.xp += amount;
  current.gamesPlayed += 1;
  while (current.xp >= current.nextLevelXp) {
    current.xp -= current.nextLevelXp;
    current.level += 1;
    current.nextLevelXp = Math.round(current.nextLevelXp * 1.4);
    current.coins += 200;
  }
  savePlayerStats(current);
  return current;
}

export function loadLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    return raw ? JSON.parse(raw) : INITIAL_LEADERBOARD;
  } catch {
    return INITIAL_LEADERBOARD;
  }
}

export function addLeaderboardScore(entry: Omit<LeaderboardEntry, 'id' | 'date'>): LeaderboardEntry[] {
  const list = loadLeaderboard();
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: 'lb_' + Date.now(),
    date: 'Hozirgina',
  };
  list.unshift(newEntry);
  const sorted = list.sort((a, b) => b.score - a.score).slice(0, 10);
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(sorted));
  } catch (e) {
    console.error(e);
  }
  return sorted;
}
