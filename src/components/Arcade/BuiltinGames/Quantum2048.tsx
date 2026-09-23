import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Trophy, Award } from 'lucide-react';
import { addLeaderboardScore, addPlayerXp } from '../../../lib/arcadeStorage';
import { triggerConfetti } from '../../../lib/utils';

type Board = number[][];

export const Quantum2048: React.FC = () => {
  const [board, setBoard] = useState<Board>(() => getInitialBoard());
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(() => {
    return Number(localStorage.getItem('quantum_2048_high') || 0);
  });
  const [won, setWon] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  function getInitialBoard(): Board {
    const b = Array.from({ length: 4 }, () => [0, 0, 0, 0]);
    addRandomTile(b);
    addRandomTile(b);
    return b;
  }

  function addRandomTile(b: Board) {
    const emptyCells: { r: number; c: number }[] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (b[r][c] === 0) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length === 0) return;
    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    b[r][c] = Math.random() < 0.9 ? 2 : 4;
  }

  const restart = () => {
    const newBoard = getInitialBoard();
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  const move = useCallback((direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    if (gameOver) return;

    let pointsGained = 0;
    const newBoard = board.map((row) => [...row]);
    let moved = false;

    const slide = (row: number[]): number[] => {
      let filtered = row.filter((x) => x !== 0);
      for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
          filtered[i] *= 2;
          pointsGained += filtered[i];
          if (filtered[i] === 2048 && !won) {
            setWon(true);
            triggerConfetti();
          }
          filtered.splice(i + 1, 1);
        }
      }
      while (filtered.length < 4) filtered.push(0);
      return filtered;
    };

    if (direction === 'LEFT') {
      for (let r = 0; r < 4; r++) {
        const original = [...newBoard[r]];
        newBoard[r] = slide(newBoard[r]);
        if (original.join(',') !== newBoard[r].join(',')) moved = true;
      }
    } else if (direction === 'RIGHT') {
      for (let r = 0; r < 4; r++) {
        const original = [...newBoard[r]];
        newBoard[r] = slide(newBoard[r].reverse()).reverse();
        if (original.join(',') !== newBoard[r].join(',')) moved = true;
      }
    } else if (direction === 'UP') {
      for (let c = 0; c < 4; c++) {
        const col = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]];
        const slided = slide(col);
        for (let r = 0; r < 4; r++) {
          if (newBoard[r][c] !== slided[r]) moved = true;
          newBoard[r][c] = slided[r];
        }
      }
    } else if (direction === 'DOWN') {
      for (let c = 0; c < 4; c++) {
        const col = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]].reverse();
        const slided = slide(col).reverse();
        for (let r = 0; r < 4; r++) {
          if (newBoard[r][c] !== slided[r]) moved = true;
          newBoard[r][c] = slided[r];
        }
      }
    }

    if (moved) {
      addRandomTile(newBoard);
      setBoard(newBoard);
      const newScore = score + pointsGained;
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem('quantum_2048_high', String(newScore));
      }

      // Check if Game Over
      let hasMoves = false;
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (newBoard[r][c] === 0) hasMoves = true;
          if (r < 3 && newBoard[r][c] === newBoard[r + 1][c]) hasMoves = true;
          if (c < 3 && newBoard[r][c] === newBoard[r][c + 1]) hasMoves = true;
        }
      }
      if (!hasMoves) {
        setGameOver(true);
        addPlayerXp(120);
        addLeaderboardScore({
          player: 'Kiber-O\'yinchi',
          gameId: 'quantum-2048',
          gameTitle: 'Quantum 2048',
          score: newScore,
          avatar: '⚛️',
        });
      }
    }
  }, [board, gameOver, score, bestScore, won]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'w'].includes(e.key)) {
        e.preventDefault();
        move('UP');
      } else if (['ArrowDown', 's'].includes(e.key)) {
        e.preventDefault();
        move('DOWN');
      } else if (['ArrowLeft', 'a'].includes(e.key)) {
        e.preventDefault();
        move('LEFT');
      } else if (['ArrowRight', 'd'].includes(e.key)) {
        e.preventDefault();
        move('RIGHT');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  const getTileColor = (val: number) => {
    switch (val) {
      case 2: return 'bg-cyan-950/80 text-cyan-300 border-cyan-700/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]';
      case 4: return 'bg-teal-950/80 text-teal-300 border-teal-700/50 shadow-[0_0_12px_rgba(20,184,166,0.25)]';
      case 8: return 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50 shadow-[0_0_14px_rgba(16,185,129,0.3)]';
      case 16: return 'bg-indigo-950/80 text-indigo-300 border-indigo-600/50 shadow-[0_0_16px_rgba(99,102,241,0.35)]';
      case 32: return 'bg-purple-950/80 text-purple-300 border-purple-600/50 shadow-[0_0_18px_rgba(168,85,247,0.4)]';
      case 64: return 'bg-pink-950/80 text-pink-300 border-pink-600/50 shadow-[0_0_20px_rgba(236,72,153,0.45)]';
      case 128: return 'bg-rose-950/90 text-rose-200 border-rose-500 shadow-[0_0_22px_rgba(244,63,94,0.5)] font-bold';
      case 256: return 'bg-amber-950/90 text-amber-200 border-amber-500 shadow-[0_0_24px_rgba(245,158,11,0.55)] font-bold';
      case 512: return 'bg-orange-950 text-orange-200 border-orange-500 shadow-[0_0_26px_rgba(249,115,22,0.6)] font-bold';
      case 1024: return 'bg-yellow-950 text-yellow-200 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.7)] font-black text-lg';
      case 2048: return 'bg-gradient-to-br from-yellow-500 to-amber-600 text-slate-950 border-white shadow-[0_0_35px_rgba(251,191,36,0.9)] font-black text-xl animate-pulse';
      default: return 'bg-slate-900/60 text-slate-600 border-slate-800';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl max-w-md mx-auto">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-extrabold text-white tracking-wide flex items-center gap-1.5">
            Quantum <span className="text-cyan-400 font-mono">2048</span>
          </h3>
          <span className="text-[11px] text-slate-400">Tugmalar: Strelkalar yoki W/A/S/D</span>
        </div>

        <div className="flex gap-2">
          <div className="px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block font-bold">Ball</span>
            <span className="font-extrabold text-cyan-400 font-mono text-sm">{score}</span>
          </div>
          <div className="px-3 py-1.5 bg-slate-900 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 block font-bold">Rekord</span>
            <span className="font-extrabold text-amber-400 font-mono text-sm">{bestScore}</span>
          </div>
        </div>
      </div>

      {/* Grid Board */}
      <div className="relative p-3 bg-slate-900/90 rounded-2xl border border-slate-800 grid grid-cols-4 gap-2.5 w-full aspect-square">
        {board.map((row, r) =>
          row.map((val, c) => (
            <div
              key={`${r}-${c}`}
              className={`rounded-xl border flex items-center justify-center font-mono font-bold text-base transition-all duration-100 ${getTileColor(
                val
              )}`}
            >
              {val !== 0 ? val : ''}
            </div>
          ))
        )}

        {/* Win / Loss Overlay */}
        {(gameOver || won) && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            {won ? (
              <>
                <Award className="w-12 h-12 text-yellow-400 mb-2 animate-bounce" />
                <h4 className="text-2xl font-black text-white">Siz 2048 ga Yetdingiz!</h4>
                <p className="text-xs text-slate-300 mt-1">Kvant sintezi to'liq yakunlandi.</p>
              </>
            ) : (
              <>
                <Trophy className="w-10 h-10 text-rose-500 mb-2" />
                <h4 className="text-2xl font-black text-rose-400">Yurishlar Qolmadi!</h4>
                <p className="text-xs text-slate-300 mt-1">
                  Yakuniy ball: <strong className="text-cyan-400">{score}</strong>
                </p>
              </>
            )}

            <button
              onClick={restart}
              className="mt-5 py-2.5 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-cyan-500/25 flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              Qayta Boshlash
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="w-full flex items-center justify-between mt-4">
        <button
          onClick={restart}
          className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Yangi O'yin
        </button>
        <span className="text-[11px] text-slate-500">Kombinatsiyalar xaritasini kengaytiring</span>
      </div>
    </div>
  );
};
