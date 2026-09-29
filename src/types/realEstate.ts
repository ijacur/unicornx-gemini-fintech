/**
 * MulkX: Real Estate & Cadastre Detective Simulator Types
 * Based on Domla's Real-Life Lessons for Buying Property in Uzbekistan / Samarkand
 */

export interface ScenarioChoice {
  text: string;
  isCorrect: boolean;
  consequenceTitle: string;
  consequenceExplanation: string;
  financialImpact: number; // in USD (e.g. -45000 or +45000 saved)
  domlaAdvice: string;
}

export interface ScenarioCase {
  id: string;
  title: string;
  location: string;
  tag: 'Novostroyka' | 'Hovli va Yer' | 'Shartnoma va Huquq';
  characterName: string;
  characterRole: string;
  characterAvatar: string;
  situation: string;
  offerPrice: string;
  suspectDetails: string[];
  choices: ScenarioChoice[];
}

export interface DocumentHotspot {
  id: string;
  xPercent: number;
  yPercent: number;
  title: string;
  isRedFlag: boolean;
  explanation: string;
  domlaRule: string;
}

export interface InspectorDocument {
  id: string;
  title: string;
  subtitle: string;
  documentType: 'Kadastr Pasporti' | 'Hokimlik Qarori' | 'Kotlovan Shartnomasi';
  contentSnippet: string;
  hotspots: DocumentHotspot[];
}

export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChecklistItem {
  id: string;
  category: 'Hujjatlar' | 'Kommunikatsiya' | 'Meros va Da\'vo' | 'Maydon va Chegaralar';
  title: string;
  description: string;
  source: string;
}
