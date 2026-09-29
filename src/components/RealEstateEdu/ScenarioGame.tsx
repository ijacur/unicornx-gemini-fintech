import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  MapPin
} from 'lucide-react';
import type { ScenarioCase, ScenarioChoice } from '../../types/realEstate';
import { triggerConfetti } from '../../lib/utils';

export const SCENARIO_CASES: ScenarioCase[] = [
  {
    id: 'case-1',
    title: 'Instagramdagi 26 yoshli «Millioner» Quruvchi',
    location: 'Samarqand shahri, Yangi Trassa yoqasi',
    tag: 'Novostroyka',
    characterName: 'Bobur «Brendfeys»',
    characterRole: 'Instagram bloger & Yangi dom ambassadori',
    characterAvatar: '🏎️',
    situation:
      'Instagramda 26 yoshida millioner bo‘lganini aytib, Tahoe va Malibu mashinalarida yurgan yigit sizni yangi dom kotlovaniga taklif qildi. «Aka, o‘zim qurdiryapman, 100% kafolat, 1 yilda bitadi, 50%ini hozir bersangiz kvadratini 5 mln dan beraman» deya chiroyli qizlar orqali qahva quydirib shartnoma uzatmoqda.',
    offerPrice: 'Kvadratura: 70 m² | Taklif narxi: 350,000,000 UZS ($28,000)',
    suspectDetails: [
      'Hashamatli Tahoe avtomobili (aslida sutkalik prokatga olingan)',
      'Ofisdagi chiroyli taqdimot va shirin so‘zlar',
      'Kompaniya nomi o‘tgan oyda ro‘yxatdan o‘tgan',
      'Hokimlikning yer ajratish va qurilish ruxsatnomasi ko‘rsatilmayapti',
    ],
    choices: [
      {
        text: '«Bolasining puli ko‘p ekan, mashinalari ham zo‘r, aldab nima qiladi? 50% boshlang‘ich to‘lovni beramiz!»',
        isCorrect: false,
        consequenceTitle: 'QOPQONGA TUSHINGIZ! Firibgarlik qurboni bo‘ldingiz.',
        consequenceExplanation:
          'Bu yigit haqiqiy quruvchi emas, balki odamlarni jalb qilish uchun yollangan brendfeys (ambassador) edi! 8 oydan keyin prokat mashinasini topshirib g‘oyib bo‘ldi, orqasidagi haqiqiy firibgarlar esa yerni noqonuniy egallagani uchun shahar hokimligi kotlovanni to‘xtatib qo‘ydi.',
        financialImpact: -28000,
        domlaAdvice:
          '«Odamning mashinasiga emas, firmaning qonuniy hujjatlariga qarang! Brendfeyslar shunchaki niqob. Sudda esa blogerning videosi emas, faqat litsenziya va muhrli qog‘oz o‘tadi.»',
      },
      {
        text: '«Mashinangizga emas, hujjatga qaraymiz. Soliq bazasidan firmaning ustav kapitali, qachon ochilgani va Shahar Arxitekturasining dom qurishga ruxsatnomasini ko‘rsating!»',
        isCorrect: true,
        consequenceTitle: 'AQLIY G‘ALABA! Siz $28,000 pulingizni saqlab qoldingiz.',
        consequenceExplanation:
          'Tekshiruv natijasida firma 40 kun oldin 10 mln so‘m sarmoya bilan ochilgani, yer esa aslida bolalar bog‘chasi uchun ajratilgani va dom qurishga umuman ruxsati yo‘qligi fosh bo‘ldi! Siz shartnoma tuzishdan bosh tortdingiz.',
        financialImpact: 28000,
        domlaAdvice:
          '«Baraka toping! Har qanday qurilishni Davlat reyestridan, soliq va arxitektura bazasidan tekshirgan odam aslo yutqazmaydi.»',
      },
    ],
  },
  {
    id: 'case-2',
    title: 'Family Park & Geofizika: Shubhali Arzon Dom',
    location: 'Samarqand, Family Park / Geofizika atrofi',
    tag: 'Novostroyka',
    characterName: 'Murod Makler',
    characterRole: 'Rieltorlik agentligi vakili',
    characterAvatar: '🏢',
    situation:
      'Bozorda domlarning kvadrati 8–9 mln so‘m bo‘lib turgan bir paytda, makler sizga Family Park atrofidagi yangi domni 5.2 mln so‘mdan taklif qildi. «Aka, shoshiling, quruvchiga srochno pul kerak bo‘lib tannarxida sotyapti, bunaqa narx Samarqandda boshqa yo‘q!» deya shoshiltirmoqda.',
    offerPrice: 'Kvadratura: 80 m² | 416,000,000 UZS (Bozordan 220 mln arzon)',
    suspectDetails: [
      'Bozor narxidan 35-40% arzon taklif',
      'Quruvchi nega bunchalik arzon sotayotganiga aniq javob yo‘q',
      'Hududda gaz quvurlari bor-yo‘qligi noaniq',
    ],
    choices: [
      {
        text: '«Bunaqa narx boshqa chiqmaydi! Darhol shartnoma qilib pulni to‘laymiz!»',
        isCorrect: false,
        consequenceTitle: 'SOVUQ TUZOG‘I! Oyiga 2.5–3 mln so‘mlik svet balosi.',
        consequenceExplanation:
          'Ushbu dom yangi qarorga binoan gazsizlantirilgan (gaz berilmaydigan) zonada qurilgan bo‘lib chiqdi! Isitish faqat elektr (elektr ten/konditsioner) orqali ekan. Qishda xonadonni isitish gazdan 3-4 baravar qimmatga tushdi va svet har kuni o‘chib xonadon muzlab qoldi. Shu sababli odamlar uylarini sotolmay arzonlashtirgan ekan.',
        financialImpact: -22000,
        domlaAdvice:
          '«Arzon narsaning bir illati bo‘ladi! Dom olayotganda gazga texnik sharti (TU) bormi-yo‘qmi, qanday isitilishini oldindan tekshiring. Aks holda qishda bir oylik maoshingiz svet puliga ketadi.»',
      },
      {
        text: '«Shartnomada gazga ruxsati bormi? Isitish qanday bo‘ladi: gazli avtonom qozonxonami yoki faqat svetmi? Texnik shart hujjatini ko‘rsating!»',
        isCorrect: true,
        consequenceTitle: 'TO‘G‘RI QAROR! Qishki muzlash va qarzdan qutuldingiz.',
        consequenceExplanation:
          'Hujjatlarni tekshirib, dom faqat elektr bilan isitilishini va qishda har oy 3 mln so‘m elektr sarfi bo‘lishini oldindan hisoblab chiqdingiz. Siz bu shubhali loyihaga aralashmasdan, markaziy kommunikatsiyasi to‘liq domni tanladingiz.',
        financialImpact: 22000,
        domlaAdvice:
          '«Aqlingizga balli! Hujjatdagi har bir kommunikatsiya bandini o‘qib olgan xaridor qishda issiqda, ko‘ngli to‘q yashaydi.»',
      },
    ],
  },
  {
    id: 'case-3',
    title: 'Gilyondagi Hovli Ichiga Qurilgan Dom & Tilxat Balosi',
    location: 'Samarqand shahri, Gilyon mahallasi',
    tag: 'Novostroyka',
    characterName: 'Qo‘chqor aka',
    characterRole: 'O‘z hovlisiga dom qurgan shaxs',
    characterAvatar: '🧱',
    situation:
      'Katta hovli ichiga 6 qavatli g‘ishtin dom qurilgan. Sotuvchi: «Ukam, o‘zim uchun mustahkam qilib qurganman. Kadastri hali chiqmadi, lekin notariusdan tilxat (tirxat) qilib beraman, 6 oydan keyin kadastri chiqsa o‘z nomingizga o‘tkazib olasiz, unga qadar bemalol yashayvering» demoqda.',
    offerPrice: 'Kvadratura: 65 m² | 280,000,000 UZS (Juda arzon)',
    suspectDetails: [
      'Yakka tartibdagi hovli (IZhS) yeriga 6 qavatli bino noqonuniy tushirilgan',
      'Kadastr pasporti umuman mavjud emas',
      'Faqat tilxat yoki tilxat-notarial kafillik taklif qilinmoqda',
    ],
    choices: [
      {
        text: '«Notarius guvohligida tilxat olyapmiz-ku, narxi ham ancha arzon ekan, olaveramiz!»',
        isCorrect: false,
        consequenceTitle: 'UMRBOD ASIRLIK! O‘z uyingizni sota olmaysiz.',
        consequenceExplanation:
          'Hovli ichiga qurilgan noqonuniy domga shahar arxitekturasi hech qachon alohida kadastr bermadi. Bu yer yuridik jihatdan «umumiy hovli» (obshiy dvor) bo‘lib qoldi. 3 yildan keyin uyingizni sotmoqchi bo‘lganingizda pod’yezddagi 24 ta qo‘shnining yozma roziligi talab qilindi — bitta qo‘shni imzo qo‘ymagani uchun uyingizni hech kimga sota olmaysiz!',
        financialImpact: -25000,
        domlaAdvice:
          '«Tilxat bilan hovli ichiga qurilgan domdan qoching! Bitta qo‘shni arazlab imzo qo‘ymasa, o‘z uyingizga o‘zingiz xo‘jayin bo‘lolmay qolasiz. Sudda tilxat emas, Davlat kadastri gapiradi.»',
      },
      {
        text: '«Alohida davlat kadastr pasporti chiqmagan va ko‘p kvartirali bino maqomi berilmagan uyga bir so‘m ham bermayman!»',
        isCorrect: true,
        consequenceTitle: 'DONO QADAM! Noqonuniy buzilishdan asrandingiz.',
        consequenceExplanation:
          'Oradan 5 oy o‘tib, Shahar Qurilish Nazorati inspeksiyasi ushbu binoning ruxsatsiz qurilgan yuqori 3 qavatini majburiy buzish haqida sud qarori chiqardi. Sizning pulingiz esa o‘zingizda omon qoldi!',
        financialImpact: 25000,
        domlaAdvice:
          '«Aynan shunday! Noqonuniy qurilish qanchalik chiroyli ko‘rinmasin, uning poydevori qog‘ozda nolga tengdir.»',
      },
    ],
  },
  {
    id: 'case-4',
    title: '«Hadya» (Doreniye) Qilib O‘tkazib Beraman',
    location: 'Samarqand shahri, So‘g‘diyona massivi',
    tag: 'Shartnoma va Huquq',
    characterName: 'Abror Sotuvchi',
    characterRole: 'Kvartira egasi',
    characterAvatar: '📜',
    situation:
      'Tayyor ikkilamchi (vtorichka) uyni ko‘rdingiz, sizga yoqdi. Lekin notariusga borish oldidan sotuvchi: «Aka, oldi-sotdi qilsak 12% foyda solig‘i to‘lashim kerak bo‘ladi. Keling, sizga Hadya (Doreniye) qilib rasmiylashtiraylik, sizga ham tekinga tushadi, menga ham soliq chiqmaydi» deb turib oldi.',
    offerPrice: 'Kvartira narxi: $42,000 | Oldi-sotdi o‘rniga Hadya taklifi',
    suspectDetails: [
      'Begona odam sizga qimmatbaho mulkni "hadya" qilmoqchi',
      '12% soliqdan qochish bahonasi',
      'Uyda boshqa qarindoshlar ham propiskada bo‘lgani shubhasi',
    ],
    choices: [
      {
        text: '«Xarajat kamayadi, soliq ham to‘lamaymiz, menga nima farqi bor, hadya qilib o‘tkazaversin!»',
        isCorrect: false,
        consequenceTitle: 'FOJIAVIY YO‘QOTISH! Uydan bir so‘msiz haydaldingiz.',
        consequenceExplanation:
          '7 yildan keyin sotuvchining chet elda yurgan akasi qaytib keldi! Ma’lum bo‘lishicha, u ushbu uyning teng huquqli merosxo‘ri bo‘lgan. Sotuvchi akasining roziligini ololmagani uchun oldi-sotdi qilolmasdan sizga hadya qilib yuborgan ekan. Sud hadya shartnomasini bekor qildi va uyni qonuniy egasiga qaytardi. Siz begona bo‘lganingiz uchun hech qanday kompensatsiyasiz ko‘chada qoldingiz!',
        financialImpact: -42000,
        domlaAdvice:
          '«Begona odamdan aslo Hadya shartnomasi bilan uy olmang! Hadya — bu ko‘pincha boshqa merosxo‘rlar da’vosini yashirish tuzog‘idir. Faqat to‘liq rasmiy Oldi-sotdi va barcha da’vogarlarning notarial rad xati bo‘lishi shart.»',
      },
      {
        text: '«Hech qanday hadya bo‘lmaydi! Faqat to‘liq summasi ko‘rsatilgan Oldi-Sotdi shartnomasi tuzamiz va barcha merosxo‘rlarning roziligini tekshiramiz!»',
        isCorrect: true,
        consequenceTitle: 'YURIDIK G‘ALABA! Siz mulkingizni 100% himoyaladingiz.',
        consequenceExplanation:
          'Siz talab qilganingizdan so‘ng, sotuvchi dovdirab qoldi va boshqa qarindoshlarining roziligini ololmasligini tan oldi. Siz xavfli kelishuvdan vaqtida chiqib ketdingiz.',
        financialImpact: 42000,
        domlaAdvice:
          '«Ofarin! Qonuniy yo‘l — eng arzon yo‘ldir. Soliqdan tejayman deb butun uydan ayrilib qolganlar qancha!»',
      },
    ],
  },
  {
    id: 'case-5',
    title: '6 Sotix deb Ko‘rsatilgan 4 Sotix Hovli (Qizil Chiziq)',
    location: 'Samarqand tumani, Katta trassa chekkasi',
    tag: 'Hovli va Yer',
    characterName: 'Eshonqul oqsoqol',
    characterRole: 'Hovli sotuvchisi',
    characterAvatar: '🏡',
    situation:
      'Trassa yoqasida joylashgan chiroyli hovlini ko‘rdingiz. Sotuvchi devorlarni ko‘rsatib: «Bolam, mana shlankoblok devorni ko‘ryapsanmi, boshidan oxirigacha rosa 6 sotix joy. Narxi juda qulay, yerning o‘zi qimmat turadi» deb dalada metr bilan o‘lchab ko‘rsatmoqda.',
    offerPrice: 'Yer: 6 sotix deb ko‘rsatilmoqda | Narxi: $36,000',
    suspectDetails: [
      'Devor trassa yo‘liga juda yaqin qurilgan',
      'Kadastr pasportidagi xarita bilan devor joylashuvi solishtirilmagan',
      'Ko‘chani kengaytirish bo‘yicha shahar bosh rejasi tekshirilmagan',
    ],
    choices: [
      {
        text: '«Metr bilan o‘lchadik, haqiqatan 6 sotix ekan. Devor mustahkam, pulini sanaymiz!»',
        isCorrect: false,
        consequenceTitle: 'QIZIL CHIZIQ BALOSI! 2 sotix yeringiz tekinga buzildi.',
        consequenceExplanation:
          'Siz sotib olgan 6 sotixning 2 sotixi qizil chiziq (davlat zaxira yo‘l zonasi)da bo‘lib chiqdi! Aslida kadastrda faqat 4 sotixga egalik huquqi bo‘lgan, sotuvchi esa ko‘cha yerini noqonuniy devor bilan o‘rab olgan ekan. 2 yildan keyin shahar trassani kengaytirishda 2 sotix yeringiz va yangi qurgan do‘koningizni bir so‘m tovon pulisiz buldozer bilan buzib tashladi!',
        financialImpact: -18000,
        domlaAdvice:
          '«Kadastr maydoni bilan ko‘chadagi panjara bir xil emas! Devorga emas, Kadastr xaritasidagi qizil chiziqqa qarang. Davlat yeriga qurilgan devor ertaga bir so‘m kompensatsiyasiz buziladi.»',
      },
      {
        text: '«Devorga ishonmayman! Kadastr pasportini ochib, Davlat geodezik koordinatasini va shahar arxitekturasining qizil chiziq chegarasini solishtiramiz!»',
        isCorrect: true,
        consequenceTitle: 'USTALIK BILAN TEKSHIRUV! $18,000 yutdingiz.',
        consequenceExplanation:
          'Kadastrni tekshirganingizda qonuniy yer 4 sotix ekani, 2 sotixi esa qizil chiziqda ekani darhol aniqlandi. Siz sotuvchini fosh qilib, narxni faqat 4 sotix bo‘yicha to‘ladingiz va xavfli zonaga bino qurmadingiz.',
        financialImpact: 18000,
        domlaAdvice:
          '«Haqiqiy bilim egasining ishi! Erkak kishining so‘zi emas, davlat kadastrining muhri va koordinatasi gapiradi.»',
      },
    ],
  },
];

