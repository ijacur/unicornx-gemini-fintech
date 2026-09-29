import React, { useState } from 'react';
import {
  Award,
  Copy,
  RotateCcw,
  Check,
  FileCheck
} from 'lucide-react';
import type { ExamQuestion, ChecklistItem } from '../../types/realEstate';
import { triggerConfetti } from '../../lib/utils';

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'cl-1',
    category: 'Hujjatlar',
    title: '1. Davlat Reyestri va Soliq Tekshiruvi',
    description: 'Firma qachon ochilgan, ustav kapitali qancha, soliq qarzdorligi yo‘qmi va sudlashuvlar bormi-yo‘qligini tekshiring.',
    source: 'my.soliq.uz / Davlat xizmatlari',
  },
  {
    id: 'cl-2',
    category: 'Hujjatlar',
    title: '2. Shahar Arxitekturasi va Hokimlik Qarori',
    description: 'Ushbu yer uchastkasi haqiqatdan ham ko‘p qavatli uy-joy uchun ajratilganmi yoki bog‘cha/maktab uchunmi?',
    source: 'Shahar Arxitektura Boshqarmasi',
  },
  {
    id: 'cl-3',
    category: 'Kommunikatsiya',
    title: '3. Gaz va Isitish Texnik Shartlari (TU)',
    description: 'Domga gaz kiradimi yoki gazsizlantirilganmi? Isitish elektr tenlar orqalimi yoki avtonom gaz qozonxonasimi?',
    source: 'Hududgaz Samarqand / Texnik shart',
  },
  {
    id: 'cl-4',
    category: 'Hujjatlar',
    title: '4. Tilxat (Tirxat) Balosidan Qat\'iy Qochish',
    description: 'Hovli ichiga qurilgan, alohida kadastri chiqmagan domni hech qachon tilxat bilan olmang. Ertaga qo‘shnilar roziligisiz sota olmaysiz.',
    source: 'Notarial Palata / Sud amaliyoti',
  },
  {
    id: 'cl-5',
    category: 'Meros va Da\'vo',
    title: '5. Begona Odamdan «Hadya» (Doreniye) Olishni Taqiqlash',
    description: 'Soliqdan qochish yoki chet eldagi merosxo‘rlarni aldash uchun hadya taklif qilinadi. Faqat rasmiy Oldi-Sotdi shartnomasi qiling.',
    source: 'O‘zR Fuqarolik Kodeksi 502-modda',
  },
  {
    id: 'cl-6',
    category: 'Maydon va Chegaralar',
    title: '6. Shartnomadagi Kvadratura Qaytarilishi Bandi',
    description: 'Kotlovanda uy 70 m² o‘rniga 66 m² chiqsa, quruvchi yetishmagan har bir metr pulini qaytarishi shartnoma matniga kiritilishi shart.',
    source: 'Shartnoma loyihasi',
  },
  {
    id: 'cl-7',
    category: 'Maydon va Chegaralar',
    title: '7. Panjara emas, Kadastr Geodezik Koordinatasi',
    description: 'Sotuvchining devoriga emas, kadastr xaritasidagi chegaralarga va "Qizil chiziq" belgilariga qarang.',
    source: 'Davlat Kadastr Agentligi geoportali',
  },
  {
    id: 'cl-8',
    category: 'Maydon va Chegaralar',
    title: '8. Bo‘sh Yerni Ikkiga Bo‘lish Qoidasi',
    description: 'Bo‘sh yerga kadastr berilmaydi. Yer uchastkasini bo‘lish uchun u yerda kamida 15-20 m² poydevor yoki boshpana imorati bo‘lishi shart.',
    source: 'Yer Kodeksi talabi',
  },
  {
    id: 'cl-9',
    category: 'Hujjatlar',
    title: '9. Yengil Konstruksiyalar (Konteyner) Ijarasi',
    description: 'Do‘kon-treylerlar E-Auksion orqali faqat 3 yilga ijaraga olinadi. Bu yerda kapital bino qurish mumkin emas.',
    source: 'e-auksion.uz',
  },
  {
    id: 'cl-10',
    category: 'Hujjatlar',
    title: '10. Mustaqil Yurist va Ekspert Ko‘rigi',
    description: 'Ofisdagi shirin choy va chiroyli so‘zlarga aldanmasdan, hujjatlarni mustaqil yuristga ko‘rsatib, keyin pul sanang.',
    source: 'Mustaqil advokatlik byurosi',
  },
];

