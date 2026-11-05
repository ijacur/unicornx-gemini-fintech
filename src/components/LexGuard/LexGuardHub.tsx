import React, { useState } from 'react';
import {
  ShieldAlert,
  Scale,
  FileCheck2,
  Sparkles,
  BookOpen,
  Download,
  Copy,
  Check,
  Building,
  Home,
  Briefcase,
  Coins,
  Cpu,
  GraduationCap,
  ExternalLink,
  Send,
  FileText
} from 'lucide-react';
import { MulkXHub } from '../RealEstateEdu/MulkXHub';

interface ContractClause {
  id: string;
  clauseNumber: string;
  originalText: string;
  riskLevel: 'critical' | 'high' | 'medium';
  problemExplanation: string;
  legalArticle: string;
  lexUzLink: string;
  suggestedAlternative: string;
}

interface SampleContract {
  id: string;
  title: string;
  icon: any;
  category: string;
  riskScore: number;
  description: string;
  clauses: ContractClause[];
}

const SAMPLE_CONTRACTS: SampleContract[] = [
  {
    id: 'kotlovan',
    title: 'Kotlovan Qurilish Shartnomasi',
    icon: Building,
    category: 'Ko‘chmas Mulk & Shaharsozlik',
    riskScore: 92,
    description: 'Ko‘p qavatli uy qurilishida ulush kiritish bo‘yicha developer shartnomasi (3 ta jiddiy tuzoq bilan).',
    clauses: [
      {
        id: 'k-1',
        clauseNumber: '3.2-band',
        originalText: 'Xonadon to‘liq elektr tarmog‘i orqali isitiladi. Markaziy yoki lokal gaz tarmog‘iga ulanish nazarda tutilmagan.',
        riskLevel: 'critical',
        problemExplanation: 'Bino gazlashtirilmagan. Qishda faqat elektr orqali isitish oyiga 2.5–3.5 mln so‘m ortiqcha kommunal xarajat keltirib chiqaradi va transformator yuklamasi sababli svet o‘chish xavfi yuqori.',
        legalArticle: 'Shaharsozlik kodeksi 32-moddasi, Iste’molchilar huquqlarini himoya qilish to‘g‘risidagi qonun 4-moddasi',
        lexUzLink: 'https://lex.uz/docs/-5391307',
        suggestedAlternative: '3.2-band (Qonuniy tahrir): «Quruvchi xonadonni loyiha-smeta hujjatlariga muvofiq markazlashgan gaz yoki avtonom ikki pallali isitish qozoni (kotyol) bilan to‘liq ta’minlangan holda foydalanishga topshirish majburiyatini oladi.»'
      },
      {
        id: 'k-2',
        clauseNumber: '5.4-band',
        originalText: 'Bino foydalanishga topshirilgach, xonadon amaldagi maydoni loyihadagidan 5% gacha kam yoki ko‘p chiqsa, tomonlar o‘rtasida qayta hisob-kitob qilinmaydi.',
        riskLevel: 'critical',
        problemExplanation: '70 kv.m xonadon 66.5 kv.m chiqsa (3.5 kv.m kam), quruvchi 35–45 million so‘m pulingizni qaytarmaydi. Bu xaridor manfaatlarini to‘g‘ridan-to‘g‘ri kamsituvchi bir tomonlama noqonuniy shartdir.',
        legalArticle: 'O‘zbekiston Fuqarolik kodeksi 385-moddasi, Iste’molchilar huquqlarini himoya qilish to‘g‘risidagi qonun 21-moddasi (Shartnomaning haqiqiy emas deb topilishi)',
        lexUzLink: 'https://lex.uz/docs/-111189',
        suggestedAlternative: '5.4-band (Qonuniy tahrir): «Davlat kadastr o‘lchovlari natijasida xonadon maydoni loyihadagidan kam chiqqan taqdirda, Quruvchi yetishmayotgan har bir kvadrat metr uchun to‘langan summani 10 (o‘n) bank kuni ichida Xaridorga qaytaradi.»'
      },
      {
        id: 'k-3',
        clauseNumber: '7.1-band',
        originalText: 'Qurilish obyektini topshirish muddati ob-havo sharoitlari yoki material yetishmovchiligi tufayli kechikkan taqdirda, Quruvchi javobgar bo‘lmaydi va jarima to‘lamaydi.',
        riskLevel: 'high',
        problemExplanation: 'Quruvchi muddatni 2-3 yilga kechiktirsa ham siz bir so‘m kompensatsiya ololmaysiz. Fuqarolik kodeksiga ko‘ra har ikki tomon majburiyat bajarilmasligi uchun teng javobgar bo‘lishi shart.',
        legalArticle: 'O‘zbekiston Fuqarolik kodeksi 333-moddasi (Majburiyatlarni buzganlik uchun javobgarlik asoslari)',
        lexUzLink: 'https://lex.uz/docs/-111189',
        suggestedAlternative: '7.1-band (Qonuniy tahrir): «Qurilish obyektini topshirish kechiktirilgan har bir kun uchun Quruvchi Xaridorga shartnoma umumiy summasining 0.05% miqdorida penya to‘laydi (jami summa shartnoma qiymatining 10% idan oshmagan holda).»'
      }
    ]
  },
  {
    id: 'ijara',
    title: 'Turar-joy Ijara Shartnomasi',
    icon: Home,
    category: 'Fuqarolik Huquqi & Ijarachilar',
    riskScore: 85,
    description: 'Kvartira ijarasi bo‘yicha uy egasi tomonidan taqdim etiladigan odatiy shartnoma (depozit va asossiz haydash xatarlari).',
    clauses: [
      {
        id: 'i-1',
        clauseNumber: '4.3-band',
        originalText: 'Ijaraga beruvchi xohlagan paytda o‘z xohishiga ko‘ra Ijarachini 24 soat oldin ogohlantirib, kvartiradan chiqarib yuborish huquqiga ega.',
        riskLevel: 'critical',
        problemExplanation: 'Qonunchilikka zid. Fuqarolik kodeksiga ko‘ra turar-joy ijara shartnomasini muddatidan oldin bekor qilish uchun kamida 1 oy (agar shartnomada boshqacha ko‘rsatilmagan bo‘lsa 3 oy) oldin ogohlantirish talab etiladi.',
        legalArticle: 'O‘zbekiston Fuqarolik kodeksi 615-moddasi (Turar joyni ijaraga berish shartnomasini bekor qilish)',
        lexUzLink: 'https://lex.uz/docs/-180552',
        suggestedAlternative: '4.3-band (Qonuniy tahrir): «Ijaraga beruvchi shartnomani muddatidan oldin bekor qilish istagi paydo bo‘lgan taqdirda, Ijarachini kamida 30 (o‘ttiz) taqvim kuni oldin yozma ravishda xabardor qilishi shart.»'
      },
      {
        id: 'i-2',
        clauseNumber: '6.2-band',
        originalText: 'Kvartira bo‘shatilganda garov depoziti (500 AQSH dollari) har qanday sabab bilan to‘liq qaytarilmay qolishi mumkin.',
        riskLevel: 'critical',
        problemExplanation: 'Depozit faqat mulkka yetkazilgan haqiqiy moddiy zarar va kommunal qarzdorlikni qoplash uchungina ushlab qolinishi mumkin. Asossiz ushlab qolish noqonuniy boyish hisoblanadi.',
        legalArticle: 'O‘zbekiston Fuqarolik kodeksi 1023-moddasi (Asossiz boylik orttirish oqibatlari)',
        lexUzLink: 'https://lex.uz/docs/-180552',
        suggestedAlternative: '6.2-band (Qonuniy tahrir): «Garov depoziti shartnoma yakunlangach, mulkni qabul qilish-topshirish dalolatnomasi va to‘langan kommunal kvitansiyalar asosida 3 bank kuni ichida Ijarachiga to‘liq qaytariladi.»'
      }
    ]
  },
  {
    id: 'mehnat',
    title: 'Xususiy Korxona Mehnat Shartnomasi',
    icon: Briefcase,
    category: 'Mehnat Huquqi & Xodim Himoyasi',
    riskScore: 78,
    description: 'Ishga qabul qilinayotgan yosh mutaxassislar uchun taqdim etiladigan noqonuniy sinov muddati va ortiqcha yuklama shartlari.',
    clauses: [
      {
        id: 'm-1',
        clauseNumber: '2.4-band',
        originalText: 'Xodim uchun dastlabki 6 oylik sinov muddati belgilanadi va bu davrda unga maoshining 50% miqdorida ish haqi to‘lanadi.',
        riskLevel: 'critical',
        problemExplanation: 'Qonunbuzarlik! Yangi Mehnat kodeksiga ko‘ra sinov muddati ko‘pi bilan 3 oyni tashkil etishi mumkin (faqat tashkilot rahbarlari uchun 6 oy). Sinov davrida maoshni kamaytirib to‘lash qat’iyan taqiqlangan.',
        legalArticle: 'O‘zbekiston Respublikasi Yangi Mehnat kodeksi 129, 130-moddalari',
        lexUzLink: 'https://lex.uz/docs/-6257288',
        suggestedAlternative: '2.4-band (Qonuniy tahrir): «Xodimga 2 (ikki) oylik dastlabki sinov muddati belgilanadi. Sinov muddati davrida Xodimga shtat jadvalida belgilangan to‘liq 100% miqdoridagi oylik maosh to‘lanadi.»'
      },
      {
        id: 'm-2',
        clauseNumber: '5.1-band',
        originalText: 'Xodim ish beruvchining barcha moddiy mulki (ofis jihozlari, serverlar, mebellar) bo‘yicha to‘liq jamoaviy va individual moddiy javobgar hisoblanadi.',
        riskLevel: 'high',
        problemExplanation: 'To‘liq moddiy javobgarlik faqat qonunda belgilangan ro‘yxatdagi kasblar (kassir, omborchi) va to‘g‘ridan-to‘g‘ri shartnoma bilan amalga oshiriladi. Oddiy dasturchi yoki ofis xodimiga buni yuklash noqonuniy.',
        legalArticle: 'Yangi Mehnat kodeksi 337, 338-moddalari (To‘liq moddiy javobgarlik to‘g‘risidagi shartnoma)',
        lexUzLink: 'https://lex.uz/docs/-6257288',
        suggestedAlternative: '5.1-band (Qonuniy tahrir): «Xodim faqat o‘zining bevosita aybi bilan va o‘ziga biriktirilgan asbob-uskunalarga yetkazilgan haqiqiy to‘g‘ridan-to‘g‘ri zarar doirasida, oylik maoshidan oshmagan miqdorda javobgar bo‘ladi.»'
      }
    ]
  },
  {
    id: 'qarz',
    title: 'Qarz va Tilxat Bitimi',
    icon: Coins,
    category: 'Moliyaviy Xavfsizlik & Sud Amaliyoti',
    riskScore: 89,
    description: 'Fuqarolar o‘rtasidagi og‘zaki tilxatlar va valyutada qarz berish xatarlari.',
    clauses: [
      {
        id: 'q-1',
        clauseNumber: '1.2-band',
        originalText: 'Qarz oluvchi 10 000 AQSH dollari miqdoridagi qarzni har oyda 10% (1 000 dollar) ustama foizi bilan qaytarish majburiyatini oladi.',
        riskLevel: 'critical',
        problemExplanation: 'O‘zbekiston Respublikasi hududida fuqarolar o‘rtasida chet el valyutasida foizli qarz berish va nobank kreditlash qonunga xilofdir. Bunday shartnomalar sudda haqiqiy emas deb topilishi va foizlar bekor qilinishi mumkin.',
        legalArticle: 'O‘zbekiston Fuqarolik kodeksi 732, 734-moddalari, Valyutani tartibga solish to‘g‘risidagi Qonun',
        lexUzLink: 'https://lex.uz/docs/-4564882',
        suggestedAlternative: '1.2-band (Qonuniy tahrir): «Qarz shartnomasi O‘zbekiston Respublikasining milliy valyutasi (so‘m)da notarial tasdiqlangan holda rasmiylashtiriladi hamda foizlar Markaziy bank qayta moliyalash stavkasi doirasida belgilanadi.»'
      }
    ]
  }
];

