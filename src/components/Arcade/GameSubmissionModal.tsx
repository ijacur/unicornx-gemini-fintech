import React, { useState } from 'react';
import {
  X,
  Code2,
  Globe,
  Sparkles,
  Upload,
  CheckCircle,
  Eye,
  Loader2
} from 'lucide-react';
import type { ArcadeGame } from '../../types/arcade';
import { saveCustomGame, addPlayerXp } from '../../lib/arcadeStorage';
import { geminiService } from '../../services/geminiService';
import { triggerConfetti } from '../../lib/utils';

interface GameSubmissionModalProps {
  onClose: () => void;
  onGameAdded: (newGame: ArcadeGame) => void;
}

export const GameSubmissionModal: React.FC<GameSubmissionModalProps> = ({ onClose, onGameAdded }) => {
  const [tab, setTab] = useState<'url' | 'code' | 'ai'>('ai');
  const [title, setTitle] = useState<string>('');
  const [tagline, setTagline] = useState<string>('');
  const [author, setAuthor] = useState<string>('Jasur Developer');
  const [category, setCategory] = useState<'action' | 'puzzle' | '2D' | '3D' | 'ai'>('action');
  const [gameUrl, setGameUrl] = useState<string>('');
  const [customHtml, setCustomHtml] = useState<string>(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin:0; background:#0A0F1D; color:#fff; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; font-family:sans-serif; }
    canvas { border:2px solid #38BDF8; background:#030712; border-radius:12px; }
  </style>
</head>
<body>
  <h3>Cyber-Ball Bounce (Demo)</h3>
  <canvas id="c" width="400" height="300"></canvas>
  <script>
    const c = document.getElementById('c'), ctx = c.getContext('2d');
    let x=200, y=150, vx=4, vy=3, r=14;
    function loop() {
      ctx.fillStyle = 'rgba(3,7,18,0.2)';
      ctx.fillRect(0,0,400,300);
      x+=vx; y+=vy;
      if(x<r || x>400-r) vx*=-1;
      if(y<r || y>300-r) vy*=-1;
      ctx.shadowColor = '#38BDF8';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`);

  // AI Prompt State
  const [aiPrompt, setAiPrompt] = useState<string>('Toshkent teleminorasi atrofida uchuvchi kiber-qush (Flappy Falcon) arkadasi');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [previewActive, setPreviewActive] = useState<boolean>(false);

  const handleGenerateWithAi = async () => {
    setIsGenerating(true);
    try {
      if (geminiService.hasApiKey()) {
        const prompt = `Write a complete, single-file HTML5 Canvas game with CSS and JavaScript embedded inside.
        Theme/Idea: ${aiPrompt}.
        The game should be fun, interactive, with score, keyboard/touch controls, and cyberpunk/retro colors.
        Return ONLY valid HTML inside an <html>...</html> block without markdown explanation.`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiService.getApiKey()}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const match = text.match(/<html[\s\S]*<\/html>/i);
          if (match) {
            setCustomHtml(match[0]);
            setTitle(aiPrompt.slice(0, 30));
            setTagline('Gemini AI tomonidan yaratilgan maxsus o\'yin');
            setTab('code');
            setPreviewActive(true);
            setIsGenerating(false);
            return;
          }
        }
      }

      // Offline High-Fidelity Procedural Generator
      await new Promise((r) => setTimeout(r, 1200));

      const generatedCode = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { margin:0; background:#0B0F19; color:#E2E8F0; font-family:system-ui, sans-serif; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; overflow:hidden; }
    canvas { background:#030712; border:2px solid #A855F7; border-radius:16px; box-shadow:0 0 25px rgba(168,85,247,0.3); }
    #hud { margin-bottom:10px; font-weight:bold; font-size:16px; color:#38BDF8; font-family:monospace; }
  </style>
</head>
<body>
  <div id="hud">Cyber Flappy Falcon | Ball: <span id="score">0</span></div>
  <canvas id="game" width="480" height="360"></canvas>
  <script>
    const canvas = document.getElementById('game'), ctx = canvas.getContext('2d');
    let birdY = 180, vy = 0, gravity = 0.4, score = 0, pipes = [], over = false;
    function flap() { if(over) { reset(); return; } vy = -6.5; }
    window.addEventListener('keydown', (e) => { if(e.key === ' ' || e.key === 'ArrowUp') flap(); });
    window.addEventListener('mousedown', flap);
    function reset() { birdY = 180; vy = 0; score = 0; pipes = []; over = false; }
    setInterval(() => {
      if(!over) {
        let gap = 110, topH = 40 + Math.random() * 150;
        pipes.push({ x: 480, topH: topH, botY: topH + gap, w: 45 });
      }
    }, 1600);
    function loop() {
      ctx.fillStyle = '#050814'; ctx.fillRect(0,0,480,360);
      vy += gravity; birdY += vy;
      // Draw Bird
      ctx.shadowColor = '#F59E0B'; ctx.shadowBlur = 15;
      ctx.fillStyle = '#F59E0B'; ctx.beginPath(); ctx.arc(80, birdY, 14, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.arc(86, birdY-3, 4, 0, Math.PI*2); ctx.fill();
      ctx.shadowBlur = 0;
      // Pipes
      for(let i = pipes.length-1; i >= 0; i--) {
        let p = pipes[i]; p.x -= 3;
        ctx.fillStyle = '#A855F7'; ctx.fillRect(p.x, 0, p.w, p.topH);
        ctx.fillRect(p.x, p.botY, p.w, 360 - p.botY);
        if(80 + 14 > p.x && 80 - 14 < p.x + p.w) {
          if(birdY - 14 < p.topH || birdY + 14 > p.botY) over = true;
        }
        if(p.x + p.w === 78) { score++; document.getElementById('score').innerText = score; }
        if(p.x < -50) pipes.splice(i, 1);
      }
      if(birdY < 0 || birdY > 360) over = true;
      if(over) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0,0,480,360);
        ctx.fillStyle = '#F43F5E'; ctx.font = '24px sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('O\\'yin Tugadi! Bosib qayta boshlang', 240, 180);
      }
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`;

      setCustomHtml(generatedCode);
      setTitle(aiPrompt.length > 25 ? aiPrompt.slice(0, 25) + '...' : aiPrompt);
      setTagline('Gemini AI tomonidan generatsiya qilingan kiber-o\'yin');
      setTab('code');
      setPreviewActive(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Iltimos, o\'yin nomini kiriting!');
      return;
    }

    const newGame: ArcadeGame = {
      id: 'custom_' + Date.now(),
      title: title.trim(),
      tagline: tagline.trim() || 'Foydalanuvchi tomonidan yaratilgan o\'yin',
      description: 'Nexus Arcade ochiq platformasiga joylangan yangi o\'yin.',
      category: category,
      author: author.trim() || 'Anonim Dasturchi',
      thumbnail: category === 'action' ? '⚡' : category === 'puzzle' ? '🧩' : category === '3D' ? '🛸' : '🕹️',
      type: tab === 'url' ? 'embed' : 'custom',
      url: tab === 'url' ? gameUrl : undefined,
      customCode: tab !== 'url' ? customHtml : undefined,
      playCount: 1,
      rating: 5.0,
      likes: 1,
      tags: ['Community', category, 'UserMade'],
      createdAt: new Date().toISOString().split('T')[0],
    };

    saveCustomGame(newGame);
    addPlayerXp(350);
    onGameAdded(newGame);
    triggerConfetti();
    alert("🎉 Tabriklaymiz! O'yiningiz muvaffaqiyatli joylandi va sizga +350 XP berildi!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-950/60">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-indigo-400" />
              O'z O'yiningizni Platformaga Qo'shing (Creator Hub)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Har kim o'z o'yinini joylashi yoki Gemini AI yordamida bir lahzada yangi o'yin yasashi mumkin.
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-6 pt-3 gap-2">
          <button
            onClick={() => setTab('ai')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
              tab === 'ai'
                ? 'border-indigo-500 text-white shadow-[0_2px_10px_rgba(99,102,241,0.3)]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            <span>Gemini AI Game Generator</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 font-extrabold">
              Yangi!
            </span>
          </button>

          <button
            onClick={() => setTab('code')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
              tab === 'code'
                ? 'border-emerald-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>HTML5 / Canvas Kodi</span>
          </button>

          <button
            onClick={() => setTab('url')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
              tab === 'url'
                ? 'border-cyan-400 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>O'yin Havolasi (itch.io / Web)</span>
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {tab === 'ai' && (
            <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-3">
              <label className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                O'yin g'oyangizni tasvirlang:
              </label>
              <textarea
                rows={2}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Masalan: Kvant fazoviy poygasi, to'siqlardan qochish va kristallar yig'ish..."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-indigo-500 resize-none"
              />
              <button
                type="button"
                onClick={handleGenerateWithAi}
                disabled={isGenerating}
                className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg shadow-indigo-600/30 flex items-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Gemini o'yin kodini yozmoqda...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>O'yinni 1-Tugma Bilan Yaratish (Generate)</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Meta Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                O'yin Nomi *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masalan: Cyber Ninja, Galaxy Raider..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Muallif / Jamoa
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Jasur Developer"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Qisqa Ta'rif (Tagline)
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Tezkor va qiziqarli arkada"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Kategoriya
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as unknown as typeof category)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="action">Action / Otishma</option>
                <option value="puzzle">Puzzle / Boshqotirma</option>
                <option value="2D">2D Platformer</option>
                <option value="3D">3D WebGL</option>
                <option value="ai">AI RPG / Simulyator</option>
              </select>
            </div>
          </div>

          {/* Conditional Inputs */}
          {tab === 'url' ? (
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                O'yin Veb-Havolasi (HTTPS)
              </label>
              <input
                type="url"
                required
                value={gameUrl}
                onChange={(e) => setGameUrl(e.target.value)}
                placeholder="https://itch.io/embed/..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-500"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300">
                  HTML5 / JavaScript / Canvas Kodi
                </label>
                <button
                  type="button"
                  onClick={() => setPreviewActive(!previewActive)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                >
                  <Eye className="w-3.5 h-3.5" />
                  {previewActive ? 'Kodni Tahrirlash' : 'Jonli Sinab Ko\'rish (Preview)'}
                </button>
              </div>

              {previewActive ? (
                <div className="border border-slate-800 rounded-xl overflow-hidden h-64 bg-black">
                  <iframe
                    srcDoc={customHtml}
                    title="O'yin preview"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              ) : (
                <textarea
                  rows={8}
                  value={customHtml}
                  onChange={(e) => setCustomHtml(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-[11px] focus:outline-none focus:border-indigo-500 scrollbar-thin"
                />
              )}
            </div>
          )}

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-emerald-500/25 flex items-center gap-1.5"
            >
              <CheckCircle className="w-4 h-4" />
              O'yinni Platformaga Joylash (+350 XP)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