export const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    question: 'Quruvchi yigit Instagramda qimmat Tahoe/Malibu mashinasida chiqib gapirsa, xaridor nima qilishi kerak?',
    options: [
      'Bolasining puli ko‘p ekan, aldab nima qiladi, darhol 50% boshlang‘ich pulni to‘lash kerak',
      'Mashinasiga emas, firmaning davlat reyestridagi ustav fondi va shahar arxitekturasi ruxsatnomasiga qarash kerak',
      'Faqat uning Instagram sahifasidagi obunachilar soniga ishonish kifoya',
    ],
    correctIndex: 1,
    explanation: 'Mashinalar ko‘pincha prokatga olingan bo‘ladi, u odam shunchaki brendfeys (yuz). Sudda faqat rasmiy litsenziya va muhrli hujjat gapiradi.',
  },
  {
    id: 2,
    question: 'Nega Family Park va Geofizika atroflaridagi ayrim domlar birdan arzonlab ketdi?',
    options: [
      'Quruvchilar saxovat oyligi e’lon qilgani uchun',
      'Yangi qaror bo‘yicha gaz berilmasligi va elektrda isitish gazdan 3-4 baravar qimmatga tushishi ma’lum bo‘lgani uchun',
      'Bu domlar pishgan g‘ishtdan emas, monolitdan qurilgani uchun',
    ],
    correctIndex: 1,
    explanation: 'Gazsizlantirilgan domlarda elektr isitish qishda oyiga 2.5–3 mln so‘mga tushadi. Shu sababli odamlar uylarni 8 mln dan 5 mln ga tushirib sotishga majbur bo‘lmoqda.',
  },
  {
    id: 3,
    question: 'Hovli ichiga noqonuniy qurilgan 6 qavatli domni "tilxat" bilan sotib olishning eng katta xavfi nima?',
    options: [
      'Tilxatni yo‘qotib qo‘ysangiz yangisini yozdirish qiyin bo‘ladi',
      'Kadastr chiqmagani sababli "umumiy hovli" bo‘lib qoladi va kelajakda uyni sotish uchun pod’yezddagi barcha qo‘shnilarning yozma roziligi shart bo‘ladi',
      'Faqat lift ishlamay qolishi xavfi bor',
    ],
    correctIndex: 1,
    explanation: 'Bitta qo‘shni arazlab imzo qo‘ymasa, o‘z uyingizni hech qachon boshqa odamga qonuniy sota olmaysiz!',
  },
  {
    id: 4,
    question: 'Begona sotuvchi uyni Oldi-Sotdi emas, «Hadya» (Doreniye) qilib beraman desa nima uchun rad etish shart?',
    options: [
      'Chunki hadya uchun notarius ko‘p pul oladi',
      'Ko‘pincha u yerda chet eldagi boshqa merosxo‘rlar bo‘ladi va ular qaytib kelgach sud orqali uyni kompensatsiyasiz tortib oladi',
      'Hadya qilingan uyga mebel olib kirish taqiqlangan',
    ],
    correctIndex: 1,
    explanation: 'Hadya — bu noqonuniy merosxo‘rlarning roziligini ololmagan sotuvchilarning tuzog‘idir. Begona odamdan hech qachon hadya shartnomasi bilan uy olinmaydi.',
  },
  {
    id: 5,
    question: '8 sotix bo‘sh yerning 4 sotixini bo‘lib olmoqchi bo‘lsangiz, nega u yerda bino/boshpana bo‘lishi shart?',
    options: [
      'Chunki kadastr faqat yashasa bo‘ladigan yerga beriladi, bo‘sh yerni alohida kadastr qilib bo‘lmaydi',
      'Chunki qo‘shnilar bilan choy ichish uchun joy kerak',
      'Bino bo‘lmasa yerga elektr o‘tkazish taqiqlanadi',
    ],
    correctIndex: 0,
    explanation: 'Qonun bo‘yicha bo‘sh yer alohida uchastka sifatida bo‘linmaydi. U yerda kamida 15-20 m² boshpana poydevori/imorati bo‘lishi shart.',
  },
];

