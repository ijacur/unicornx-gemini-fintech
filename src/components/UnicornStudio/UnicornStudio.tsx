import React, { useState } from 'react';
import {
  Receipt,
  CreditCard,
  Gamepad2,
  Terminal,
  Key,
  CheckCircle,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { FinTechCopilot } from './FinTechCopilot';
import { CreditScorer } from './CreditScorer';
import { CyberBazaarGame } from './CyberBazaarGame';
import { PromptVault } from './PromptVault';
import { geminiService } from '../../services/geminiService';

export const UnicornStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'fintech' | 'credit' | 'game' | 'prompts' | 'settings'>('fintech');
  const [apiKeyInput, setApiKeyInput] = useState<string>(geminiService.getApiKey());
  const [keySaved, setKeySaved] = useState<boolean>(false);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    geminiService.setApiKey(apiKeyInput);
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top ICT Week Live Ticker */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div>
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              🇺🇿 ICT Week Uzbekistan 2026 • Tashkent CAEx Live
            </span>
            <span className="text-[11px] text-slate-400">
              Unicorn AI Benchmark: Uzum Bank & TBC Ecosystem Next-Gen Model
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>Gemini 2.0 & 1.5 Flash</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>{geminiService.hasApiKey() ? 'API: Jonli Rejim' : 'Demo Rejim: 100% Faol'}</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('fintech')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition shrink-0 ${
            activeTab === 'fintech'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Multimodal FinTech Copilot</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-950/20 font-extrabold">
            OCR
          </span>
        </button>

        <button
          onClick={() => setActiveTab('credit')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition shrink-0 ${
            activeTab === 'credit'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>AI Kredit & Nasiya Skoringi</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-900/60 font-extrabold">
            0-0-12
          </span>
        </button>

        <button
          onClick={() => setActiveTab('game')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition shrink-0 ${
            activeTab === 'game'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Cyber-Bazaar 2050 (RPG O'yin)</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-900/60 font-extrabold">
            AI NPC
          </span>
        </button>

        <button
          onClick={() => setActiveTab('prompts')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition shrink-0 ${
            activeTab === 'prompts'
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Master Prompt Vault</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-950/20 font-extrabold">
            Level-Up
          </span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs md:text-sm font-bold transition shrink-0 ${
            activeTab === 'settings'
              ? 'bg-slate-700 text-white'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Gemini API</span>
        </button>
      </div>

      {/* Main Tab Panels */}
      {activeTab === 'fintech' && <FinTechCopilot />}
      {activeTab === 'credit' && <CreditScorer />}
      {activeTab === 'game' && <CyberBazaarGame />}
      {activeTab === 'prompts' && <PromptVault />}

      {activeTab === 'settings' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-md max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Key className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="text-lg font-bold text-white">Google Gemini API Kalitini Sozlash</h3>
              <p className="text-xs text-slate-400">
                Google AI Studio kaliti ilovaga 100% jonli multimodal quvvat beradi.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveKey} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Gemini API Key (AI Studio)
              </label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
              />
              <span className="text-[11px] text-slate-500 block">
                Kalit faqat brauzeringizning <code>localStorage</code> xotirasida xavfsiz saqlanadi.
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium"
              >
                <span>Google AI Studio'dan bepul kalit olish</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition"
              >
                {keySaved ? 'Saqlandi! ✅' : 'Kalitni Saqlash'}
              </button>
            </div>
          </form>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 leading-relaxed space-y-2">
            <span className="font-bold text-white block">💡 Demo Day kafolati:</span>
            <p>
              Agar API kalitingiz bo'lmasa yoki internet tezligi past bo'lsa, xavotir olmang! Tizimda o'rnatilgan yuqori aniqlikdagi mahalliy emulyator mavjud bo'lib, ICT Week taqdimotida hech qanday kechikishsiz cheklarni skanerlaydi va o'yin dialoglarini namoyish etadi.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
