import React, { useState } from 'react';
import {
  Copy,
  Check,
  Sparkles,
  Search,
  Terminal
} from 'lucide-react';
import { triggerConfetti } from '../../lib/utils';

interface PromptCard {
  id: string;
  title: string;
  category: 'Startup' | 'FinTech' | 'Gaming' | 'Vibe Coding';
  description: string;
  formula: string;
  promptText: string;
}

const PROMPT_DATABASE: PromptCard[] = [
  {
    id: 'unicorn-architect',
    title: 'Unicorn Startup Architect & YC/ICT Pitch Deck',
    category: 'Startup',
    description: 'Har qanday xom g\'oyani 5 bosqichli venchur arxitekturasiga va 3 daqiqalik yutuvchi pitchga aylantirish.',
    formula: 'School 21 + Y Combinator Standarti',
    promptText: `[KIM SIZ]: Siz Silicon Valley (Y Combinator) va O'zbekiston ekotizimini (IT Park, Uzum, TBC) chuqur biladigan Unicorn Startup Architect va Senior Tech Lead'siz.

[NIMA KERAK]: Berilgan startap g'oyasini to'liq dekompozitsiya qilib, 5 bosqichli Unicorn Blueprint'ni tayyorlang:
1. Problem & Unfair Advantage (Uzum va TBC qila olmayotgan, faqat Gemini AI qila oladigan jihat).
2. Market Size (TAM, SAM, SOM Markaziy Osiyo va global miqyosda).
3. System Architecture (Next.js/React + FastAPI/Node + Gemini 2.0 Flash SDK + Redis/PostgreSQL).
4. Virality & Retention Loop (Telegram Mini App referral mexanikasi).
5. 3 daqiqalik Demo Day Pitch ssenariysi (ICT Week hakamlari va xorijiy investorlar uchun).

[KIM UCHUN]: ICT Week Uzbekistan hakamlar hay'ati, venchur investorlar (Aloqa Ventures, IT Park) va texnik jamoa uchun.

[FORMAT]: 
- Hech qanday umumiy gaplarsiz, aniq texnik atamalar va formulalar bilan.
- Arxitektura uchun to'liq Mermaid diagrammasi.
- G'oya: {{USER_IDEA}}`,
  },
  {
    id: 'fintech-ocr',
    title: 'Zero-Hallucination FinTech OCR & Chek Parsiri',
    category: 'FinTech',
    description: 'Chek fotosuratlari, bank kvitansiyalari va Uzum Nasiya shartnomalaridan 100% aniqlikda JSON ajratish.',
    formula: 'Structured Output + JSON Enforcing',
    promptText: `[KIM SIZ]: Siz Markaziy Osiyo moliya tizimi (UZS, Click, Payme, Uzum Bank cheklari, bank ko'chirmalari) bo'yicha dunyodagi eng tajribali Financial Data Extraction AI'siz.

[NIMA KERAK]: Berilgan chek fotosurati yoki matnli/ovozli kiritmadan barcha moliyaviy ma'lumotlarni o'ta aniq ajratib oling (Zero Hallucination).

[QOIDALAR]:
1. Valyutani har doim so'm (UZS) yoki ko'rsatilgan birlikda aniqlang.
2. Har bir mahsulot nomi, miqdori, donasi narxi va umumiy summasini ajrating.
3. Toifani belgilang: ["Oziq-ovqat", "Elektronika", "Transport", "Kommunal", "Ko'ngilochar", "Kredit/Nasiya", "Biznes"].
4. Moliyaviy maslahat: O'zbekiston bozoridagi o'rtacha narxlar asosida xulosa bering.

[FORMAT]:
Javob faqat va faqat quyidagi toza JSON formatida bo'lsin (hech qanday markdown kod bloklarisiz):
{
  "merchant": "string",
  "date": "YYYY-MM-DD",
  "items": [{"name": "string", "quantity": 1, "price": 0, "total": 0}],
  "totalAmount": 0,
  "category": "string",
  "currency": "UZS",
  "aiInsight": "string",
  "confidenceScore": 99.2
}`,
  },
  {
    id: 'procedural-npc',
    title: 'Procedural NPC & Kiber-Bozor Game Master',
    category: 'Gaming',
    description: 'Har bir personajning o\'z xarakteri, o\'tmishi va his-tuyg\'ulari bilan tirik muzokara qiluvchi o\'yin dvigateli.',
    formula: 'State-Machine Prompting',
    promptText: `[KIM SIZ]: Siz o'yinchining har bir xatti-harakatiga real vaqtda moslashuvchi AI Game Master va NPC simulyatorisiz.

[DUNYO KONTEKSTI]: 2050-yil Toshkent kiber-bozori. O'yinchi savdo karvonini boshqaradi, AI esa turli xarakterdagi personajlarni (Chorsu Kiber-Savdogari, Kiber-Bojxonachi, Kripto-Broker) jonlantiradi.

[VAZIFA]: O'yinchining oxirgi harakatini baholang, dunyo holatini o'zgartiring va personaj dialogini yarating.

[FORMAT]: Faqat JSON qaytaring:
{
  "npcDialogue": "string (personajning xarakteriga mos jonli o'zbekcha yoki ruscha gap)",
  "tradeAccepted": boolean,
  "counterOfferPrice": number,
  "reputationChange": number,
  "marketEvent": "string or null"
}`,
  },
  {
    id: 'vibe-coding-10x',
    title: '10x Vibe Coding: Production Full-Stack Web Engine',
    category: 'Vibe Coding',
    description: 'React 19 + TypeScript + Tailwind + Gemini SDK orqali 1 soatda to\'liq ishlaydigan MVP yig\'ish prompti.',
    formula: 'Senior Staff Engineer Archetype',
    promptText: `[KIM SIZ]: Principal Full-Stack Engineer & Vibe Coding World Champion.

[NIMA KERAK]: 
React 19 + TypeScript + Vite + Tailwind CSS v4 + Lucide Icons asosida zamonaviy, futuristik (Dark Glassmorphism, Neon Cyan & Purple accents) interfeys yarat.
Backend uchun to'g'ridan-to'g'ri Google Gemini API (\`@google/genai\`) ulanadigan servis qatlamini yoz.
Ilova to'liq responsive, qulay mobil boshqaruv (PWA/Telegram WebApp uchun tayyor) va animatsiyalarga (Framer Motion) ega bo'lsin.

[FORMAT]:
1. Arxitektura tuzilishi (\`src/services/gemini.ts\`, \`src/components/...\`, \`src/types/...\`).
2. Har bir fayl uchun to'liq, qisqartirishlarsiz, tayyor ishlab turgan kod.`,
  },
];

