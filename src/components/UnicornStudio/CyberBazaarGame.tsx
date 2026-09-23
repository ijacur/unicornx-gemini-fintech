import React, { useState } from 'react';
import {
  Gamepad2,
  Coins,
  Shield,
  ShoppingBag,
  Send,
  Package
} from 'lucide-react';
import { geminiService, type BazaarNpc, type BazaarTradeResponse } from '../../services/geminiService';
import { triggerConfetti } from '../../lib/utils';

const BAZAAR_NPCS: BazaarNpc[] = [
  {
    id: 'akram',
    name: 'Akram aka',
    role: 'Chorsu Kiber-Savdogar',
    avatar: '👨‍💼',
    personality: 'Tajribali Chorsu savdogari, savdolashishni yaxshi ko\'radi, hurmat qilgan xaridorga chegirma beradi.',
    inventory: [
      { name: 'Kvant Foton Protsessori', basePrice: 12000, description: 'Malika bozoridan keltirilgan yuqori quvvatli chip' },
      { name: 'Samarqand Sintetik Za\'faroni', basePrice: 8500, description: 'Cyber-shifoxonalar uchun nodir xomashyo' },
      { name: "Orolbo'yi Litiy Batareyasi", basePrice: 15000, description: 'Avtonom dronlar uchun 72 soatlik energiya' },
    ],
  },
  {
    id: 'sora',
    name: 'Sora 2.0',
    role: 'TBC-2050 Kiber-Bankir',
    avatar: '🤖',
    personality: 'Yuqori intellektli AI moliyaviy agent, aniq hisob-kitob va likvidlikni xush ko\'radi.',
    inventory: [
      { name: 'TBC Kripto-Obligatsiyasi', basePrice: 20000, description: 'Kunlik 1.2% kafolatlangan daromad keltiruvchi token' },
      { name: 'Sug\'urta Smart-Kontrakti', basePrice: 6000, description: 'Kiber-hujumlardan 100% himoya kafolati' },
    ],
  },
  {
    id: 'rustam',
    name: 'Mayor Rustam',
    role: 'Toshkent Kiber-Bojxonachi',
    avatar: '👮‍♂️',
    personality: 'Qat\'iy tartib tarafdori, sertifikatsiz yuklarni o\'tkazmaydi, ammo yuridik bilim egalarini qadrlaydi.',
    inventory: [
      { name: 'Ekspress Tranzit Ruxsatnomasi', basePrice: 9500, description: 'Barcha nazorat punktlaridan navbatsiz o\'tish kodi' },
      { name: 'Bojxona Shifrlash Kaliti', basePrice: 18000, description: 'Konteynerlarni tekshiruvsiz muhrlash tizimi' },
    ],
  },
];

