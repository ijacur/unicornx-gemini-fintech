import React, { useState, useRef, useEffect } from 'react';
import { ROLES_INFO } from '../../types/game';
import type { GameState, Role, Message } from '../../types/game';

interface GameArenaProps {
  gameState: GameState;
  playerId: string;
  onSendMessage: (role: Role, content: string, type?: Message['type']) => void;
  onNextPhase: (phase: GameState['phase'], nextTurn: Role | null) => void;
}

export const GameArena: React.FC<GameArenaProps> = ({
  gameState,
  playerId,
  onSendMessage,
  onNextPhase
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const me = gameState.players[playerId];
  const myRole = me?.role as Role;
  const isMyTurn = gameState.currentTurn === myRole;
  const isModerator = myRole === 'Moderator';

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [gameState.messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(myRole, inputText, 'TEXT');
    setInputText('');
  };

  const handleModeratorAction = () => {
    if (gameState.phase === 'INTRO') {
      const problemDesc = "Muassasamizda yangi diagnostika bo'limi ochilmoqda. Resurslar cheklangan, xatarlar mavjud. Qaysi yo'nalishga qancha mablag' ajratishni iqtisodiy tahlil orqali isbotlab bering.";
      onSendMessage(myRole, problemDesc, 'SYSTEM');
      onNextPhase('ARGUMENTATION', 'Bosh_tahlilchi'); // Pass turn to first analyst
    } else if (gameState.phase === 'ARGUMENTATION') {
      onNextPhase('DECISION', 'Moderator');
    } else if (gameState.phase === 'DECISION') {
      onSendMessage(myRole, inputText, 'DECISION');
      setInputText('');
      onNextPhase('FINISHED', null);
    }
  };

  const renderTurnControl = () => {
    if (!isMyTurn) {
      return (
        <div className="bg-gray-100 p-4 text-center text-sm text-gray-500 rounded-b-xl border-t border-gray-200">
          Hozir <strong>{ROLES_INFO[gameState.currentTurn as Role]?.character || 'Boshqa ishtirokchi'}</strong> ning navbati. Kuting...
        </div>
      );
    }

    if (isModerator && gameState.phase === 'INTRO') {
      return (
        <div className="bg-blue-50 p-4 rounded-b-xl border-t border-blue-100 flex flex-col gap-3">
          <p className="text-sm text-blue-800">Siz muammoni e'lon qilishingiz kerak:</p>
          <button 
            onClick={handleModeratorAction}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Muammoni e'lon qilish
          </button>
        </div>
      );
    }

    if (gameState.phase === 'FINISHED') {
      return (
        <div className="bg-green-50 p-4 text-center rounded-b-xl border-t border-green-200 text-green-800 font-medium">
          O'yin yakunlandi!
        </div>
      );
    }

    return (
      <div className="bg-white p-4 rounded-b-xl border-t border-gray-200 flex flex-col gap-2">
        {isModerator && gameState.phase === 'ARGUMENTATION' && (
          <button 
            onClick={handleModeratorAction}
            className="w-full py-2 mb-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 text-sm"
          >
            Munozarani to'xtatish va Qaror qabul qilish bosqichiga o'tish
          </button>
        )}
        
        {isModerator && gameState.phase === 'DECISION' && (
          <p className="text-sm text-red-600 font-medium mb-1">Yakuniy qaroringizni yozing:</p>
        )}

        <div className="flex gap-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                isModerator && gameState.phase === 'DECISION' ? handleModeratorAction() : handleSend();
              }
            }}
            placeholder={isModerator && gameState.phase === 'DECISION' ? "Yakuniy xulosangizni yozing..." : "O'z fikringizni yozing..."}
            className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
          />
          <button
            onClick={isModerator && gameState.phase === 'DECISION' ? handleModeratorAction : handleSend}
            disabled={!inputText.trim()}
            className="px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isModerator && gameState.phase === 'DECISION' ? "Yakunlash" : "Yuborish"}
          </button>
        </div>
      </div>
    );
  };

  const getPhaseName = (phase: GameState['phase']) => {
    switch (phase) {
      case 'INTRO': return 'Kirish (Muammoni qo\'yish)';
      case 'ARGUMENTATION': return 'Dalillar jangi';
      case 'DECISION': return 'Qaror qabul qilish';
      case 'FINISHED': return 'Yakunlandi';
      default: return phase;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans max-w-4xl mx-auto md:py-6">
      <div className="flex-1 flex flex-col bg-white md:rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-900 text-white p-4 flex justify-between items-center shrink-0">
          <div>
            <h2 className="font-bold text-lg leading-tight">Tibbiyot muassasasida strategik qaror</h2>
            <p className="text-blue-200 text-sm">Bosqich: {getPhaseName(gameState.phase)}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-200">Sizning rolingiz:</p>
            <p className="font-bold">{ROLES_INFO[myRole]?.character}</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {(gameState.messages || []).map((msg) => {
            const isMe = msg.playerId === playerId;
            const roleInfo = ROLES_INFO[msg.role];
            
            if (msg.type === 'SYSTEM') {
              return (
                <div key={msg.id} className="mx-auto bg-blue-100 text-blue-900 p-4 rounded-lg text-center max-w-lg shadow-sm border border-blue-200">
                  <span className="font-bold block mb-1">📢 Moderator e'loni</span>
                  <p className="italic">{msg.content}</p>
                </div>
              );
            }
            
            if (msg.type === 'DECISION') {
              return (
                <div key={msg.id} className="mx-auto bg-green-100 text-green-900 p-6 rounded-lg text-center max-w-2xl shadow-md border-2 border-green-500 my-6">
                  <span className="text-xl font-bold block mb-3">🏆 Yakuniy Qaror</span>
                  <p className="text-lg">{msg.content}</p>
                </div>
              );
            }

            return (
              <div key={msg.id} className={`flex flex-col max-w-[85%] ${isMe ? 'items-end self-end ml-auto' : 'items-start'}`}>
                <div className="flex items-baseline gap-2 mb-1 px-1">
                  <span className="text-sm font-bold text-gray-700">{roleInfo.character}</span>
                  <span className="text-xs text-gray-500">{roleInfo.title}</span>
                </div>
                <div className={`p-3 rounded-2xl ${isMe ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-white text-gray-800 border border-gray-200 shadow-sm rounded-tl-sm'}`}>
                  {msg.content}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Controls */}
        {renderTurnControl()}
      </div>
    </div>
  );
};