export const ScenarioGame: React.FC = () => {
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);
  const [selectedChoice, setSelectedChoice] = useState<ScenarioChoice | null>(null);
  const [totalSaved, setTotalSaved] = useState<number>(0);
  const [totalLost, setTotalLost] = useState<number>(0);
  const [completedCases, setCompletedCases] = useState<string[]>([]);

  const currentCase = SCENARIO_CASES[currentCaseIndex];

  const handleSelectChoice = (choice: ScenarioChoice) => {
    setSelectedChoice(choice);
    if (choice.isCorrect) {
      setTotalSaved((prev) => prev + choice.financialImpact);
      triggerConfetti();
    } else {
      setTotalLost((prev) => prev + Math.abs(choice.financialImpact));
    }
    if (!completedCases.includes(currentCase.id)) {
      setCompletedCases((prev) => [...prev, currentCase.id]);
    }
  };

  const handleNextCase = () => {
    setSelectedChoice(null);
    if (currentCaseIndex < SCENARIO_CASES.length - 1) {
      setCurrentCaseIndex((prev) => prev + 1);
    } else {
      setCurrentCaseIndex(0);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Ticker: Money Saved / Lost in Simulator */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              Keyslar Jarayoni
            </span>
            <div className="text-xl font-extrabold text-white">
              {currentCaseIndex + 1} / {SCENARIO_CASES.length}
            </div>
          </div>
          <span className="text-3xl">{currentCase.characterAvatar}</span>
        </div>

        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Saqlab Qolingan Mablag‘
            </span>
            <div className="text-xl font-extrabold text-emerald-400 font-mono">
              +${totalSaved.toLocaleString()}
            </div>
          </div>
          <span className="text-2xl">💰</span>
        </div>

        <div className="bg-rose-950/40 border border-rose-500/30 rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              Xatolar Sabab Yo‘qotish
            </span>
            <div className="text-xl font-extrabold text-rose-400 font-mono">
              -${totalLost.toLocaleString()}
            </div>
          </div>
          <span className="text-2xl">⚠️</span>
        </div>
      </div>

      {/* Main Detective Case Box */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl space-y-6">
        {/* Header of the Case */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-xs font-bold">
                {currentCase.tag}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {currentCase.location}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
              {currentCase.title}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {SCENARIO_CASES.map((c, i) => (
              <button
                key={c.id}
                onClick={() => {
                  setCurrentCaseIndex(i);
                  setSelectedChoice(null);
                }}
                className={`w-8 h-8 rounded-xl text-xs font-bold transition flex items-center justify-center border ${
                  i === currentCaseIndex
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30'
                    : completedCases.includes(c.id)
                    ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Suspect / Character Dialogue Box */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-3xl shrink-0">
            {currentCase.characterAvatar}
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-white text-sm">
                {currentCase.characterName}{' '}
                <span className="text-xs font-normal text-slate-400">({currentCase.characterRole})</span>
              </span>
              <span className="text-xs text-amber-400 font-mono font-bold bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                {currentCase.offerPrice}
              </span>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed italic">
              «{currentCase.situation}»
            </p>
          </div>
        </div>

        {/* Suspect Red Flag Hints */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Vaziyatdagi Shubhali Belgilar (Inspeksiya signallari):
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {currentCase.suspectDetails.map((detail, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-300 flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Choices Area */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider block">
            Qanday Qaror Qabul Qilasiz?
          </span>

          <div className="grid grid-cols-1 gap-3">
            {currentCase.choices.map((choice, idx) => (
              <button
                key={idx}
                disabled={selectedChoice !== null}
                onClick={() => handleSelectChoice(choice)}
                className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition leading-relaxed flex items-start gap-3 ${
                  selectedChoice === choice
                    ? choice.isCorrect
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : 'bg-rose-950/70 border-rose-500 text-rose-200'
                    : 'bg-slate-950/70 border-slate-800 hover:border-indigo-500/60 text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 mt-0.5">
                  {idx === 0 ? 'A' : 'B'}
                </span>
                <span className="flex-1">{choice.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Consequence Modal / Reveal Box */}
        {selectedChoice && (
          <div
            className={`p-6 rounded-2xl border space-y-4 animate-fadeIn ${
              selectedChoice.isCorrect
                ? 'bg-emerald-950/50 border-emerald-500/40'
                : 'bg-rose-950/50 border-rose-500/40'
            }`}
          >
            <div className="flex items-center gap-2">
              {selectedChoice.isCorrect ? (
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              ) : (
                <ShieldAlert className="w-6 h-6 text-rose-400" />
              )}
              <h4
                className={`text-lg font-black tracking-tight ${
                  selectedChoice.isCorrect ? 'text-emerald-300' : 'text-rose-300'
                }`}
              >
                {selectedChoice.consequenceTitle}
              </h4>
            </div>

            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
              {selectedChoice.consequenceExplanation}
            </p>

            {/* Domla's Real-Life Lesson Quote */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Domlaning Oltin Maslahati:
              </span>
              <p className="text-xs md:text-sm text-amber-200/90 font-medium italic leading-relaxed">
                {selectedChoice.domlaAdvice}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextCase}
                className="py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-indigo-600/30"
              >
                <span>Keyingi Hayotiy Keys</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
