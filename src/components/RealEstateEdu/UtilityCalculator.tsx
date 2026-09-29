import React, { useState } from 'react';
import {
  Zap,
  Flame,
  TrendingUp,
  AlertTriangle,
  Coins,
  Sparkles
} from 'lucide-react';

export const UtilityCalculator: React.FC = () => {
  // Heating calculator state
  const [apartmentArea, setApartmentArea] = useState<number>(75);
  const [winterMonths, setWinterMonths] = useState<number>(5);

  // Square meter shrinkage calculator state
  const [contractArea, setContractArea] = useState<number>(70);
  const [actualArea, setActualArea] = useState<number>(66);
  const [pricePerSqMeter, setPricePerSqMeter] = useState<number>(7500000); // 7.5 mln UZS

  // Heating calculations (UZS rates)
  // Gas: ~4,500 UZS per m2 per month on average in Uzbekistan winter
  const monthlyGasCost = Math.round(apartmentArea * 4800);
  // Electricity: ~3.5x to 4x more expensive due to tariff tiers and heating efficiency
  const monthlyElectricCost = Math.round(apartmentArea * 18500);

  const seasonalGasCost = monthlyGasCost * winterMonths;
  const seasonalElectricCost = monthlyElectricCost * winterMonths;
  const seasonalOverpay = seasonalElectricCost - seasonalGasCost;

  // Shrinkage calculations
  const lostArea = Math.max(0, contractArea - actualArea);
  const lostMoneyUZS = lostArea * pricePerSqMeter;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-rose-950 border border-amber-500/20 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-widest inline-flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5" />
            Raqamlar gapiradi
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Mulk Kalkulyatori: Gaz vs Elektr Isitish & Kvadratura Yo‘qotishi
          </h3>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Domla aytganidek: «Nega ayrim domlar birdan 8 mln dan 5 mln ga tushib ketdi? Chunki qishda svet puli gazdan 4 baravar qimmatga tushadi!» Ushbu kalkulyatorda real xarajatlarni hisoblang.
          </p>
        </div>
      </div>

      {/* Grid of Two Calculators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculator 1: Heating Costs (Gas vs Electric) */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Isitish Xarajati Tahlili</h4>
                <span className="text-xs text-slate-400">Gazli dom vs Gazsizlantirilgan elektr dom</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold">
              3.8x Farq!
            </span>
          </div>

          {/* Area Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm font-semibold">
              <span className="text-slate-300">Xonadon Maydoni (kv.m):</span>
              <span className="text-amber-400 font-mono text-base">{apartmentArea} m²</span>
            </div>
            <input
              type="range"
              min="40"
              max="160"
              step="5"
              value={apartmentArea}
              onChange={(e) => setApartmentArea(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>40 m² (1 xona)</span>
              <span>80 m² (3 xona)</span>
              <span>160 m² (Katta xonadon)</span>
            </div>
          </div>

          {/* Winter Months Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm font-semibold">
              <span className="text-slate-300">Isitish Mavsumi (Oy):</span>
              <span className="text-white font-mono">{winterMonths} oy (Noyabr–Mart)</span>
            </div>
            <input
              type="range"
              min="3"
              max="6"
              step="1"
              value={winterMonths}
              onChange={(e) => setWinterMonths(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-1">
              <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                Gazli Domda (Oyiga)
              </span>
              <div className="text-lg md:text-xl font-extrabold text-white font-mono">
                ~{monthlyGasCost.toLocaleString()} UZS
              </div>
              <span className="text-[10px] text-emerald-300 block">
                {winterMonths} oyda: {(seasonalGasCost / 1000000).toFixed(1)} mln UZS
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 space-y-1">
              <span className="text-[11px] text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                Elektr Domda (Oyiga)
              </span>
              <div className="text-lg md:text-xl font-extrabold text-rose-400 font-mono">
                ~{monthlyElectricCost.toLocaleString()} UZS
              </div>
              <span className="text-[10px] text-rose-300 block">
                {winterMonths} oyda: {(seasonalElectricCost / 1000000).toFixed(1)} mln UZS
              </span>
            </div>
          </div>

          {/* Overpay Alert */}
          <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/20 text-xs text-rose-200 space-y-1">
            <span className="font-bold text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Qishda Kutilmagan Ortiqcha Xarajat:
            </span>
            <p>
              Faqat isitishning o‘ziga har qishda <strong>{(seasonalOverpay / 1000000).toFixed(1)} mln so‘m</strong> ko‘proq to‘laysiz! 10 yilda bu <strong>{(seasonalOverpay * 10 / 1000000).toFixed(0)} mln so‘m ($8,000+)</strong> degani!
            </p>
          </div>
        </div>

        {/* Calculator 2: Kotlovan Square Meter Shrinkage */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Kotlovanda Kvadratura Yo‘qotishi</h4>
                <span className="text-xs text-slate-400">Shartnoma bo‘yicha vs Haqiqatda chiqqan maydon</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold">
              Shartnoma Qopqoni
            </span>
          </div>

          {/* Contract Area */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm font-semibold">
              <span className="text-slate-300">Shartnomadagi Maydon:</span>
              <span className="text-cyan-400 font-mono text-base">{contractArea} m²</span>
            </div>
            <input
              type="range"
              min="50"
              max="140"
              step="1"
              value={contractArea}
              onChange={(e) => setContractArea(Number(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Actual Delivered Area */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm font-semibold">
              <span className="text-slate-300">Qurib Bitkazilgandagi Haqiqiy Maydon:</span>
              <span className="text-rose-400 font-mono text-base">{actualArea} m²</span>
            </div>
            <input
              type="range"
              min="45"
              max="140"
              step="1"
              value={actualArea}
              onChange={(e) => setActualArea(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Price per m2 */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>1 m² Uchun To‘langan Narx:</span>
              <span className="text-white font-mono font-bold">
                {(pricePerSqMeter / 1000000).toFixed(1)} mln UZS
              </span>
            </div>
            <input
              type="range"
              min="5000000"
              max="15000000"
              step="500000"
              value={pricePerSqMeter}
              onChange={(e) => setPricePerSqMeter(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Loss Result */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Kam Chiqqan Maydon:</span>
              <span className="font-bold text-rose-400 font-mono text-sm">
                -{lostArea.toFixed(1)} m²
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-white">Sizning Sof Moliyaviy Zararingiz:</span>
              <span className="text-lg font-black text-rose-400 font-mono">
                -{(lostMoneyUZS / 1000000).toFixed(1)} mln UZS (~${Math.round(lostMoneyUZS / 12600)})
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200 leading-relaxed">
            <span className="font-bold text-amber-400 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Domlaning Qat'iy Tavsiyasi:
            </span>
            Shartnoma tuzayotganda maxsus band qo‘shtiring: <em>«Agar xonadon o‘lchami kam chiqsa, quruvchi yetishmagan har bir metr uchun o‘sha narxda pulni qaytaradi!»</em>
          </div>
        </div>
      </div>
    </div>
  );
};
