import React, { useState } from 'react';
import {
  Camera,
  Upload,
  Receipt,
  Sparkles,
  TrendingDown,
  Volume2,
  CheckCircle,
  ArrowRight,
  Send,
  Loader2
} from 'lucide-react';
import { geminiService, type ParsedReceipt } from '../../services/geminiService';

const SAMPLE_RECEIPTS = [
  {
    id: 'korzinka',
    title: 'Korzinka Supermarket',
    badge: 'Oziq-ovqat',
    date: '2026-09-23',
    total: '165,000 UZS',
    imagePlaceholder: '🛒 Korzinka Chilonzor Cheki #84920',
  },
  {
    id: 'uzum',
    title: 'Uzum Market Texnika',
    badge: 'Elektronika',
    date: '2026-09-22',
    total: '1,450,000 UZS',
    imagePlaceholder: '📱 Uzum Nasiya Shartnomasi #UZ-9921',
  },
  {
    id: 'click',
    title: 'Click P2P / Kafe Hisobi',
    badge: 'Ko\'ngilochar',
    date: '2026-09-21',
    total: '240,000 UZS',
    imagePlaceholder: '☕ Rayhon Milliy Taomlar Cheki',
  },
];

export const FinTechCopilot: React.FC = () => {
  const [selectedReceipt, setSelectedReceipt] = useState<string>('korzinka');
  const [loading, setLoading] = useState<boolean>(false);
  const [parsedData, setParsedData] = useState<ParsedReceipt | null>(null);
  const [advisorQuery, setAdvisorQuery] = useState<string>('');
  const [advisorResponse, setAdvisorResponse] = useState<string | null>(null);
  const [advisorLoading, setAdvisorLoading] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const handleScanSample = async (sampleId: string) => {
    setSelectedReceipt(sampleId);
    setLoading(true);
    try {
      // Mock base64 for sample
      const result = await geminiService.parseReceiptImage('sample_base64_data', 'image/jpeg', 'uz');
      setParsedData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
        const result = await geminiService.parseReceiptImage(base64, file.type, 'uz');
        setParsedData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'uz-UZ';
      utterance.rate = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleAskAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisorQuery.trim()) return;

    setAdvisorLoading(true);
    try {
      const answer = await geminiService.askFinAdvisor(advisorQuery, 'uz');
      setAdvisorResponse(answer);
    } catch (e) {
      console.error(e);
    } finally {
      setAdvisorLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 p-6 md:p-8 border border-emerald-500/20 shadow-2xl">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Gemini 2.0 Multimodal OCR Engine
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              O'zbekistondagi 1-Raqamli AI Moliyaviy Copilot
            </h2>
            <p className="text-slate-300 mt-2 max-w-2xl text-sm md:text-base">
              Har qanday qog'oz chek, Uzum Nasiya, Click yoki Payme to'lovlarini suratga oling. Gemini Vision ularni bir zumda to'liq tahlil qiladi, byudjetga taqsimlaydi va tejash yo'llarini ko'rsatadi.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm cursor-pointer shadow-lg shadow-emerald-500/25 transition">
              <Upload className="w-4 h-4" />
              <span>Chek Rasmini Yuklash</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>
            <button
              onClick={() => handleScanSample('korzinka')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-sm border border-white/10 transition"
            >
              <Receipt className="w-4 h-4 text-emerald-400" />
              Demo Chekni Ko'rish
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Sample Selectors & Scanner */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-4">
              <Receipt className="w-4 h-4 text-emerald-400" />
              Tayyor O'zbekiston Cheklari Namunasi
            </h3>
            <div className="space-y-3">
              {SAMPLE_RECEIPTS.map((s) => (
                <div
                  key={s.id}
                  onClick={() => handleScanSample(s.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    selectedReceipt === s.id
                      ? 'bg-emerald-500/10 border-emerald-500/40 shadow-inner'
                      : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">{s.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {s.badge}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-3">
                      <span>{s.date}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-medium">{s.total}</span>
                    </div>
                  </div>
                  <button className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                    Skanerlash
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Drag & Drop Visual Area */}
            <div className="mt-6 border-2 border-dashed border-slate-700/80 hover:border-emerald-500/50 rounded-xl p-6 text-center transition bg-slate-950/40">
              <Camera className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-80" />
              <p className="text-sm font-medium text-slate-200">Kamera yoki Fayldan Yuklang</p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG, HEIC yoki PDF kvitansiyalar</p>
            </div>
          </div>

          {/* AI Financial Advisor Quick Chat */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              FinGemini AI Maslahatchisi
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Uzum, TBC stavkalari, inflyatsiya va oylik byudjetingiz bo'yicha sun'iy intellektdan so'rang.
            </p>

            <form onSubmit={handleAskAdvisor} className="relative">
              <input
                type="text"
                value={advisorQuery}
                onChange={(e) => setAdvisorQuery(e.target.value)}
                placeholder="Masalan: 5 mln oylik bilan qanday tejayman?"
                className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
              <button
                type="submit"
                disabled={advisorLoading}
                className="absolute right-2 top-2 p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition disabled:opacity-50"
              >
                {advisorLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </form>

            {advisorResponse && (
              <div className="mt-4 p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed animate-fadeIn">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-indigo-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Xulosasi:
                  </span>
                  <button
                    onClick={() => handleSpeak(advisorResponse)}
                    className="p-1 rounded hover:bg-white/10 text-indigo-300"
                    title="Ovozda eshitish"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {advisorResponse}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: OCR Parsing Results */}
        <div className="lg:col-span-7">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-md relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white">Skanerlangan Chek Tahlili</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">
                    Zero-Hallucination OCR
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Gemini Vision 1.5 Flash orqali real vaqtda ajratilgan ma'lumotlar
                </p>
              </div>
              {parsedData && (
                <div className="text-right">
                  <div className="text-xs text-slate-400">Ishonch koeffitsienti</div>
                  <div className="text-emerald-400 font-bold text-sm">
                    {parsedData.confidenceScore}% Aniq
                  </div>
                </div>
              )}
            </div>

            {loading ? (
              <div className="py-20 text-center space-y-4">
                <Loader2 className="w-10 h-10 text-emerald-400 animate-spin mx-auto" />
                <p className="text-sm font-medium text-slate-300">
                  Gemini Vision chekni tahlil qilmoqda...
                </p>
                <p className="text-xs text-slate-500">
                  Valyuta, QQS (NDS) va toifalar o'zbek tiliga moslashtirilmoqda
                </p>
              </div>
            ) : parsedData ? (
              <div className="space-y-6">
                {/* Meta details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Do'kon / Filial</span>
                    <span className="font-semibold text-white text-sm truncate block mt-0.5">
                      {parsedData.merchant}
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Sana</span>
                    <span className="font-semibold text-white text-sm block mt-0.5">
                      {parsedData.date}
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Toifa</span>
                    <span className="font-semibold text-emerald-400 text-sm block mt-0.5">
                      {parsedData.category}
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-[11px] text-slate-400 block">Umumiy Summa</span>
                    <span className="font-bold text-white text-sm block mt-0.5">
                      {parsedData.totalAmount.toLocaleString()} {parsedData.currency}
                    </span>
                  </div>
                </div>

                {/* Items Table */}
                <div className="border border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950/80 text-xs text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="py-3 px-4">Mahsulot Nomi</th>
                        <th className="py-3 px-4 text-center">Soni</th>
                        <th className="py-3 px-4 text-right">Narxi</th>
                        <th className="py-3 px-4 text-right">Jami</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {parsedData.items.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/30 transition">
                          <td className="py-2.5 px-4 font-medium text-white">{item.name}</td>
                          <td className="py-2.5 px-4 text-center text-slate-400">{item.quantity}</td>
                          <td className="py-2.5 px-4 text-right text-slate-400">
                            {item.price.toLocaleString()} UZS
                          </td>
                          <td className="py-2.5 px-4 text-right font-semibold text-emerald-400">
                            {item.total.toLocaleString()} UZS
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* AI Insight Box with Uzbek Speech */}
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        Gemini Moliyaviy Insight
                      </span>
                      <button
                        onClick={() => handleSpeak(parsedData.aiInsight)}
                        className={`p-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition ${
                          isSpeaking
                            ? 'bg-emerald-500 text-slate-950 animate-pulse'
                            : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isSpeaking ? "O'qilmoqda..." : "Eshitish"}</span>
                      </button>
                    </div>
                    <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                      {parsedData.aiInsight}
                    </p>
                  </div>
                </div>

                {/* Instant Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs md:text-sm transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Uzum Nasiyaga Avto-Qo'shish (0% BNPL)
                  </button>
                  <button className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs md:text-sm transition border border-slate-700 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-emerald-400" />
                    Click / Payme Chekini Saqlash
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center space-y-4">
                <Receipt className="w-12 h-12 text-slate-700 mx-auto" />
                <p className="text-sm text-slate-400">
                  Tahlil qilish uchun chap paneldan biron chekni tanlang yoki o'z chekingizni yuklang.
                </p>
                <button
                  onClick={() => handleScanSample('korzinka')}
                  className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 font-semibold text-xs transition border border-emerald-500/30 inline-flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Korzinka Chekini Sinash
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
