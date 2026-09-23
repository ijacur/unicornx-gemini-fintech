import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  CheckCircle2,
  Award,
  Sparkles,
  Layers,
  Zap
} from 'lucide-react';
import { geminiService, type CreditProfile, type CreditDecision } from '../../services/geminiService';
import { triggerConfetti } from '../../lib/utils';

export const CreditScorer: React.FC = () => {
  const [income, setIncome] = useState<number>(8500000);
  const [existingDebt, setExistingDebt] = useState<number>(1200000);
  const [requestedAmount, setRequestedAmount] = useState<number>(14000000);
  const [tenure, setTenure] = useState<number>(12);
  const workMonths = 18;
  const [history, setHistory] = useState<'perfect' | 'good' | 'average' | 'poor'>('good');

  const [decision, setDecision] = useState<CreditDecision | null>(null);
  const [loanAccepted, setLoanAccepted] = useState<boolean>(false);

  const calculateScore = async () => {
    setLoanAccepted(false);
    try {
      const profile: CreditProfile = {
        monthlyIncome: income,
        existingLoans: existingDebt,
        requestedAmount: requestedAmount,
        tenureMonths: tenure,
        workExperienceMonths: workMonths,
        repaymentHistory: history,
      };
      const res = await geminiService.evaluateCreditScore(profile, 'uz');
      setDecision(res);
      if (res.status === 'APPROVED') {
        triggerConfetti();
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    calculateScore();
  }, [income, existingDebt, requestedAmount, tenure, history]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-cyan-950 p-6 md:p-8 border border-blue-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Zap className="w-3.5 h-3.5" />
              TBC Bank & Uzum Nasiya AI Underwriting Standard
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Avtomatik AI Kredit & 0-0-12 Muddatli To'lov Skoringi
            </h2>
            <p className="text-slate-300 mt-2 max-w-2xl text-sm md:text-base">
              Bankka bormasdan, 1 soniya ichida sun'iy intellekt orqali kredit riskini baholang va Uzum Nasiya hamda TBC Bank talablariga muvofiqligingizni tekshiring.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">
                Maksimal Limit
              </span>
              <span className="text-lg md:text-xl font-extrabold text-blue-400">
                {decision ? (decision.maxLimit / 1000000).toFixed(1) : '0'} mln UZS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm space-y-6">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              Moliyaviy Parametrlarni Sozlash
            </h3>

            {/* Income Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300 font-medium">Oylik Rasmiy Daromad</span>
                <span className="font-bold text-white">{(income / 1000000).toFixed(1)} mln UZS</span>
              </div>
              <input
                type="range"
                min="2000000"
                max="30000000"
                step="500000"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>2 mln</span>
                <span>15 mln</span>
                <span>30 mln UZS</span>
              </div>
            </div>

            {/* Existing Debt Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300 font-medium">Mavjud Kredit / Nasiya To'lovlari</span>
                <span className="font-bold text-rose-400">{(existingDebt / 1000000).toFixed(1)} mln UZS</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000000"
                step="200000"
                value={existingDebt}
                onChange={(e) => setExistingDebt(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>0</span>
                <span>5 mln</span>
                <span>10 mln UZS</span>
              </div>
            </div>

            {/* Requested Amount Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300 font-medium">So'ralayotgan Nasiya / Kredit</span>
                <span className="font-bold text-cyan-400">{(requestedAmount / 1000000).toFixed(1)} mln UZS</span>
              </div>
              <input
                type="range"
                min="1000000"
                max="50000000"
                step="1000000"
                value={requestedAmount}
                onChange={(e) => setRequestedAmount(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Tenure Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 block">To'lov Muddati</label>
              <div className="grid grid-cols-4 gap-2">
                {[3, 6, 12, 24].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTenure(m)}
                    className={`py-2 rounded-xl text-xs font-bold transition border ${
                      tenure === m
                        ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {m} Oy
                  </button>
                ))}
              </div>
            </div>

            {/* Repayment History */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 block">Kredit Tarixi Reytingi</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(['perfect', 'good', 'average', 'poor'] as const).map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setHistory(h)}
                    className={`py-2 px-2 rounded-xl text-[11px] font-semibold transition border capitalize ${
                      history === h
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow'
                        : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {h === 'perfect' ? 'A\'lo' : h === 'good' ? 'Yaxshi' : h === 'average' ? 'O\'rta' : 'Yomon'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results & Score Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-md relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-400" />
                  Gemini Underwriter Xulosasi
                </h3>
                <span className="text-xs text-slate-400">
                  Algoritmik baholash va to'lov qobiliyati indeksi
                </span>
              </div>
              {decision && (
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    decision.status === 'APPROVED'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : decision.status === 'PRE_APPROVED'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}
                >
                  {decision.status === 'APPROVED'
                    ? 'Tasdiqlandi (Approved)'
                    : decision.status === 'PRE_APPROVED'
                    ? 'Dastlabki Tasdiq'
                    : 'Rad etildi (Rejected)'}
                </div>
              )}
            </div>

            {decision && (
              <div className="space-y-6">
                {/* Score Visual Gauge */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="text-center sm:text-left">
                    <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold block">
                      Kredit Skoring Bali
                    </span>
                    <div className="text-5xl font-extrabold text-white mt-1 tracking-tight flex items-baseline gap-2">
                      <span className={decision.score >= 650 ? 'text-emerald-400' : 'text-amber-400'}>
                        {decision.score}
                      </span>
                      <span className="text-xs text-slate-500 font-normal">/ 850 Max</span>
                    </div>
                    <span className="inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300">
                      Xavf darajasi: {decision.riskLevel}
                    </span>
                  </div>

                  <div className="text-center sm:text-right space-y-1">
                    <span className="text-xs text-slate-400 block">Oylik To'lov ({tenure} oy)</span>
                    <div className="text-2xl font-bold text-cyan-400">
                      {decision.monthlyPayment.toLocaleString()} UZS
                    </div>
                    <span className="text-[11px] text-emerald-400 font-medium block">
                      {decision.interestRate === 0 ? '🎉 0% Foizsiz Nasiya (0-0-12)' : `Yillik stavka: ${decision.interestRate}%`}
                    </span>
                  </div>
                </div>

                {/* Underwriting Factors */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                    AI Baholash Omili
                  </span>
                  <div className="space-y-2">
                    {decision.reasoning.map((r, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-800/40 p-3 rounded-xl border border-slate-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Recommendation */}
                <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-blue-200 leading-relaxed">
                  <div className="font-bold text-blue-400 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    TBC / Uzum AI Maslahati:
                  </div>
                  {decision.recommendations}
                </div>

                {/* Action button */}
                <div className="pt-2">
                  {loanAccepted ? (
                    <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-center text-emerald-300 font-bold text-sm">
                      ✅ Mablag' Uzum Bank kartangizga muvaffaqiyatli o'tkazildi! (Demo tranzaksiya)
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setLoanAccepted(true);
                        triggerConfetti();
                      }}
                      disabled={decision.status === 'REJECTED'}
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm transition shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <CreditCard className="w-4 h-4" />
                      1-Tugma Bilan Rasmiylashtirish (Uzum / TBC Card)
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
