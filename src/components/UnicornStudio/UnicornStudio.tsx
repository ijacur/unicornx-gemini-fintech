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
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl apple-card shadow-2xl backdrop-blur-2xl">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white shadow-[0_0_8px_#ffffff]"></span>
          </div>
          <div>
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              ICT Week Uzbekistan 2026 • Tashkent CAEx Live
            </span>
            <span className="text-[11px] text-[#86868b]">
              Unicorn AI Benchmark: Uzum Bank & TBC Ecosystem Next-Gen Model
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] text-zinc-300 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-white" />
            <span>Gemini 2.0 & 1.5 Flash</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-white/15 border border-white/30 text-[11px] text-white font-semibold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-white" />
            <span>{geminiService.hasApiKey() ? 'API: Jonli Rejim' : 'Demo Rejim: 100% Faol'}</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
        <button
          onClick={() => setActiveTab('fintech')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold transition shrink-0 ${
            activeTab === 'fintech'
              ? 'bg-white text-black shadow-lg shadow-white/20'
              : 'text-[#86868b] hover:text-white hover:bg-white/5 border border-white/10'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Multimodal FinTech Copilot</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${activeTab === 'fintech' ? 'bg-black/15 text-black' : 'bg-white/10 text-zinc-300'}`}>
            OCR
          </span>
        </button>

        <button
          onClick={() => setActiveTab('credit')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold transition shrink-0 ${
            activeTab === 'credit'
              ? 'bg-white text-black shadow-lg shadow-white/20'
              : 'text-[#86868b] hover:text-white hover:bg-white/5 border border-white/10'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>AI Kredit & Nasiya Skoringi</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${activeTab === 'credit' ? 'bg-black/15 text-black' : 'bg-white/10 text-zinc-300'}`}>
            0-0-12
          </span>
        </button>

        <button
          onClick={() => setActiveTab('game')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold transition shrink-0 ${
            activeTab === 'game'
              ? 'bg-white text-black shadow-lg shadow-white/20'
              : 'text-[#86868b] hover:text-white hover:bg-white/5 border border-white/10'
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Cyber-Bazaar 2050 (RPG O'yin)</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${activeTab === 'game' ? 'bg-black/15 text-black' : 'bg-white/10 text-zinc-300'}`}>
            AI NPC
          </span>
        </button>

        <button
          onClick={() => setActiveTab('prompts')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold transition shrink-0 ${
            activeTab === 'prompts'
              ? 'bg-white text-black shadow-lg shadow-white/20'
              : 'text-[#86868b] hover:text-white hover:bg-white/5 border border-white/10'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>Master Prompt Vault</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${activeTab === 'prompts' ? 'bg-black/15 text-black' : 'bg-white/10 text-zinc-300'}`}>
            Level-Up
          </span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold transition shrink-0 ${
            activeTab === 'settings'
              ? 'bg-white text-black shadow-lg shadow-white/20'
              : 'text-[#86868b] hover:text-white hover:bg-white/5 border border-white/10'
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
        <div className="apple-card rounded-3xl p-6 md:p-8 backdrop-blur-2xl max-w-2xl mx-auto space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Key className="w-6 h-6 text-white" />
            <div>
              <h3 className="text-lg font-bold text-white">Google Gemini API Kalitini Sozlash</h3>
              <p className="text-xs text-[#86868b]">
                Google AI Studio kaliti ilovaga 100% jonli multimodal quvvat beradi.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveKey} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-300 block">
                Gemini API Key (AI Studio)
              </label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-4 py-3 rounded-xl bg-black/70 border border-white/15 text-sm text-white focus:outline-none focus:border-white font-mono"
              />
              <span className="text-[11px] text-[#86868b] block">
                Kalit faqat brauzeringizning <code>localStorage</code> xotirasida xavfsiz saqlanadi.
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white hover:underline flex items-center gap-1 font-medium"
              >
                <span>Google AI Studio'dan bepul kalit olish</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="submit"
                className="apple-btn-primary"
              >
                {keySaved ? 'Saqlandi! ✓' : 'Kalitni Saqlash'}
              </button>
            </div>
          </form>

          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-zinc-300 leading-relaxed space-y-2">
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