export const SmartBuyerExam: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'checklist' | 'exam'>('checklist');
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);

  // Exam State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleGradeExam = () => {
    let correctCount = 0;
    EXAM_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setIsSubmitted(true);
    if (correctCount >= 4) {
      triggerConfetti();
    }
  };

  const handleResetExam = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  const handleCopyChecklist = () => {
    const text = CHECKLIST_ITEMS.map((item) => `${item.title}\n• ${item.description}\n(Manba: ${item.source})\n`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedChecklist(true);
    triggerConfetti();
    setTimeout(() => setCopiedChecklist(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Toggle Tabs */}
      <div className="flex items-center justify-between p-2 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'checklist'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>10 Oltin Qoida (Checklist)</span>
        </button>

        <button
          onClick={() => setActiveTab('exam')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'exam'
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>«Aqlli Xaridor» Imtihoni</span>
        </button>
      </div>

      {/* VIEW 1: CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-indigo-400" />
                Uy va Yer Ko‘rishga Borganda Olib Yuriladigan Checklist
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Ushbu 10 ta qoidani telefoningizga saqlab oling yoki chop etib, obyektda birma-bir tekshiring!
              </p>
            </div>

            <button
              onClick={handleCopyChecklist}
              className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-indigo-600/30 shrink-0"
            >
              {copiedChecklist ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedChecklist ? 'Checklist Nusxalandi!' : 'Checklistdan Nusxa Olish'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHECKLIST_ITEMS.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-white">{item.title}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                <span className="text-[11px] text-slate-500 block pt-1 font-mono">
                  Tekshirish joyi: {item.source}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: EXAM */}
      {activeTab === 'exam' && (
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-2">
            <h3 className="text-xl font-black text-white">
              Domlaning Darslari Bo‘yicha «Aqlli Xaridor» Sinovi
            </h3>
            <p className="text-xs text-slate-400">
              5 ta savolga to‘g‘ri javob bering va rasmiy <strong>Sertifikatlangan Aqlli Xaridor</strong> maqomiga ega bo‘ling!
            </p>
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            {EXAM_QUESTIONS.map((q, idx) => {
              const selectedOpt = selectedAnswers[q.id];
              return (
                <div
                  key={q.id}
                  className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4"
                >
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                    Savol #{idx + 1}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                    {q.question}
                  </h4>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      const isCorrect = optIdx === q.correctIndex;
                      return (
                        <button
                          key={optIdx}
                          disabled={isSubmitted}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition flex items-start gap-3 leading-relaxed ${
                            isSubmitted
                              ? isCorrect
                                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                : isSelected
                                ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                                : 'bg-slate-950/40 border-slate-800 text-slate-400'
                              : isSelected
                              ? 'bg-indigo-600/30 border-indigo-500 text-white'
                              : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                          }`}
                        >
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {optIdx === 0 ? 'A' : optIdx === 1 ? 'B' : 'C'}
                          </span>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      <span className="font-bold text-amber-400 block mb-1">Xulosa & Izoh:</span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Exam Grade Button or Certificate Reveal */}
          <div className="pt-4">
            {!isSubmitted ? (
              <button
                onClick={handleGradeExam}
                disabled={Object.keys(selectedAnswers).length < EXAM_QUESTIONS.length}
                className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Award className="w-5 h-5" />
                Natijalarni Tekshirish va Sertifikat Olish
              </button>
            ) : (
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6 shadow-2xl animate-fadeIn">
                <div className="space-y-2">
                  <div className="text-4xl">
                    {score >= 4 ? '🏆' : '📚'}
                  </div>
                  <h4 className="text-2xl font-black text-white">
                    {score >= 4 ? 'Tabriklaymiz! Siz Haqiqiy Aqlli Xaridorsiz!' : 'Yana Ozgina O‘rganish Kerak'}
                  </h4>
                  <p className="text-sm font-bold text-amber-400">
                    Sizning Natijangiz: {score} / 5 Ball ({Math.round((score / 5) * 100)}%)
                  </p>
                </div>

                {score >= 4 && (
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-emerald-500/20 border border-amber-500/40 text-center space-y-2">
                    <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest block">
                      Rasmiy Elektron Sertifikat
                    </span>
                    <h5 className="text-lg font-black text-white">
                      «Samarqand Uy-Joy & Kadastr Himoyachisi»
                    </h5>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Siz brendfeys quruvchilar, soxta hadya shartnomalari, gazsiz domlar va qizil chiziq tuzoqlarini 100% ajrata olasiz!
                    </p>
                  </div>
                )}

                <button
                  onClick={handleResetExam}
                  className="py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition flex items-center gap-2 mx-auto"
                >
                  <RotateCcw className="w-4 h-4" />
                  Qayta Topshirish
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
