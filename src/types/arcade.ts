/**
 * Nexus Arcade: Types & Data Models
 */

export type GameCategory =
  | 'all'
  | '3D'
  | '2D'
  | 'action'
  | 'ai'
  | 'puzzle'
  | 'community';

export type GameType = 'iframe' | 'canvas' | 'custom' | 'embed';

export interface ArcadeGame {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: '3D' | '2D' | 'action' | 'ai' | 'puzzle' | 'community';
  author: string;
  thumbnail: string;
  type: GameType;
  url?: string;
  customCode?: string;
  componentKey?: 'neon-shooter' | 'quantum-2048' | 'cyber-bazaar';
  playCount: number;
  rating: number; // 1 to 5
  likes: number;
  tags: string[];
  featured?: boolean;
  createdAt: string;
}

export interface PlayerStats {
  username: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  coins: number;
  gamesPlayed: number;
  highScores: Record<string, number>;
  unlockedAchievements: string[];
}

export interface LeaderboardEntry {
  id: string;
  player: string;
  gameId: string;
  gameTitle: string;
  score: number;
  avatar: string;
  date: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  rewardXp: number;
  rewardCoins: number;
  completed: boolean;
  progress: number;
  total: number;
}
