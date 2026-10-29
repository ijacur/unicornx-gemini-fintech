import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Search,
  Trophy,
  Play,
  Upload,
  Flame,
  Star,
  Award,
  Users,
  Coins
} from 'lucide-react';
import type { ArcadeGame, GameCategory, PlayerStats, LeaderboardEntry } from '../../types/arcade';
import {
  loadArcadeGames,
  loadPlayerStats,
  loadLeaderboard,
  DAILY_QUESTS,
  addPlayerXp
} from '../../lib/arcadeStorage';
import { GamePlayerModal } from './GamePlayerModal';
import { GameSubmissionModal } from './GameSubmissionModal';

export const ArcadeHub: React.FC = () => {
  const [games, setGames] = useState<ArcadeGame[]>(() => loadArcadeGames());
  const [playerStats, setPlayerStats] = useState<PlayerStats>(() => loadPlayerStats());
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => loadLeaderboard());
  const [selectedCategory, setSelectedCategory] = useState<GameCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [activeGame, setActiveGame] = useState<ArcadeGame | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);

  // Sync state periodically or on change
  const refreshData = () => {
    setGames(loadArcadeGames());
    setPlayerStats(loadPlayerStats());
    setLeaderboard(loadLeaderboard());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handlePlayGame = (game: ArcadeGame) => {
    setActiveGame(game);
    // Increment play count & give XP
    const updatedStats = addPlayerXp(40);
    setPlayerStats(updatedStats);
  };

  const handleLikeGame = (gameId: string) => {
    setGames((prev) =>
      prev.map((g) => (g.id === gameId ? { ...g, likes: g.likes + 1 } : g))
    );
  };

  const handleGameAdded = (newGame: ArcadeGame) => {
    setGames((prev) => [newGame, ...prev]);
    setPlayerStats(loadPlayerStats());
  };

  const filteredGames = games.filter((g) => {
    const matchesCat =
      selectedCategory === 'all' ||
      g.category === selectedCategory ||
      (selectedCategory === 'community' && g.tags.includes('Community'));
    const matchesSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredGame = games.find((g) => g.id === '3d-cyber-runner') || games[0];

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Player Level & XP Progression Bar */}
      <div className="p-4 sm:p-5 rounded-3xl apple-card backdrop-blur-2xl flex flex-wrap items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center font-extrabold text-lg shadow-lg shadow-white/20">
            {playerStats.level}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">{playerStats.username}</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20 font-mono">
                Level {playerStats.level} Kiber-Usta
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-32 sm:w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (playerStats.xp / playerStats.nextLevelXp) * 100)}%`,
                  }}
                />
              </div>
              <span className="text-[10px] text-[#86868b] font-mono">
                {playerStats.xp} / {playerStats.nextLevelXp} XP
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
            <Coins className="w-4 h-4 text-white" />
            <span className="text-[#86868b]">Tangalar:</span>
            <span className="font-bold text-white font-mono">
              {playerStats.coins.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="apple-btn-primary"
          >
            <Upload className="w-4 h-4" />
            <span>+ O'yin Qo'shish</span>
          </button>
        </div>
      </div>

      {/* Hero Showcase Banner */}
      {featuredGame && (
        <div className="relative rounded-3xl overflow-hidden apple-card p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl backdrop-blur-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-white animate-pulse" />
              Haftaning Eng Mashhur O'yini
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {featuredGame.title}
            </h2>
            <p className="text-[#a1a1aa] text-sm md:text-base leading-relaxed">
              {featuredGame.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handlePlayGame(featuredGame)}
                className="apple-btn-primary py-3 px-8 text-sm"
              >
                <Play className="w-4 h-4 fill-black" />
                Hozir O'ynash (Play Now)
              </button>
              <div className="flex items-center gap-2 text-xs text-zinc-300 px-3 py-2 bg-white/[0.04] rounded-xl border border-white/10">
                <Users className="w-4 h-4 text-white" />
                <span>{featuredGame.playCount.toLocaleString()} marta o'ynaldi</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-white/[0.05] border border-white/15 flex items-center justify-center text-7xl md:text-8xl shadow-2xl shadow-white/5 animate-pulse" style={{ animationDuration: '3s' }}>
            {featuredGame.thumbnail}
          </div>
        </div>
      )}

      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {[
            { id: 'all', label: 'Barchasi' },
            { id: '3D', label: '3D WebGL' },
            { id: '2D', label: '2D Sarguzasht' },
            { id: 'action', label: 'Action / Otishma' },
            { id: 'ai', label: 'Gemini AI RPG' },
            { id: 'puzzle', label: 'Boshqotirma' },
            { id: 'community', label: 'Hamjamiyat (User Made)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as GameCategory)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition shrink-0 border ${
                selectedCategory === cat.id
                  ? 'bg-white text-black border-white shadow-md'
                  : 'bg-white/[0.04] border-white/10 text-[#86868b] hover:text-white hover:border-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#86868b] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="O'yin yoki muallifni qidirish..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-black/60 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition"
          />
        </div>
      </div>

      {/* Main Grid: Game Catalog (8 Cols) & Leaderboard/Quests (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Games Grid */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className="apple-card p-5 backdrop-blur-md transition-all duration-200 flex flex-col justify-between group hover:border-white/40"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl p-2.5 rounded-2xl bg-black/60 border border-white/10 block group-hover:scale-105 transition">
                      {game.thumbnail}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-white font-semibold bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                      <Star className="w-3.5 h-3.5 fill-white" />
                      <span>{game.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-white text-base group-hover:text-zinc-200 transition">
                    {game.title}
                  </h3>
                  <p className="text-xs text-[#86868b] mt-1 line-clamp-2 leading-relaxed">
                    {game.tagline}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    {game.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full bg-white/[0.06] text-[10px] text-zinc-300 font-medium border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-white/10 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-[#86868b] font-mono">
                    {game.playCount.toLocaleString()} o'ynaldi
                  </span>

                  <button
                    onClick={() => handlePlayGame(game)}
                    className="apple-btn-secondary text-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>O'ynash</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="py-16 text-center space-y-3 apple-card rounded-2xl">
              <Gamepad2 className="w-12 h-12 text-[#86868b] mx-auto" />
              <p className="text-sm text-[#86868b]">Hech qanday o'yin topilmadi.</p>
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="apple-btn-primary text-xs"
              >
                Birinchi bo'lib o'yin qo'shing!
              </button>
            </div>
          )}
        </div>

        {/* Sidebar: Quests & Leaderboard */}
        <div className="lg:col-span-4 space-y-6">
          {/* Daily Quests */}
          <div className="apple-card rounded-3xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-white" />
              Kunlik Vazifalar (Quests)
            </h3>
            <div className="space-y-3">
              {DAILY_QUESTS.map((q) => (
                <div key={q.id} className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-zinc-200">{q.title}</span>
                    <span className="text-[11px] font-bold text-white font-mono">+{q.rewardXp} XP</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-white transition-all duration-300"
                      style={{ width: `${Math.min(100, (q.progress / q.total) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#86868b] font-mono">
                    <span>{q.completed ? 'Bajarildi ✓' : 'Jarayonda'}</span>
                    <span>{q.progress}/{q.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hall of Fame / Leaderboard */}
          <div className="apple-card rounded-3xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-white" />
              O'yinchilar Reytingi (Leaderboard)
            </h3>
            <div className="space-y-2.5">
              {leaderboard.slice(0, 5).map((entry, idx) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        idx === 0
                          ? 'bg-white text-black'
                          : idx === 1
                          ? 'bg-zinc-300 text-black'
                          : idx === 2
                          ? 'bg-zinc-500 text-white'
                          : 'bg-white/10 text-zinc-400'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-base">{entry.avatar}</span>
                    <div>
                      <span className="font-bold text-white block">{entry.player}</span>
                      <span className="text-[10px] text-[#86868b]">{entry.gameTitle}</span>
                    </div>
                  </div>
                  <span className="font-bold text-white font-mono">
                    {entry.score.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeGame && (
        <GamePlayerModal
          game={activeGame}
          onClose={() => setActiveGame(null)}
          onLike={handleLikeGame}
        />
      )}

      {isSubmitModalOpen && (
        <GameSubmissionModal
          onClose={() => setIsSubmitModalOpen(false)}
          onGameAdded={handleGameAdded}
        />
      )}
    </div>
  );
};
