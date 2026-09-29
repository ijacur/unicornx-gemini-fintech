import React, { useState } from 'react';
import {
  Building2,
  FileSearch,
  Calculator,
  Award,
  Sparkles,
  Quote
} from 'lucide-react';
import { ScenarioGame } from './ScenarioGame';
import { DocumentInspector } from './DocumentInspector';
import { UtilityCalculator } from './UtilityCalculator';
import { SmartBuyerExam } from './SmartBuyerExam';

export const MulkXHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'inspector' | 'calculator' | 'checklist'>('scenarios');

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Top Banner with Domla's Core Wisdom */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-indigo-500/30 p-6 sm:p-8 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Samarqand Uy-Joy & Yer Bo‘yicha Hayotiy Master-Klass
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
            MulkX: Ko‘chmas Mulk & Kadastr Detektivi
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Uy-joy yoki yer sotib olayotganda soxta blogerlar, gazsizlantirilgan sovuq domlar, tilxat balosi va qizil chiziq tuzoqlariga tushib qolmaslik uchun interaktiv o‘quv-simulyator.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-3 mt-4">
            <Quote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-semibold text-amber-200/90 italic leading-relaxed">
              «Sudda faqat qog‘oz va rasmiy davlat reyestri gapiradi, og‘zaki va’dalar nolga teng! Odamning mashinasiga emas, firmaning qonuniy hujjatlariga qarang.»
            </p>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar">
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition shrink-0 ${
            activeTab === 'scenarios'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>5 ta Hayotiy Keys (Simulyator)</span>
        </button>

        <button
          onClick={() => setActiveTab('inspector')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition shrink-0 ${
            activeTab === 'inspector'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <FileSearch className="w-4 h-4" />
          <span>Hujjat Ekspertizasi (Inspector)</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition shrink-0 ${
            activeTab === 'calculator'
              ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Isitish & Kvadratura Kalkulyatori</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs md:text-sm font-bold transition shrink-0 ${
            activeTab === 'checklist'
              ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>10 Qoida & «Aqlli Xaridor» Imtihoni</span>
        </button>
      </div>

      {/* Main Tab Views */}
      {activeTab === 'scenarios' && <ScenarioGame />}
      {activeTab === 'inspector' && <DocumentInspector />}
      {activeTab === 'calculator' && <UtilityCalculator />}
      {activeTab === 'checklist' && <SmartBuyerExam />}
    </div>
  );
};
