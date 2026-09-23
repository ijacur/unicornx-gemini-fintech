export type Role = 'Moderator' | 'Bosh_tahlilchi' | 'Metodist_iqtisodchi' | 'Moliyaviy_strateg' | 'Raqamli_tahlilchi';

export interface Player {
  id: string; // Socket or Firebase uid
  name: string;
  role: Role | null;
  joinedAt: number;
}

export type GamePhase = 'LOBBY' | 'INTRO' | 'ARGUMENTATION' | 'DECISION' | 'FINISHED';

export interface GameState {
  roomId: string;
  phase: GamePhase;
  players: Record<string, Player>;
  messages: Message[];
  currentTurn: Role | null;
  createdAt: number;
}

export interface Message {
  id: string;
  playerId: string;
  role: Role;
  content: string;
  timestamp: number;
  type: 'TEXT' | 'SYSTEM' | 'DECISION';
}

export const ROLES_INFO: Record<Role, { title: string, character: string, description: string }> = {
  Moderator: {
    title: "Bosh ekspert va Hakam",
    character: "Gulchexra domla",
    description: "Tahliliy jarayonning ilmiy asosini nazorat qilish va yakuniy boshqaruv qarorini tasdiqlash."
  },
  Bosh_tahlilchi: {
    title: "Bosh tahlilchi",
    character: "Donoxon",
    description: "Birlamchi hisob va resurslar auditi. Resurslar samaradorligini baholash."
  },
  Metodist_iqtisodchi: {
    title: "Metodist-iqtisodchi",
    character: "Davron",
    description: "Klassik tahlil usullari mutaxassisi. Omilli tahlil ko'rsatkichlarini hisoblash."
  },
  Moliyaviy_strateg: {
    title: "Moliyaviy strateg va Xatarlar menejeri",
    character: "Setora",
    description: "Bozor mexanizmlari, to'lov qobiliyati va moliyaviy risklarni tahlil qilish."
  },
  Raqamli_tahlilchi: {
    title: "Raqamli tahlilchi va AI-arxitektor",
    character: "Jasur",
    description: "Iqtisodiy-matematik modellashtirish va AI orqali kelajakni prognozlash."
  }
};
