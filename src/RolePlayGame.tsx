import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { Lobby } from './components/RolePlayGame/Lobby';
import { RoleSelection } from './components/RolePlayGame/RoleSelection';
import { GameArena } from './components/RolePlayGame/GameArena';

export const RolePlayGame: React.FC = () => {
  const [roomId, setRoomId] = useState<string>('');
  const [playerId] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    const savedId = localStorage.getItem('rpg_player_id');
    if (savedId) return savedId;
    const newId = Math.random().toString(36).substring(2, 9);
    localStorage.setItem('rpg_player_id', newId);
    return newId;
  });

  const { gameState, isConnected, roomHealth, joinGame, selectRole, startGame, sendMessage, nextPhase } = useGameState(roomId, playerId);

  const handleJoin = (room: string, name: string) => {
    setRoomId(room);
    joinGame(name);
  };

  if (!roomId || !isConnected || !gameState) {
    return <Lobby onJoin={handleJoin} />;
  }

  if (gameState.phase === 'LOBBY') {
    return (
      <RoleSelection 
        gameState={gameState} 
        playerId={playerId} 
        onSelectRole={selectRole}
        onStartGame={startGame}
      />
    );
  }

  return (
    <GameArena 
      gameState={gameState} 
      playerId={playerId}
      roomHealth={roomHealth}
      onSendMessage={sendMessage}
      onNextPhase={nextPhase}
    />
  );
};

export default RolePlayGame;
