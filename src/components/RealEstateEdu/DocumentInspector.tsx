import React, { useState } from 'react';
import {
  FileSearch,
  AlertTriangle,
  ZoomIn,
  Sparkles,
  Info
} from 'lucide-react';
import type { InspectorDocument, DocumentHotspot } from '../../types/realEstate';

export const INSPECTION_DOCS: InspectorDocument[] = [
  {
    id: 'doc-kadastr',
    title: 'Yer va Hovli Kadastr Pasporti',
    subtitle: 'Hovli sotib olishdan oldin tekshiriladigan Davlat Kadastr Geodezik Hujjati',
    documentType: 'Kadastr Pasporti',
    contentSnippet: `O'ZBEKISTON RESPUBLIKASI DAVLAT KADASTR AGENTLIGI
KADASTR PASPORTI VA YER UChASTKASI GEODEZIK XARITASI
Manzil: Samarqand viloyati, Samarqand tumani, Trassa yoqasi
Mulkdor: Eshonqulov X.
Yer toifasi: Aholi punktlari yerlari (Yakka tartibdagi uy-joy / IZhS)
Maydoni: 400.00 kv.m (4.00 sotix)  <-- [DIQQAT: Devor 6 sotix qilib o'ralgan!]
Qizil chiziq: 200 kv.m maydon shahar transport magistralining qizil chiziq zaxirasida!
Cheklovlar: Qizil chiziq zonasida har qanday kapital bino qurish qat'iyan man etiladi.
Taqiq (Arest): Yo'q.`,
    hotspots: [
      {
        id: 'hs-1',
        xPercent: 78,
        yPercent: 38,
        title: 'Maydon Disbalansi (4 sotix vs 6 sotix)',
        isRedFlag: true,
        explanation:
          'Sotuvchi sizga "hovlim 6 sotix" deb devorni ko‘rsatmoqda, lekin rasmiy kadastr pasportida faqat 400 kv.m (4 sotix) yozilgan! Qolgan 2 sotix noqonuniy o‘zboshimchalik bilan o‘ralgan.',
        domlaRule:
          '«Kadastr maydoni bilan ko‘chadagi panjara bir xil emas! Siz 6 sotix deb pul to‘laysiz, lekin qonun bo‘yicha faqat 4 sotixga egalik qilasiz.»',
      },
      {
        id: 'hs-2',
        xPercent: 75,
        yPercent: 54,
        title: 'Qizil Chiziq (Qurilish taqiqlangan zona)',
        isRedFlag: true,
        explanation:
          '200 kv.m yer davlatning "Qizil chizig‘i" (kelgusida yo‘lni kengaytirish zaxirasi)da joylashgan. Davlatga yer kerak bo‘lsa, u yerdagi devor va imoratlarni bir so‘m kompensatsiya to‘lamasdan buzib tashlaydi!',
        domlaRule:
          '«Qizil chiziqda turgan yer — davlatning mulki. U yerga kiritilgan bir so‘m ham pulingiz ertaga havoga uchadi.»',
      },
      {
        id: 'hs-3',
        xPercent: 65,
        yPercent: 26,
        title: 'Yer Maqomi: Yakka tartibdagi uy-joy (IZhS)',
        isRedFlag: false,
        explanation:
          'Yer yakka tartibdagi hovli uchun ajratilgan. Agar bu yerda ko‘p qavatli dom qurilgan bo‘lsa — bu 100% noqonuniy qurilish hisoblanadi!',
        domlaRule:
          '«Hovli yeriga 5-6 qavatli dom qurib tilxat bilan sotayotganlarga aslo ishonmang. IZhS yerida ko‘p xonadonli dom bo‘lishi mumkin emas.»',
      },
    ],
  },
  {
    id: 'doc-shartnoma',
    title: 'Kotlovan Uy Oldi-Sotdi Shartnomasi',
    subtitle: 'Quruvchi kompaniya bilan imzolanadigan birlamchi shartnoma tekshiruvi',
    documentType: 'Kotlovan Shartnomasi',
    contentSnippet: `QURILISHDA ULUSH KIKRITISH BO'YICHA NAMUNAVIY SHARTNOMA #482
Quruvchi: MChJ "Modern Mega Stroy Samarkand"
Xaridor: Ulushdor fuqaro
3.1-band: Xonadon umumiy loyiha maydoni: 70.00 kv.m.
3.2-band: Xonadon to'liq elektr tarmog'i orqali isitiladi. Gaz ulanishi nazarda tutilmagan.
5.4-band: Qurilish yakunlangach, xonadon maydoni o'zgarishi (kam yoki ko'p chiqishi) bo'yicha pul qaytarilmaydi.
7.1-band: Qurilish muddati kechikkan taqdirda quruvchi jarima to'lamaydi.`,
    hotspots: [
      {
        id: 'hs-4',
        xPercent: 82,
        yPercent: 36,
        title: 'Gazsizlantirilgan Bino (Faqat Elektr)',
        isRedFlag: true,
        explanation:
          '3.2-bandda domga gaz kiritilmasligi va faqat elektr bilan isitilishi ko‘rsatilgan! Bu qishda oyiga 2.5–3 mln so‘mlik svet xarajatini keltirib chiqaradi.',
        domlaRule:
          '«Family Park va Geofizika atroflarida domlar nega arzonlab ketdi? Chunki gaz yo‘q! Shartnomada isitish turi qanday ko‘rsatilganini qidirib toping.»',
      },
      {
        id: 'hs-5',
        xPercent: 80,
        yPercent: 50,
        title: 'Kvadratura Hiylasi (Pul Qaytarilmaslik Bandi)',
        isRedFlag: true,
        explanation:
          '5.4-bandda xonadon 70 m² o‘rniga 66 m² (4 kvadrat kam) chiqsa ham quruvchi pulni qaytarmasligi yozilgan! Siz 4 m² uchun o‘rtacha 30–40 mln so‘m ortiqcha to‘lab aldanib qolasiz.',
        domlaRule:
          '«Kotlovandan uy olayotganda shartnomaga yozdiring: Kvadrat kam chiqsa, quruvchi pulini qaytaradi; ko‘p chiqsa, qanday hisoblanadi!»',
      },
      {
        id: 'hs-6',
        xPercent: 76,
        yPercent: 66,
        title: 'Bir Tomonlama Shartlar (Kechikish Jarimasi Yo‘qligi)',
        isRedFlag: true,
        explanation:
          'Quruvchi domni 2–3 yilga kechiktirsa ham hech qanday moddiy javobgarlik va penya ko‘zda tutilmagan.',
        domlaRule:
          '«Shartnoma ikki tomonlama adolatli bo‘lishi kerak. Siz to‘lovni kechiktirsangiz jarima solinadi-yu, u domni kechiktirsa nima uchun javob bermasligi kerak?»',
      },
    ],
  },
];

