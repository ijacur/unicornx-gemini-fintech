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
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-indigo-500/30">
            {playerStats.level}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">{playerStats.username}</span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                Level {playerStats.level} Kiber-Usta
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-32 sm:w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (playerStats.xp / playerStats.nextLevelXp) * 100)}%`,
                  }}
                />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {playerStats.xp} / {playerStats.nextLevelXp} XP
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Tangalar:</span>
            <span className="font-extrabold text-amber-400 font-mono">
              {playerStats.coins.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-emerald-500/25 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>+ O'yin Qo'shish</span>
          </button>
        </div>
      </div>

      {/* Hero Showcase Banner */}
      {featuredGame && (
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-950 via-slate-950 to-indigo-950 border border-purple-500/30 shadow-2xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              Haftaning Eng Mashhur O'yini
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {featuredGame.title}
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {featuredGame.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => handlePlayGame(featuredGame)}
                className="py-3 px-8 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-extrabold text-sm transition shadow-lg shadow-purple-500/30 flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                Hozir O'ynash (Play Now)
              </button>
              <div className="flex items-center gap-2 text-xs text-slate-400 px-3 py-2 bg-slate-900/60 rounded-xl border border-slate-800">
                <Users className="w-4 h-4 text-purple-400" />
                <span>{featuredGame.playCount.toLocaleString()} marta o'ynaldi</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/40 flex items-center justify-center text-7xl md:text-8xl shadow-2xl shadow-purple-500/20 animate-pulse" style={{ animationDuration: '3s' }}>
            {featuredGame.thumbnail}
          </div>
        </div>
      )}

      {/* Category Pills & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
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
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition shrink-0 border ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="O'yin yoki muallifni qidirish..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
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
                className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 backdrop-blur-sm transition-all duration-200 flex flex-col justify-between group hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 block group-hover:scale-110 transition">
                      {game.thumbnail}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{game.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-white text-base group-hover:text-indigo-400 transition">
                    {game.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {game.tagline}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 mt-3">
                    {game.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-800/80 text-[10px] text-slate-400 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">
                    {game.playCount.toLocaleString()} o'ynaldi
                  </span>

                  <button
                    onClick={() => handlePlayGame(game)}
                    className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>O'ynash</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="py-16 text-center space-y-3 bg-slate-900/40 rounded-2xl border border-slate-800">
              <Gamepad2 className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-sm text-slate-400">Hech qanday o'yin topilmadi.</p>
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="py-2 px-4 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                Birinchi bo'lib o'yin qo'shing!
              </button>
            </div>
          )}
        </div>

        {/* Sidebar: Quests & Leaderboard */}
        <div className="lg:col-span-4 space-y-6">
          {/* Daily Quests */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Kunlik Vazifalar (Quests)
            </h3>
            <div className="space-y-3">
              {DAILY_QUESTS.map((q) => (
                <div key={q.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{q.title}</span>
                    <span className="text-[11px] font-bold text-amber-400">+{q.rewardXp} XP</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        q.completed ? 'bg-emerald-500' : 'bg-indigo-500'
                      }`}
                      style={{ width: `${Math.min(100, (q.progress / q.total) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>{q.completed ? 'Bajarildi ✅' : 'Jarayonda'}</span>
                    <span>{q.progress}/{q.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hall of Fame / Leaderboard */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400" />
              O'yinchilar Reytingi (Leaderboard)
            </h3>
            <div className="space-y-2.5">
              {leaderboard.slice(0, 5).map((entry, idx) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                        idx === 0
                          ? 'bg-amber-500 text-slate-950'
                          : idx === 1
                          ? 'bg-slate-300 text-slate-950'
                          : idx === 2
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-base">{entry.avatar}</span>
                    <div>
                      <span className="font-bold text-white block">{entry.player}</span>
                      <span className="text-[10px] text-slate-500">{entry.gameTitle}</span>
                    </div>
                  </div>
                  <span className="font-extrabold text-cyan-400 font-mono">
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
