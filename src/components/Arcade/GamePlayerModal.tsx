import React, { useState } from 'react';
import { X, Maximize2, Minimize2, Heart, Share2, Star, User, Tag } from 'lucide-react';
import type { ArcadeGame } from '../../types/arcade';
import { NeonShooter } from './BuiltinGames/NeonShooter';
import { Quantum2048 } from './BuiltinGames/Quantum2048';
import { CyberBazaarGame } from '../UnicornStudio/CyberBazaarGame';
import { MulkXHub } from '../RealEstateEdu/MulkXHub';
import { triggerConfetti } from '../../lib/utils';

interface GamePlayerModalProps {
  game: ArcadeGame;
  onClose: () => void;
  onLike: (gameId: string) => void;
}

export const GamePlayerModal: React.FC<GamePlayerModalProps> = ({ game, onClose, onLike }) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(game.likes);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
      onLike(game.id);
      triggerConfetti();
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '#game-' + game.id);
    alert("O'yin havolasi nusxalandi!");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      <div
        className={`bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${
          isFullscreen ? 'w-full h-full max-w-none rounded-none' : 'w-full max-w-5xl h-[90vh]'
        }`}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{game.thumbnail}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-base md:text-lg">{game.title}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 uppercase">
                  {game.category}
                </span>
              </div>
              <span className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <User className="w-3 h-3 text-slate-500" />
                Muallif: <strong className="text-slate-300">{game.author}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                liked
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-rose-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{likesCount}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Ulashish"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title={isFullscreen ? 'Kichraytirish' : 'To\'liq ekran'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition ml-2"
              title="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Viewport Area */}
        <div className="flex-1 bg-black overflow-hidden flex items-center justify-center relative">
          {game.componentKey === 'neon-shooter' ? (
            <div className="w-full h-full flex items-center justify-center p-4 overflow-y-auto">
              <NeonShooter />
            </div>
          ) : game.componentKey === 'quantum-2048' ? (
            <div className="w-full h-full flex items-center justify-center p-4 overflow-y-auto">
              <Quantum2048 />
            </div>
          ) : game.componentKey === 'cyber-bazaar' ? (
            <div className="w-full h-full p-6 overflow-y-auto">
              <CyberBazaarGame />
            </div>
          ) : game.componentKey === 'mulk-detective' ? (
            <div className="w-full h-full p-4 sm:p-6 overflow-y-auto">
              <MulkXHub />
            </div>
          ) : game.type === 'iframe' && game.url ? (
            <iframe
              src={game.url}
              title={game.title}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; gamepad; focus-without-user-activation *"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          ) : game.customCode ? (
            <iframe
              srcDoc={game.customCode}
              title={game.title}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; gamepad"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : (
            <div className="text-center p-8 text-slate-400">
              <p>O'yin resursi topilmadi.</p>
            </div>
          )}
        </div>

        {/* Footer Info (if not fullscreen) */}
        {!isFullscreen && (
          <div className="px-6 py-3.5 bg-slate-950/80 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{game.tagline}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {game.rating}
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {game.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-300 font-medium flex items-center gap-1"
                >
                  <Tag className="w-2.5 h-2.5 text-slate-500" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