export const DocumentInspector: React.FC = () => {
  const [selectedDocId, setSelectedDocId] = useState<string>('doc-kadastr');
  const [activeHotspot, setActiveHotspot] = useState<DocumentHotspot | null>(null);

  const currentDoc = INSPECTION_DOCS.find((d) => d.id === selectedDocId) || INSPECTION_DOCS[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-cyan-400" />
            Interaktiv Hujjat Ekspertizasi (Qog‘ozlar Sirlari)
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Hujjat matnidagi belgilangan nuqtalarni (hotspot) bosing va yashirin tuzoqlarni fosh eting!
          </p>
        </div>

        <div className="flex gap-2">
          {INSPECTION_DOCS.map((doc) => (
            <button
              key={doc.id}
              onClick={() => {
                setSelectedDocId(doc.id);
                setActiveHotspot(null);
              }}
              className={`py-2 px-4 rounded-xl text-xs font-bold transition border ${
                selectedDocId === doc.id
                  ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              {doc.documentType}
            </button>
          ))}
        </div>
      </div>

      {/* Main Document Inspection Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Document Visual Scanner (8 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden font-mono text-xs leading-relaxed shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="font-bold text-cyan-400">{currentDoc.title}</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                Rasmiy Nusxa (Ekspertiza)
              </span>
            </div>

            {/* Document Text Snippet with Interactive Hotspot Buttons */}
            <div className="mt-4 whitespace-pre-wrap text-slate-300 text-xs sm:text-sm bg-slate-900/50 p-5 rounded-2xl border border-slate-800/80">
              {currentDoc.contentSnippet}
            </div>

            {/* Hotspot Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2">
              <span className="text-xs font-bold text-white block uppercase tracking-wider">
                Hujjatdagi Shubhali Bandlarni Tekshirish:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentDoc.hotspots.map((hs, i) => (
                  <button
                    key={hs.id}
                    onClick={() => setActiveHotspot(hs)}
                    className={`py-2 px-3.5 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                      activeHotspot?.id === hs.id
                        ? 'bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/30'
                        : hs.isRedFlag
                        ? 'bg-rose-950/40 border-rose-500/40 text-rose-300 hover:bg-rose-900/40'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Band #{i + 1}: {hs.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Explanation / Domla Legal Advice (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-md h-full flex flex-col justify-between">
            {activeHotspot ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-2">
                  {activeHotspot.isRedFlag ? (
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                  ) : (
                    <Info className="w-5 h-5 text-cyan-400 shrink-0" />
                  )}
                  <h4 className="text-base font-extrabold text-white">
                    {activeHotspot.title}
                  </h4>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <span className="text-xs font-bold text-rose-400 block mb-1">
                    Yuridik Xatar (Xavf darajasi: Yuqori):
                  </span>
                  {activeHotspot.explanation}
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200 leading-relaxed space-y-1.5">
                  <span className="font-extrabold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                    <Sparkles className="w-3.5 h-3.5" />
                    Domlaning Qat'iy Qoidasi:
                  </span>
                  <p className="italic font-medium">{activeHotspot.domlaRule}</p>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center space-y-3 text-slate-400">
                <FileSearch className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-sm font-bold text-white">Bandni Tanlang</h4>
                <p className="text-xs max-w-xs mx-auto">
                  Chap tomondagi hujjat matnidan qiziqtirgan bandni bosing. Yuridik xulosa va Domlaning qoidalari shu yerda aks etadi.
                </p>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/80 text-[11px] text-slate-400 mt-6">
              💡 <strong>Eslatma:</strong> «Sudda faqat qog‘oz va rasmiy davlat bazasidagi ma’lumot gapiradi. Sotuvchining og‘zaki va’dalari nolga teng!»
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