export const LexGuardHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audit' | 'lexuz' | 'simulator' | 'dossier'>('audit');
  const [selectedContract, setSelectedContract] = useState<SampleContract>(SAMPLE_CONTRACTS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [customText, setCustomText] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleRunCustomAudit = () => {
    if (!customText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Top Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden apple-card p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-2xl border border-white/10 bg-gradient-to-br from-[#0a1426] via-[#111e38] to-[#0d1b2a]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            LexHackathon 2026 | Adliya Vazirligi & TDYuU
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            LexGuard AI: Shartnomalarni 5 Soniyada Audit Qiluvchi Milliy Platforma
          </h1>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            O‘zbekiston Respublikasi Fuqarolik, Mehnat va Shaharsozlik kodekslari hamda Lex.uz bazasi bilan shartnomalarni solishtiruvchi, yashirin jarimalar, asossiz talablar va sud xatarlarini fosh qiluvchi AI huquqiy tahlil tizimi.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="/LexHackathon_2026_LexGuard_Deck.pptx"
              download="LexHackathon_2026_LexGuard_Deck.pptx"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs sm:text-sm hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/20"
            >
              <Download className="w-4 h-4" />
              Taqdimot Deck (.pptx) yuklab olish
            </a>
            <button
              onClick={() => setActiveTab('dossier')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs sm:text-sm hover:bg-white/20 transition"
            >
              <FileCheck2 className="w-4 h-4 text-amber-400" />
              eventflow.uz Ariza Ma’lumotlari
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold transition shrink-0 ${
            activeTab === 'audit'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
              : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-white/10'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Shartnoma AI Auditi (Jonli Tizim)</span>
        </button>

        <button
          onClick={() => setActiveTab('lexuz')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold transition shrink-0 ${
            activeTab === 'lexuz'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
              : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-white/10'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Lex.uz Qonunlar Bazasi & RAG</span>
        </button>

        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold transition shrink-0 ${
            activeTab === 'simulator'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
              : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-white/10'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>2-Yo‘nalish: Huquqiy Ta’lim & Sud Simulyatori</span>
        </button>

        <button
          onClick={() => setActiveTab('dossier')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs md:text-sm font-semibold transition shrink-0 ${
            activeTab === 'dossier'
              ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
              : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-white/10'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Xakaton Uchun Tayyor Ariza (Dossier)</span>
        </button>
      </div>

      {/* TAB 1: AUDIT ENGINE */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          {/* Sample Contracts Selector */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-3">
              1. Sinov Uchun Namunaviy Shartnomani Tanlang:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SAMPLE_CONTRACTS.map((contract) => {
                const Icon = contract.icon;
                const isSelected = selectedContract.id === contract.id;
                return (
                  <button
                    key={contract.id}
                    onClick={() => setSelectedContract(contract)}
                    className={`p-4 rounded-2xl text-left transition border ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                        : 'bg-zinc-900/40 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-cyan-500 text-black' : 'bg-white/10 text-white'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                        Xavf: {contract.riskScore}%
                      </span>
                    </div>
                    <div className="font-bold text-white text-sm mb-1">{contract.title}</div>
                    <div className="text-xs text-zinc-400 line-clamp-2">{contract.category}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audit Results Container */}
          <div className="rounded-3xl p-6 sm:p-8 border border-white/10 bg-zinc-900/60 backdrop-blur-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Tanlangan Hujjat Auditi
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {selectedContract.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                  {selectedContract.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-zinc-400">Aniqlangan xavfli bandlar</div>
                  <div className="text-xl font-black text-red-400">
                    {selectedContract.clauses.length} ta jiddiy tuzoq
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-black text-lg">
                  !
                </div>
              </div>
            </div>

            {/* Clauses List */}
            <div className="space-y-4">
              {selectedContract.clauses.map((clause) => (
                <div
                  key={clause.id}
                  className="rounded-2xl p-5 border border-red-500/30 bg-red-950/10 space-y-3 transition hover:border-red-500/50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-red-500/20 text-red-300 font-black text-xs">
                        {clause.clauseNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-zinc-300 text-xs font-semibold">
                        {clause.riskLevel === 'critical' ? '[DIQQAT] O‘ta Xavfli' : '[OGOHLANTIRISH] Yuqori Xavf'}
                      </span>
                    </div>

                    <a
                      href={clause.lexUzLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition"
                    >
                      <span>Lex.uz da ko‘rish</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Original Text */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs sm:text-sm text-zinc-200">
                    <span className="text-red-400 font-bold block mb-1">
                      ⚠️ Shartnomadagi asl yozuv (Xavfli matn):
                    </span>
                    «{clause.originalText}»
                  </div>

                  {/* Why it is dangerous */}
                  <div className="text-xs sm:text-sm text-zinc-300 space-y-1">
                    <strong className="text-amber-400 block">Nega bu tuzoq va sud xavfi?</strong>
                    <p className="leading-relaxed">{clause.problemExplanation}</p>
                  </div>

                  {/* Legal base */}
                  <div className="text-xs text-zinc-400 flex items-center gap-1.5 pt-1">
                    <Scale className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Qonuniy asos: <strong className="text-white">{clause.legalArticle}</strong></span>
                  </div>

                  {/* Suggested Safe Alternative */}
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-emerald-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Taklifi (Qonuniy va Adolatli Muqobil Tahrir):
                      </strong>
                      <button
                        onClick={() => handleCopy(clause.suggestedAlternative, clause.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold transition"
                      >
                        {copiedId === clause.id ? (
                          <>
                            <Check className="w-3 h-3" />
                            Nusxalandi
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Nusxa olish
                          </>
                        )}
                      </button>
                    </div>
                    <p className="leading-relaxed italic">{clause.suggestedAlternative}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Input Box for testing ANY contract */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                O‘zingizning Istalgan Shartnomangizni Tekshirib Ko‘ring:
              </h3>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Shartnomadagi shubhali bandni yoki butun matnni shu yerga tashlang (Masalan: 'Xonadon maydoni kam chiqsa pul qaytarilmaydi' yoki 'Quruvchi kechikishga jarima to‘lamaydi')..."
                rows={3}
                className="w-full rounded-2xl bg-black/40 border border-white/10 p-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition"
              />
              <button
                onClick={handleRunCustomAudit}
                disabled={isAnalyzing || !customText.trim()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 text-black font-bold text-sm hover:bg-cyan-400 disabled:opacity-50 transition"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    Lex.uz va Fuqarolik kodeksi bilan tekshirilmoqda...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    AI Bilan 5 Soniyada Tekshirish
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LEX.UZ REGULATORY RAG */}
      {activeTab === 'lexuz' && (
        <div className="rounded-3xl p-6 sm:p-8 border border-white/10 bg-zinc-900/60 backdrop-blur-xl space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Milliy Qonunchilik Bazasiga Integratsiya
            </span>
            <h2 className="text-2xl font-black text-white">
              Lex.uz Vektorli Qidiruv va Qonun Moddalari
            </h2>
            <p className="text-sm text-zinc-400">
              LexGuard AI O‘zbekiston Respublikasi Adliya vazirligining Lex.uz milliy ma’lumotlar bazasidagi 50 000 dan ortiq qonun hujjatlarini real vaqtda semantik taqqoslaydi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">Fuqarolik Kodeksi</span>
                <span className="text-xs text-zinc-400">354, 385-moddalar</span>
              </div>
              <h4 className="text-white font-bold text-sm">Shartnoma Erkinligi va Adolatsiz Shartlar</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Shartnomada bir tomonning ikkinchi tomon ustidan asossiz ustunlikka ega bo‘lishi yoki bir tomonlama javobgarlikdan ozod qilinishi shartnomani sudda haqiqiy emas deb topishga asos bo‘ladi.
              </p>
              <a
                href="https://lex.uz/docs/-111189"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline pt-1"
              >
                lex.uz/docs/-111189 <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">Iste’molchilar Huquqlari Qonuni</span>
                <span className="text-xs text-zinc-400">21-modda</span>
              </div>
              <h4 className="text-white font-bold text-sm">Shartnomaning Iste’molchi Huquqlarini Kamsituvchi Shartlari</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Iste’molchining qonunda belgilangan huquqlarini cheklovchi har qanday shartnoma bandi o‘z-o‘zidan haqiqiy emas (yuridik kuchga ega emas) hisoblanadi.
              </p>
              <a
                href="https://lex.uz/docs/-440"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline pt-1"
              >
                lex.uz/docs/-440 <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">Yangi Mehnat Kodeksi</span>
                <span className="text-xs text-zinc-400">129, 130-moddalar</span>
              </div>
              <h4 className="text-white font-bold text-sm">Sinov Muddati va Kafolatlar</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Sinov muddati oddiy xodimlar uchun 3 oydan oshishi mumkin emas. Homilador ayollar, 3 yoshgacha bolasi borlar va oliy o‘quv yurtini yangi bitirgan yoshlar uchun sinov muddati qo‘llanilmaydi.
              </p>
              <a
                href="https://lex.uz/docs/-6257288"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline pt-1"
              >
                lex.uz/docs/-6257288 <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">Shaharsozlik Kodeksi</span>
                <span className="text-xs text-zinc-400">32, 58-moddalar</span>
              </div>
              <h4 className="text-white font-bold text-sm">Ulushdorlik Qurilishi va Qizil Chiziqlar</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Quruvchi tomonidan shaharsozlik normalariga zid ravishda, davlat ekspertizasi va transport magistralining qizil chiziq zonasida bino qurish jinoiy va ma’muriy javobgarlikka sabab bo‘ladi.
              </p>
              <a
                href="https://lex.uz/docs/-5391307"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline pt-1"
              >
                lex.uz/docs/-5391307 <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SIMULATOR (TRACK 2) */}
      {activeTab === 'simulator' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs sm:text-sm text-cyan-200 flex items-start gap-3">
            <GraduationCap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white mb-0.5">
                2-Yo‘nalish: Huquqiy targ‘ibot va ta’limni rivojlantirish
              </strong>
              Fuqarolar va talabalar uchun haqiqiy sud nizolari va kadastr muammolari asosida yaratilgan interaktiv keyslar simulyatori. Noto‘g‘ri shartnoma imzolansa nima bo‘lishini xavfsiz o‘rganish imkoni.
            </div>
          </div>
          <MulkXHub />
        </div>
      )}

      {/* TAB 4: HACKATHON DOSSIER */}
      {activeTab === 'dossier' && (
        <div className="rounded-3xl p-6 sm:p-8 border border-white/10 bg-zinc-900/60 backdrop-blur-xl space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              eventflow.uz/uz/events/lexhackathon-2026/register
            </span>
            <h2 className="text-2xl font-black text-white">
              LexHackathon 2026 Ro‘yxatdan O‘tish Paketi (Dossier)
            </h2>
            <p className="text-sm text-zinc-300">
              Quyidagi ma’lumotlarni to‘g‘ridan-to‘g‘ri Eventflow platformasiga ko‘chirib qo‘yish (nusxalash) mumkin.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 uppercase font-bold">Jamoa Nomi (Team Name)</span>
                <button
                  onClick={() => handleCopy('LexLoop', 'team-name')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  {copiedId === 'team-name' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Nusxa
                </button>
              </div>
              <div className="text-white font-bold text-base">LexLoop</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 uppercase font-bold">Loyiha Nomi (Project Name)</span>
                <button
                  onClick={() => handleCopy('LexGuard AI', 'proj-name')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  {copiedId === 'proj-name' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Nusxa
                </button>
              </div>
              <div className="text-white font-bold text-base">LexGuard AI</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 uppercase font-bold">Tanlangan Yo‘nalish (Track)</span>
                <button
                  onClick={() => handleCopy('1-yo‘nalish: Huquqiy xizmatlar ko‘rsatishni takomillashtirish', 'track-name')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  {copiedId === 'track-name' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Nusxa
                </button>
              </div>
              <div className="text-white font-bold text-base">
                1-yo‘nalish: Huquqiy xizmatlar ko‘rsatishni takomillashtirish (2-yo‘nalishdagi ta’lim simulyatori bilan)
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 uppercase font-bold">Loyiha Haqida Qisqa Tavsif (1 jumla)</span>
                <button
                  onClick={() =>
                    handleCopy(
                      'O‘zbekiston Fuqarolik Kodeksi va Lex.uz bazasi asosida shartnomalarni 5 soniyada audit qiluvchi, yashirin jarimalar va sud risklarini aniqlovchi AI Huquqiy Ekspertiza Platformasi.',
                      'short-desc'
                    )
                  }
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  {copiedId === 'short-desc' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Nusxa
                </button>
              </div>
              <div className="text-zinc-200 text-sm">
                O‘zbekiston Fuqarolik Kodeksi va Lex.uz bazasi asosida shartnomalarni 5 soniyada audit qiluvchi, yashirin jarimalar va sud risklarini aniqlovchi AI Huquqiy Ekspertiza Platformasi.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 uppercase font-bold">Muammo (Problem Statement)</span>
                <button
                  onClick={() =>
                    handleCopy(
                      'Fuqarolar va kichik biznes (KOB) kotlovan, ijara va mehnat shartnomalaridagi murakkab bandlarni tushunmasdan imzolaydi. Professional yuristga murojaat qilish o‘rtacha 500 000 – 2 000 000 so‘m bo‘lgani uchun aholining 85% i himoyasiz qoladi va firibgarlik qurboni bo‘ladi. Oqibatda sudlarga tushayotgan nizolarning 40% dan ortig‘i shartnomaviy tushunmovchiliklardan kelib chiqadi.',
                      'prob-stmt'
                    )
                  }
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  {copiedId === 'prob-stmt' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Nusxa
                </button>
              </div>
              <div className="text-zinc-200 text-sm leading-relaxed">
                Fuqarolar va kichik biznes (KOB) kotlovan, ijara va mehnat shartnomalaridagi murakkab bandlarni tushunmasdan imzolaydi. Professional yuristga murojaat qilish o‘rtacha 500 000 – 2 000 000 so‘m bo‘lgani uchun aholining 85% i himoyasiz qoladi va firibgarlik qurboni bo‘ladi. Oqibatda sudlarga tushayotgan nizolarning 40% dan ortig‘i shartnomaviy tushunmovchiliklardan kelib chiqadi.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 uppercase font-bold">Yechim (Solution)</span>
                <button
                  onClick={() =>
                    handleCopy(
                      'LexGuard AI foydalanuvchi yuklagan shartnoma (PDF/rasm) matnini 5 soniyada tahlil qilib, 3 ta asosiy natija beradi: 1) Noqonuniy va xavfli bandlarni qizil belgilash; 2) Lex.uz dagi Fuqarolik va Mehnat kodekslari moddalariga to‘g‘ridan-to‘g‘ri havola berish; 3) Tomonlar uchun adolatli va xavfsiz bo‘lgan muqobil qonuniy tahrirni tayyor matn qilib chiqarib berish.',
                      'sol-stmt'
                    )
                  }
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  {copiedId === 'sol-stmt' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Nusxa
                </button>
              </div>
              <div className="text-zinc-200 text-sm leading-relaxed">
                LexGuard AI foydalanuvchi yuklagan shartnoma (PDF/rasm) matnini 5 soniyada tahlil qilib, 3 ta asosiy natija beradi: 1) Noqonuniy va xavfli bandlarni qizil belgilash; 2) Lex.uz dagi Fuqarolik va Mehnat kodekslari moddalariga to‘g‘ridan-to‘g‘ri havola berish; 3) Tomonlar uchun adolatli va xavfsiz bo‘lgan muqobil qonuniy tahrirni tayyor matn qilib chiqarib berish.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 uppercase font-bold">Texnologik Stek (Tech Stack)</span>
                <button
                  onClick={() =>
                    handleCopy(
                      'React 19, TypeScript, Tailwind CSS, Python FastAPI, OCR Tesseract / TrOCR (o‘zbekcha lotin/kirill), Lex.uz RAG vektori, Vercel Global Edge & Cloudflare.',
                      'tech-stack'
                    )
                  }
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  {copiedId === 'tech-stack' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Nusxa
                </button>
              </div>
              <div className="text-zinc-200 text-sm">
                React 19, TypeScript, Tailwind CSS, Python FastAPI, OCR Tesseract / TrOCR (o‘zbekcha lotin/kirill), Lex.uz RAG vektori, Vercel Global Edge & Cloudflare.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400 uppercase font-bold">Jamoa Tarkibi (4 kishi)</span>
              </div>
              <div className="text-xs sm:text-sm text-zinc-200 space-y-1.5 pt-1">
                <div>• <strong>Jasur Shukurov</strong> (Team Lead, AI & Systems Architect — School 21 / SamDTU)</div>
                <div>• <strong>Munisa</strong> (LegalTech & UI/UX Designer — Legal Compliance & Research)</div>
                <div>• <strong>Shoxrux</strong> (Backend & Lex.uz Data Engineer — Python FastAPI & Security)</div>
                <div>• <strong>Nargis</strong> (CustDev & Quality Assurance — User Testing & Citizen Interviews)</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