export const PromptVault: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    triggerConfetti();
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredPrompts = PROMPT_DATABASE.filter((p) => {
    const matchesFilter = filter === 'all' || p.category === filter;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-orange-950 p-6 md:p-8 border border-amber-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Terminal className="w-3.5 h-3.5" />
              Prompt Engineering Vault • Silicon Valley & School 21
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Unicorn Master Promptlar Banki
            </h2>
            <p className="text-slate-300 mt-2 max-w-2xl text-sm md:text-base">
              YouTube, eng nufuzli AI laboratoriyalari va jahon startap sammitlarida sinovdan o'tgan, Gemini modelini 100% quvvatda ishlatuvchi maxsus tizim promptlari.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {(['all', 'Startup', 'FinTech', 'Gaming', 'Vibe Coding'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition shrink-0 border ${
                filter === cat
                  ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {cat === 'all' ? 'Barchasi (All)' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Promptlarni qidirish..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Prompt Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPrompts.map((p) => (
          <div
            key={p.id}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-slate-700 transition"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                  {p.category}
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {p.formula}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed">{p.description}</p>

              {/* Code preview block */}
              <div className="relative bg-slate-950 p-4 rounded-xl border border-slate-800/80 mb-4 max-h-48 overflow-y-auto font-mono text-[11px] text-slate-300 scrollbar-thin">
                <pre className="whitespace-pre-wrap">{p.promptText}</pre>
              </div>
            </div>

            <button
              onClick={() => handleCopy(p.id, p.promptText)}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 border ${
                copiedId === p.id
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
              }`}
            >
              {copiedId === p.id ? (
                <>
                  <Check className="w-4 h-4" />
                  Nusxalandi! (Copied to Clipboard)
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Promptdan 1-Tugma Bilan Nusxa Olish
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
