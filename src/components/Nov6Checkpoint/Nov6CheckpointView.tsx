import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Building2,
  FileText,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

export const Nov6CheckpointView: React.FC = () => {
  const [activeSpeechLang, setActiveSpeechLang] = useState<'uz' | 'ru'>('uz');
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [copiedSpeech, setCopiedSpeech] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(120);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const speechUz = `Assalomu alaykum, hurmatli ekspertlar va mentorlar! Men Jasur Shukurov, MedLoop AI loyihasi asoschisiman. Biz Launch Lab 21 doirasida "Track B: Tushum hisobidan o'sish (B2B SaaS Bootstrapping)" trekini tanladik.

1. MUAMMO VA CUSTDEV NATIJALARI:
O'tgan 2 hafta ichida biz Samarqand va Toshkentdagi 8 ta xususiy klinika bosh shifokori, registratori va bemorlari bilan chuqur CustDev intervyularini o'tkazdik. Natija hayratlanarli: 8 ta intervyudan 7 tasida (87.5%) bizning gipotezamiz to'liq tasdiqlandi!
Asosiy kashfiyotimiz: Klinikada laboratoriya tahlili topshirgan bemorlarning 45% dan ortig'i o'z tahlil natijalarini olgach, mutaxassis shifokor ko'rigiga qaytib kirmaydi! Natijada xususiy klinika har oyda 5 milliondan 10 million so'mgacha tayyor tushumini yo'qotmoqda.
Muhim burilish (Pivot): Biz shifokori bo'lmagan mustaqil laboratoriyalarni maqsadli mijozlar ro'yxatidan chiqardik, chunki ular konsultatsiyadan pul ishlay olmaydi. Biz 100% o'z shifokorlariga ega bo'lgan ko'p tarmoqli xususiy klinikalarga fokus qildik!

2. MAHSULOT VA TEXNOLOGIK YECHIM:
Bemorlar yangi ilova yuklab olishni xohlamaydi! Shuning uchun MedLoop AI 100% Telegram ekotizimida ishlaydi. 
Bemor laboratoriya varaqasini yuborganida, bizning OCR va neyrotarmoq modelimiz 8 soniya ichida biomarkerlarni standart fiziologik me'yorlar bilan solishtiradi. Xulosa tagida darhol klinikadagi bo'sh qabul vaqtlari va mutaxassis nomi chiqadi. Bemor 1 bosishda shifokor qabuliga yoziladi.

3. UNIT ECONOMICS VA BIZNES MODEL (TRACK B):
Har bir tahlilni saralash tannarxi bizga atigi $0.0018 (23 so'm) ga tushadi. Klinikalarga esa 800,000 dan 1,500,000 so'mgacha oylik B2B SaaS obuna sotamiz. Bu 98.2% brutto marja demakdir!
Klinika 800 ming so'm to'lab, o'zining yo'qotilayotgan 20-30 million so'mlik bemorlarini qaytarib oladi — bu klinika uchun 25-30x ROI degani!

4. HOZIRGI HOLAT VA 3-MODUL REJASI:
Muassislar o'rtasida 45/20/20/15 foizli rasmiy bitim imzolandi. Osiyo Medical Clinic bilan 14 kunlik pilot kelishuvi bor. 3-modulda biz 50 ta jonli bemorning tahlilini 8 soniyalik saralash orqali shifokor qabuliga konversiyasini isbotlaymiz. E'tiboringiz uchun rahmat!`;

  const speechRu = `Здравствуйте, уважаемые трекеры и эксперты Launch Lab 21! Меня зовут Жасур Шукуров, я основатель MedLoop AI. Мы идем по Треку B (Рост за счет выручки / B2B SaaS Bootstrapping).

1. ПРОБЛЕМА И РЕЗУЛЬТАТЫ CUSTDEV:
За 2 недели мы провели 8 глубинных интервью с главврачами, регистраторами и пациентами частных клиник. Проблема подтвердилась на 87.5% (7 из 8 клиник).
Главный инсайт: более 45% пациентов после сдачи анализов забирают бланк и НЕ возвращаются на повторный прием к врачу. Клиника теряет от 5 до 10+ млн сумов ежемесячной выручки на пустых слотах врачей!
Важный отказ: Мы дисквалифицировали лаборатории без штатных врачей, так как они не могут монетизировать повторный визит. Наш фокус — многопрофильные частные клиники с собственной лабораторией и врачами.

2. РЕШЕНИЕ И МОДУЛЬ 3 MVP:
Люди не хотят скачивать новые тяжелые приложения. MedLoop работает прямо в Telegram: пациент отправляет фото или PDF анализа, наш движок за 8 секунд сравнивает биомаркеры с клиническими референсами и выдает 1-клик кнопки записи к свободному профильному врачу клиники.

3. ЮНИТ-ЭКОНОМИКА И ТРЕК B:
Себестоимость сканирования (COGS) — $0.0018 (~23 сума). Подписка для клиники — 800,000 – 1,500,000 сумов/месяц. Валовая маржа — 98.2%! Клиника окупает подписку в 25–30 раз за счет возврата потерянных пациентов.

4. СТАТУС:
Соглашение фаундеров подписано (45/20/20/15). Начинаем пилот с клиникой Osiyo Medical. В 3-м модуле докажем конверсию на 50 реальных тестах. Спасибо!`;

  const handleCopy = () => {
    const text = activeSpeechLang === 'uz' ? speechUz : speechRu;
    navigator.clipboard.writeText(text);
    setCopiedSpeech(true);
    setTimeout(() => setCopiedSpeech(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-6 px-4">

      {/* Top Header */}
      <div className="apple-card p-6 md:p-8 bg-gradient-to-br from-zinc-950 via-[#0B0B0E] to-zinc-900 border-[#FF5500]/25 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#FF5500] text-xs font-bold uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5 text-[#FF5500]" />
              Launch Lab 21 · 1-Nazorat Nuqtasi (6-Noyabr Checkpoint)
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
              MedLoop AI · 2-Modul <span className="font-serif italic text-[#FF5500] font-normal">CustDev</span> Xulosalari
            </h1>
            <p className="text-sm text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              Track B (B2B SaaS Bootstrapping): Xususiy klinikalarda laboratoriyadan keyingi 45% bemor tushib qolishini qaytarish orqali 5–10M+ so'm yo'qotilgan daromadni tiklash.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="/clinic-roi.html"
              className="bg-[#FF5500] text-black hover:bg-[#FF6B1A] px-4 py-2.5 text-xs font-black rounded-xl flex items-center gap-1.5 shadow-[0_0_25px_rgba(255,85,0,0.35)] transition transform hover:scale-105"
            >
              <TrendingUp className="w-3.5 h-3.5 text-black" />
              Klinika ROI Cockpit
            </a>
            <a
              href="/reception.html"
              className="apple-btn-secondary px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5" />
              Registratura Navbati
            </a>
          </div>
        </div>
      </div>

      {/* Quick Deliverables Link Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <a
          href="/MedLoop_Agreement.pdf"
          target="_blank"
          className="apple-card p-3.5 flex items-center justify-between hover:border-[#FF5500]/40 transition group"
        >
          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-white" />
            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#FF5500] transition">Bitim (45/20/20/15)</p>
              <p className="text-[10px] text-zinc-400">MedLoop_Agreement.pdf</p>
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#FF5500]" />
        </a>

        <a
          href="/loi.pdf"
          target="_blank"
          className="apple-card p-3.5 flex items-center justify-between hover:border-[#FF5500]/40 transition group"
        >
          <div className="flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-white" />
            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#FF5500] transition">Pilot Niyat Xati</p>
              <p className="text-[10px] text-zinc-400">Osiyo Medical LOI</p>
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#FF5500]" />
        </a>

        <a
          href="/workflow.html"
          target="_blank"
          className="apple-card p-3.5 flex items-center justify-between hover:border-[#FF5500]/40 transition group"
        >
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-white" />
            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#FF5500] transition">Jarayon Xaritasi</p>
              <p className="text-[10px] text-zinc-400">8s Triage Workflow</p>
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#FF5500]" />
        </a>

        <a
          href="/tracker.html"
          target="_blank"
          className="apple-card p-3.5 flex items-center justify-between hover:border-[#FF5500]/40 transition group"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <div>
              <p className="text-xs font-bold text-white group-hover:text-[#FF5500] transition">Modul Treker</p>
              <p className="text-[10px] text-zinc-400">12 Haftalik Reja</p>
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#FF5500]" />
        </a>
      </div>

      {/* 2-Minute Teleprompter Card */}
      <div className="apple-card p-6 md:p-7 border-[#FF5500]/25 bg-[#0E0E12] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-1">
              [OVOZ] 6-Noyabr Teleprompter (2-Daqiqalik Nutq)
            </div>
            <p className="text-xs text-zinc-400">
              Uchrashuvda ovoz chiqarib aytish uchun tayyorlangan so'zma-so'z ssenariy
            </p>
          </div>

          {/* Controls: Timer & Lang */}
          <div className="flex items-center gap-3">
            {/* Lang Switcher */}
            <div className="flex items-center bg-black/50 border border-white/10 rounded-xl p-0.5 text-xs font-semibold">
              <button
                onClick={() => setActiveSpeechLang('uz')}
                className={`px-3 py-1.5 rounded-lg transition ${activeSpeechLang === 'uz' ? 'bg-[#FF5500] text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
              >
                O'zbekcha
              </button>
              <button
                onClick={() => setActiveSpeechLang('ru')}
                className={`px-3 py-1.5 rounded-lg transition ${activeSpeechLang === 'ru' ? 'bg-[#FF5500] text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
              >
                Русский
              </button>
            </div>

            {/* Timer Display */}
            <div className="flex items-center gap-2 bg-black/60 border border-[#FF5500]/30 px-3 py-1.5 rounded-xl shadow-[0_0_15px_rgba(255,85,0,0.2)]">
              <Clock className="w-3.5 h-3.5 text-[#FF5500]" />
              <span className={`text-sm font-mono font-bold ${timerSeconds <= 20 ? 'text-red-500 animate-pulse' : 'text-[#FF5500]'}`}>
                {formatTime(timerSeconds)}
              </span>
              <button
                onClick={toggleTimer}
                className="p-1 rounded hover:bg-white/10 text-zinc-300 hover:text-white"
                title={isTimerRunning ? 'To‘xtatish' : 'Boshlash'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5 text-[#FF5500]" /> : <Play className="w-3.5 h-3.5 text-[#FF5500]" />}
              </button>
              <button
                onClick={resetTimer}
                className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white"
                title="Qayta o‘rnatish"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="apple-btn px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5"
            >
              {copiedSpeech ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedSpeech ? 'Nusxalandi' : 'Nusxa olish'}
            </button>
          </div>
        </div>

        {/* Teleprompter Box */}
        <div className="bg-black/60 border border-white/10 rounded-2xl p-5 text-sm md:text-base leading-relaxed text-zinc-200 whitespace-pre-line font-medium">
          {activeSpeechLang === 'uz' ? speechUz : speechRu}
        </div>
      </div>

      {/* 8-Clinic CustDev Validation Matrix */}
      <div className="apple-card p-6 space-y-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            ✓ 87.5% Muammo Tasdiqlandi (8 ta Intervyu)
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            CustDev Jamlanma Matritsasi (Faktlar va Rad etish Mezonlari)
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Biz rad etish mezoni sifatida «agar 50% dan ortig'i kutish va yo'qotishdan aziyat chekmasa» deb belgilagan edik. Natija 87.5% norozilikni ko'rsatdi.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">№</th>
                <th className="py-2.5 px-3">Segment (Ismsiz)</th>
                <th className="py-2.5 px-3">Konteks / Tashkilot</th>
                <th className="py-2.5 px-3 text-center">Navbat og'rig'i</th>
                <th className="py-2.5 px-3 text-center">Daftar xatosi</th>
                <th className="py-2.5 px-3 text-center">1.5M B2B to'lash</th>
                <th className="py-2.5 px-3 text-center">Holat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              <tr>
                <td className="py-2.5 px-3 mono text-zinc-500">1</td>
                <td className="py-2.5 px-3 font-semibold text-white">Surunkali bemor (42 yosh)</td>
                <td className="py-2.5 px-3 text-zinc-400">Samarqand shahar</td>
                <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">HA</td>
                <td className="py-2.5 px-3 text-center text-amber-400">QISMAN</td>
                <td className="py-2.5 px-3 text-center text-amber-400">QISMAN</td>
                <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold">Tasdiq</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 mono text-zinc-500">2</td>
                <td className="py-2.5 px-3 font-semibold text-white">Yosh ona, 2 farzand (29 yosh)</td>
                <td className="py-2.5 px-3 text-zinc-400">Onalar forumi</td>
                <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">HA</td>
                <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">HA</td>
                <td className="py-2.5 px-3 text-center text-amber-400">QISMAN</td>
                <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold">Tasdiq</span></td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className="py-2.5 px-3 mono text-zinc-500">3</td>
                <td className="py-2.5 px-3 font-semibold text-white">Bosh shifokor</td>
                <td className="py-2.5 px-3 text-zinc-300 font-medium">Osiyo Medical Clinic</td>
                <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">HA</td>
                <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">HA</td>
                <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">HA</td>
                <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">Buyer (ICP)</span></td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className="py-2.5 px-3 mono text-zinc-500">4</td>
                <td className="py-2.5 px-3 font-semibold text-white">Bosh registrator (3 yil staj)</td>
                <td className="py-2.5 px-3 text-zinc-300 font-medium">Osiyo Medical Registratsiya</td>
                <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">HA</td>
                <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">HA</td>
                <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">HA</td>
                <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">User (ICP)</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 mono text-zinc-500">5</td>
                <td className="py-2.5 px-3 font-semibold text-white">IT mutaxassis (26 yosh)</td>
                <td className="py-2.5 px-3 text-zinc-400">School 21 Toshkent</td>
                <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">HA</td>
                <td className="py-2.5 px-3 text-center text-amber-400">QISMAN</td>
                <td className="py-2.5 px-3 text-center text-amber-400">QISMAN</td>
                <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold">Tasdiq</span></td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className="py-2.5 px-3 mono text-zinc-500">6</td>
                <td className="py-2.5 px-3 font-semibold text-white">Nevropatolog shifokor (12 yil)</td>
                <td className="py-2.5 px-3 text-zinc-300 font-medium">SamDTU Klinikasi</td>
                <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">HA</td>
                <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">HA</td>
                <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">HA</td>
                <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">User (ICP)</span></td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 mono text-zinc-500">7</td>
                <td className="py-2.5 px-3 font-semibold text-white">Talaba (21 yosh)</td>
                <td className="py-2.5 px-3 text-zinc-400">Talabalar turar joyi</td>
                <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">HA</td>
                <td className="py-2.5 px-3 text-center text-amber-400">QISMAN</td>
                <td className="py-2.5 px-3 text-center text-zinc-500">YO'Q</td>
                <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">B2C arzon</span></td>
              </tr>
              <tr className="bg-white/[0.02]">
                <td className="py-2.5 px-3 mono text-zinc-500">8</td>
                <td className="py-2.5 px-3 font-semibold text-white">Stomatologiya direktori</td>
                <td className="py-2.5 px-3 text-zinc-300 font-medium">Xususiy stomatologiya</td>
                <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">HA</td>
                <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">HA</td>
                <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">HA</td>
                <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">Buyer (ICP)</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Disqualification Callout */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 leading-relaxed">
          ⚠️ <strong>Strategik Rad Etish (Disqualification):</strong> Mustaqil diagnostika laboratoriyalari (masalan, faqat qon oladigan punktlar) bizning maqsadli xaridorimiz emas, chunki ularning o'z shifokori yo'q va ular bemorni qayta ko'rikka kiritishdan pul ishlay olmaydi. Biz faqat <em>ko'p tarmoqli xususiy klinikalar</em>ga (Osiyo Medical kabi) e'tibor qaratamiz.
        </div>
      </div>

      {/* Value Proposition Canvas (VPC) & Data -> Pattern -> Insight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* VPC: Customer Profile vs Value Map */}
        <div className="apple-card p-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider">
            Value Proposition Canvas (VPC)
          </div>
          <h4 className="text-sm font-bold text-white">Mijoz Og'riqlari va Bizning Yechim</h4>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 space-y-1">
              <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">Aniqlangan Og'riqlar (Pains):</span>
              <p className="text-zinc-300">1. Klinika koridorida 1.5–2.5 soat tirband kutish (Keskinlik: 3/3).</p>
              <p className="text-zinc-300">2. Bemor tahlil natijasini olgach, mutaxassisga kirmay uyiga ketib qolishi (Klinika yo'qotishi: 45%).</p>
              <p className="text-zinc-300">3. Registratura daftarlarida xatoliklar va 2+ soat vaqt yo'qotilishi.</p>
            </div>

            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Bizning Yechim (Value Map):</span>
              <p className="text-zinc-300">1. Telegram orqali 8 soniyalik avtomatik klinik saralash (triage).</p>
              <p className="text-zinc-300">2. Mutaxassis shifokorning bo'sh oynasiga 1 bosishda yozilish (45% drop-offni qaytarish).</p>
              <p className="text-zinc-300">3. Registratura uchun oddiy va tezkor bir bosishli panel (reception.html).</p>
            </div>
          </div>
        </div>

        {/* Data -> Pattern -> Insight Flow */}
        <div className="apple-card p-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider">
            Metodologiya
          </div>
          <h4 className="text-sm font-bold text-white">Data → Pattern → Insight Ketma-ketligi</h4>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="w-6 h-6 rounded-lg bg-zinc-800 text-white font-bold flex items-center justify-center text-xs shrink-0">1</span>
              <div>
                <strong className="text-white block">Xom Ma'lumot (Data):</strong>
                <p className="text-zinc-400 mt-0.5">8 ta intervyuda shifokorlar kuniga 15-20 ta bo'sh darcha qolayotganini, bemorlar esa tahlildan keyin shifokorga qaytishni unutayotganini aytdi.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="w-6 h-6 rounded-lg bg-zinc-800 text-white font-bold flex items-center justify-center text-xs shrink-0">2</span>
              <div>
                <strong className="text-white block">Qonuniyat (Pattern):</strong>
                <p className="text-zinc-400 mt-0.5">Bemorlar yangi ilova yuklab olishni rad etishadi, lekin Telegram orqali shifokor nomi va aniq vaqt ko'rsatilganda 60%+ konversiya bilan qabulga yozilishadi.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs shrink-0">3</span>
              <div>
                <strong className="text-white block">Biznes Insight (Trek B):</strong>
                <p className="text-zinc-400 mt-0.5">MedLoop klinikalarga "tizim" emas, balki oyiga 5–10 million so'mlik yo'qotilgan tushumni qaytarib beruvchi kafolatli vosita sifatida 800k–1.5M UZS narxda sotiladi.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
