import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, Trophy, Heart } from 'lucide-react';
import { addLeaderboardScore, addPlayerXp } from '../../../lib/arcadeStorage';
import { triggerConfetti } from '../../../lib/utils';

export const NeonShooter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'GAMEOVER'>('IDLE');
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [highScore, setHighScore] = useState<number>(() => {
    return Number(localStorage.getItem('neon_shooter_high') || 0);
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const stateRef = useRef({
    gameState: 'IDLE',
    score: 0,
    lives: 3,
    soundEnabled: true,
  });

  useEffect(() => {
    stateRef.current.gameState = gameState;
    stateRef.current.score = score;
    stateRef.current.lives = lives;
    stateRef.current.soundEnabled = soundEnabled;
  }, [gameState, score, lives, soundEnabled]);

  const playLaserSound = () => {
    if (!stateRef.current.soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch {
      // AudioContext muted/unsupported
    }
  };

  const playExplosionSound = () => {
    if (!stateRef.current.soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch {
      // AudioContext muted
    }
  };

  const startGame = () => {
    setScore(0);
    setLives(3);
    setGameState('PLAYING');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = 640;
    const height = 480;
    canvas.width = width;
    canvas.height = height;

    // Game objects
    const player = { x: width / 2, y: height - 60, size: 24, speed: 6 };
    let bullets: { x: number; y: number; speed: number }[] = [];
    let enemies: { x: number; y: number; size: number; speed: number; hp: number; color: string }[] = [];
    let particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];
    const stars: { x: number; y: number; speed: number; size: number }[] = [];

    // Init stars
    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: 0.5 + Math.random() * 2,
        size: Math.random() * 2,
      });
    }

    const keys: Record<string, boolean> = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
      if (e.key === ' ' && stateRef.current.gameState === 'PLAYING') {
        e.preventDefault();
        bullets.push({ x: player.x, y: player.y - 12, speed: 9 });
        playLaserSound();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Mouse/Touch controls
    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      player.x = (e.clientX - rect.left) * scaleX;
      player.x = Math.max(player.size, Math.min(width - player.size, player.x));
    };

    const handlePointerDown = () => {
      if (stateRef.current.gameState === 'PLAYING') {
        bullets.push({ x: player.x, y: player.y - 12, speed: 9 });
        playLaserSound();
      }
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('mousedown', handlePointerDown);

    let enemySpawnCounter = 0;

    const gameLoop = () => {
      // Clear screen
      ctx.fillStyle = '#050711';
      ctx.fillRect(0, 0, width, height);

      // Render starfield
      ctx.fillStyle = '#64748B';
      for (const s of stars) {
        s.y += s.speed;
        if (s.y > height) {
          s.y = 0;
          s.x = Math.random() * width;
        }
        ctx.fillRect(s.x, s.y, s.size, s.size);
      }

      if (stateRef.current.gameState === 'PLAYING') {
        // Handle input
        if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
        if (keys['ArrowRight'] || keys['d']) player.x += player.speed;
        player.x = Math.max(player.size, Math.min(width - player.size, player.x));

        // Spawn enemies
        enemySpawnCounter++;
        if (enemySpawnCounter % 40 === 0) {
          const colors = ['#F43F5E', '#A855F7', '#38BDF8', '#F59E0B'];
          enemies.push({
            x: 30 + Math.random() * (width - 60),
            y: -20,
            size: 16 + Math.random() * 8,
            speed: 2 + Math.random() * 2.5,
            hp: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }

        // Update bullets
        for (let i = bullets.length - 1; i >= 0; i--) {
          const b = bullets[i];
          b.y -= b.speed;
          if (b.y < -10) {
            bullets.splice(i, 1);
            continue;
          }

          // Bullet draw
          ctx.shadowColor = '#00F0FF';
          ctx.shadowBlur = 10;
          ctx.fillStyle = '#38BDF8';
          ctx.fillRect(b.x - 2, b.y - 6, 4, 12);
          ctx.shadowBlur = 0;

          // Collision with enemies
          for (let j = enemies.length - 1; j >= 0; j--) {
            const e = enemies[j];
            const dist = Math.hypot(b.x - e.x, b.y - e.y);
            if (dist < e.size + 4) {
              // Enemy hit
              bullets.splice(i, 1);
              enemies.splice(j, 1);
              playExplosionSound();

              // Spawn explosion particles
              for (let p = 0; p < 12; p++) {
                particles.push({
                  x: e.x,
                  y: e.y,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6,
                  life: 20,
                  color: e.color,
                });
              }

              setScore((prev) => {
                const newScore = prev + 100;
                if (newScore > highScore) {
                  setHighScore(newScore);
                  localStorage.setItem('neon_shooter_high', String(newScore));
                }
                return newScore;
              });
              break;
            }
          }
        }

        // Update enemies
        for (let i = enemies.length - 1; i >= 0; i--) {
          const e = enemies[i];
          e.y += e.speed;

          // Draw enemy
          ctx.shadowColor = e.color;
          ctx.shadowBlur = 12;
          ctx.fillStyle = e.color;
          ctx.beginPath();
          ctx.moveTo(e.x, e.y + e.size);
          ctx.lineTo(e.x - e.size, e.y - e.size);
          ctx.lineTo(e.x + e.size, e.y - e.size);
          ctx.closePath();
          ctx.fill();
          ctx.shadowBlur = 0;

          // Collision with player
          const distToPlayer = Math.hypot(e.x - player.x, e.y - player.y);
          if (distToPlayer < e.size + player.size) {
            enemies.splice(i, 1);
            playExplosionSound();

            setLives((prev) => {
              const newLives = prev - 1;
              if (newLives <= 0) {
                setGameState('GAMEOVER');
                addPlayerXp(150);
                addLeaderboardScore({
                  player: 'Kiber-O\'yinchi',
                  gameId: 'neon-starfighter',
                  gameTitle: 'Neon Starfighter',
                  score: stateRef.current.score,
                  avatar: '🛸',
                });
              }
              return newLives;
            });
            continue;
          }

          if (e.y > height + 20) {
            enemies.splice(i, 1);
          }
        }

        // Draw Player Ship
        ctx.shadowColor = '#10B981';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#10B981';
        ctx.beginPath();
        ctx.moveTo(player.x, player.y - player.size);
        ctx.lineTo(player.x - player.size, player.y + player.size);
        ctx.lineTo(player.x + player.size, player.y + player.size);
        ctx.closePath();
        ctx.fill();

        // Ship Core
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(player.x, player.y + 4, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Update & Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 3, 3);
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('mousedown', handlePointerDown);
    };
  }, [highScore]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl relative">
      {/* Top HUD */}
      <div className="w-full max-w-[640px] flex items-center justify-between px-4 py-2 bg-slate-900/90 rounded-xl border border-slate-800 mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-slate-400">Ball:</span>
          <span className="font-extrabold text-amber-400 text-sm font-mono">{score}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Jon:</span>
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 ${
                  i < lives ? 'text-rose-500 fill-rose-500' : 'text-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Rekord: <strong className="text-cyan-400">{highScore}</strong>
          </span>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative rounded-xl overflow-hidden border border-slate-700 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
        <canvas ref={canvasRef} className="cursor-crosshair block w-full max-w-[640px] h-auto" />

        {/* Overlay for IDLE / GAMEOVER */}
        {gameState !== 'PLAYING' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            {gameState === 'IDLE' ? (
              <>
                <div className="text-4xl mb-2">🛸</div>
                <h3 className="text-2xl font-black text-white tracking-wide">
                  Neon Starfighter: Bullet Blitz
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                  Kursor yoki A/D tugmalari orqali boshqaring. Bo'shliq (Space) yoki sichqoncha bilan lazer oting!
                </p>
                <button
                  onClick={startGame}
                  className="mt-6 py-3 px-8 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-extrabold text-sm transition shadow-lg shadow-emerald-500/30 flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  Jangga Kirish (Play)
                </button>
              </>
            ) : (
              <>
                <div className="text-4xl mb-2">💥</div>
                <h3 className="text-2xl font-black text-rose-400 tracking-wide">
                  Kemangiz Portlatildi!
                </h3>
                <p className="text-sm font-bold text-white mt-1">
                  Yakuniy Bal: <span className="text-amber-400 font-mono text-lg">{score}</span>
                </p>
                <button
                  onClick={() => {
                    triggerConfetti();
                    startGame();
                  }}
                  className="mt-5 py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition shadow-lg shadow-indigo-500/30 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Qayta O'ynash
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