export const CyberBazaarGame: React.FC = () => {
  const [selectedNpc, setSelectedNpc] = useState<BazaarNpc>(BAZAAR_NPCS[0]);
  const [selectedItem, setSelectedItem] = useState(BAZAAR_NPCS[0].inventory[0]);
  const [playerSom, setPlayerSom] = useState<number>(45000);
  const [playerRep, setPlayerRep] = useState<number>(75);
  const [playerInventory, setPlayerInventory] = useState<string[]>(['Boshlang\'ich Kiber-ID']);
  const [offerPrice, setOfferPrice] = useState<number>(10000);
  const [playerNote, setPlayerNote] = useState<string>('Akram aka, ICT Week hurmati ozgina tushib bering!');
  const [loading, setLoading] = useState<boolean>(false);
  const [tradeLogs, setTradeLogs] = useState<
    { speaker: string; text: string; success?: boolean; time: string }[]
  >([
    {
      speaker: 'Akram aka',
      text: "Xush kelibsiz Chorsu 2050 ga, uka! Eng sara kvant tovarlari faqat menda. Savdolashamizmi?",
      time: '12:00',
    },
  ]);

  const handleNpcChange = (npc: BazaarNpc) => {
    setSelectedNpc(npc);
    setSelectedItem(npc.inventory[0]);
    setOfferPrice(Math.round(npc.inventory[0].basePrice * 0.85));
    setTradeLogs((prev) => [
      ...prev,
      {
        speaker: npc.name,
        text: `Salom! Men ${npc.name} (${npc.role}). Qanday xizmat bilan keldingiz?`,
        time: new Date().toLocaleTimeString().slice(0, 5),
      },
    ]);
  };

  const handleTrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (offerPrice <= 0 || loading) return;

    if (offerPrice > playerSom) {
      alert("Hisobingizda buncha Cyber-Som yo'q!");
      return;
    }

    setLoading(true);

    const logEntry = `Siz [${selectedItem.name}] uchun ${offerPrice.toLocaleString()} Cyber-Som taklif qildingiz: "${playerNote}"`;
    setTradeLogs((prev) => [
      ...prev,
      { speaker: 'Siz', text: logEntry, time: new Date().toLocaleTimeString().slice(0, 5) },
    ]);

    try {
      const historyStr = tradeLogs.map((l) => `${l.speaker}: ${l.text}`).join('\n');
      const res: BazaarTradeResponse = await geminiService.negotiateTrade(
        selectedNpc,
        offerPrice,
        selectedItem,
        playerRep,
        historyStr,
        'uz'
      );

      // Handle trade outcome
      if (res.tradeAccepted) {
        setPlayerSom((prev) => prev - offerPrice);
        setPlayerInventory((prev) => [...prev, selectedItem.name]);
        setPlayerRep((prev) => Math.min(100, prev + (res.reputationChange || 2)));
        triggerConfetti();
      } else {
        setPlayerRep((prev) => Math.max(10, prev + (res.reputationChange || -1)));
      }

      setTradeLogs((prev) => [
        ...prev,
        {
          speaker: selectedNpc.name,
          text: res.npcDialogue,
          success: res.tradeAccepted,
          time: new Date().toLocaleTimeString().slice(0, 5),
        },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-pink-950 p-6 md:p-8 border border-purple-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Gamepad2 className="w-3.5 h-3.5" />
              Gemini Procedural NPC Engine • Tashkent 2050
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Cyber-Bazaar 2050: Buyuk Ipak Yo'li
            </h2>
            <p className="text-slate-300 mt-2 max-w-2xl text-sm md:text-base">
              Har bir xarakter — alohida fikrlaydigan Gemini agenti. Savdolashing, kvant tovarlarini arzonroqqa sotib oling, obro'yingizni oshiring va Toshkentning eng qudratli savdo magnatiga aylaning!
            </p>
          </div>

          {/* Player Stats */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <Coins className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">Hisobingiz</span>
                <span className="text-sm font-extrabold text-amber-400">
                  {playerSom.toLocaleString()} CS
                </span>
              </div>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <Shield className="w-5 h-5 text-purple-400" />
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">Obro' (Rep)</span>
                <span className="text-sm font-extrabold text-purple-400">{playerRep} / 100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: NPC Selection & Items */}
        <div className="lg:col-span-5 space-y-6">
          {/* NPC Selector */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Bozordagi Qahramonlar
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {BAZAAR_NPCS.map((npc) => (
                <button
                  key={npc.id}
                  onClick={() => handleNpcChange(npc)}
                  className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1.5 ${
                    selectedNpc.id === npc.id
                      ? 'bg-purple-600/20 border-purple-500 shadow-lg shadow-purple-500/20'
                      : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-2xl">{npc.avatar}</span>
                  <span className="text-xs font-bold text-white truncate max-w-full block">
                    {npc.name}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate max-w-full block">
                    {npc.role.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected NPC Info */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-purple-400">{selectedNpc.name} ({selectedNpc.role})</span>
              <p className="text-slate-400 leading-relaxed">{selectedNpc.personality}</p>
            </div>
          </div>

          {/* Items on Sale */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>{selectedNpc.name}ning Rastasi</span>
              <ShoppingBag className="w-4 h-4 text-purple-400" />
            </h3>
            <div className="space-y-3">
              {selectedNpc.inventory.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedItem(item);
                    setOfferPrice(Math.round(item.basePrice * 0.85));
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    selectedItem.name === item.name
                      ? 'bg-purple-500/15 border-purple-500'
                      : 'bg-slate-800/30 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold text-white text-xs block">{item.name}</span>
                    <span className="text-[11px] text-slate-400 block">{item.description}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-400 block">
                      {item.basePrice.toLocaleString()} CS
                    </span>
                    <span className="text-[10px] text-slate-500">Asl narxi</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Pocket */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 backdrop-blur-sm flex items-center gap-3">
            <Package className="w-5 h-5 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-white block">Sizning Inventaringiz:</span>
              <span className="text-slate-400">{playerInventory.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Negotiation Arena & Chat */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-md flex flex-col h-[560px]">
            {/* Dialogue Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedNpc.avatar}</span>
                <div>
                  <h3 className="font-bold text-white text-base">{selectedNpc.name} bilan Savdo</h3>
                  <span className="text-xs text-slate-400">
                    Tanlangan tovar: <strong className="text-purple-300">{selectedItem.name}</strong>
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold">
                Toshkent 2050 AI Game
              </span>
            </div>

            {/* Scrollable Dialogue History */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4 scrollbar-thin">
              {tradeLogs.map((log, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl text-xs md:text-sm leading-relaxed ${
                    log.speaker === 'Siz'
                      ? 'bg-purple-950/40 border border-purple-500/30 text-purple-200 ml-8'
                      : log.success
                      ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 mr-8'
                      : 'bg-slate-800/60 border border-slate-700/60 text-slate-200 mr-8'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-1 opacity-80 text-xs">
                    <span>{log.speaker}</span>
                    <span className="text-[10px] text-slate-400">{log.time}</span>
                  </div>
                  <div>{log.text}</div>
                </div>
              ))}
            </div>

            {/* Bargain Negotiation Form */}
            <form onSubmit={handleTrade} className="space-y-3 pt-3 border-t border-slate-800">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-5">
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Taklif Narxingiz (Cyber-Som)
                  </label>
                  <input
                    type="number"
                    value={offerPrice}
                    onChange={(e) => setOfferPrice(Number(e.target.value))}
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="md:col-span-7">
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    AI ga Gap / Dalilingiz (O'zbekcha)
                  </label>
                  <input
                    type="text"
                    value={playerNote}
                    onChange={(e) => setPlayerNote(e.target.value)}
                    placeholder="Masalan: Bozorchi aka, doimiy mijozingizman-ku!"
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs md:text-sm transition shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Gemini muzokarani tahlil qilmoqda...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Savdolashish va Narxni Taklif Qilish
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
