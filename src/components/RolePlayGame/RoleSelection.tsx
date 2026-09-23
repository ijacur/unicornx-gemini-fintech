import React from 'react';
import { ROLES_INFO } from '../../types/game';
import type { GameState, Role } from '../../types/game';

interface RoleSelectionProps {
  gameState: GameState;
  playerId: string;
  onSelectRole: (role: Role) => void;
  onStartGame: () => void;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({
  gameState,
  playerId,
  onSelectRole,
  onStartGame
}) => {
  const me = gameState.players[playerId];
  
  // Check which roles are already taken
  const takenRoles = Object.values(gameState.players)
    .map(p => p.role)
    .filter(r => r !== null) as Role[];

  const isModerator = me?.role === 'Moderator';


  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-blue-900 p-6 text-white text-center">
          <h2 className="text-xl font-bold">Xona kodi: <span className="text-yellow-400 text-2xl tracking-widest">{gameState.roomId}</span></h2>
          <p className="mt-2 text-blue-200">Boshqa ishtirokchilarni ushbu kod orqali taklif qiling</p>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">O'z rolingizni tanlang:</h3>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {(Object.entries(ROLES_INFO) as [Role, typeof ROLES_INFO[Role]][]).map(([roleKey, info]) => {
              const isTaken = takenRoles.includes(roleKey);
              const isMine = me?.role === roleKey;
              
              let owner = "";
              if (isTaken) {
                const player = Object.values(gameState.players).find(p => p.role === roleKey);
                if (player) owner = player.name;
              }

              return (
                <button
                  key={roleKey}
                  onClick={() => !isTaken && onSelectRole(roleKey)}
                  disabled={isTaken && !isMine}
                  className={`relative flex flex-col items-start p-4 border-2 rounded-xl text-left transition ${
                    isMine
                      ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-200'
                      : isTaken
                      ? 'border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed'
                      : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-bold text-gray-900">{info.character}</span>
                  <span className="text-xs text-blue-600 font-medium mb-2">{info.title}</span>
                  <p className="text-sm text-gray-600 leading-tight">{info.description}</p>
                  
                  {isTaken && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-gray-800 text-white text-xs rounded">
                      {isMine ? "Sizniki" : owner}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Ishtirokchilar: {Object.keys(gameState.players).length} / 5
            </div>
            <button
              onClick={onStartGame}
              disabled={!isModerator || takenRoles.length < 2} // Require moderator to start and at least 2 players
              className={`px-6 py-2 rounded-lg font-medium text-white transition ${
                isModerator && takenRoles.length >= 2
                  ? 'bg-green-600 hover:bg-green-700 shadow-md'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isModerator ? "O'yinni boshlash" : "Moderator o'yinni boshlashini kuting"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
