import React, { useState, useEffect } from 'react';
import { useGameState } from './hooks/useGameState';
import { Lobby } from './components/RolePlayGame/Lobby';
import { RoleSelection } from './components/RolePlayGame/RoleSelection';
import { GameArena } from './components/RolePlayGame/GameArena';

export const RolePlayGame: React.FC = () => {
  const [roomId, setRoomId] = useState<string>('');
  const [playerId, setPlayerId] = useState<string>('');
  
  // Use a local state ID if not set
  useEffect(() => {
    const savedId = localStorage.getItem('rpg_player_id');
    if (savedId) {
      setPlayerId(savedId);
    } else {
      const newId = Math.random().toString(36).substring(2, 9);
      localStorage.setItem('rpg_player_id', newId);
      setPlayerId(newId);
    }
  }, []);

  const { gameState, isConnected, joinGame, selectRole, startGame, sendMessage, nextPhase } = useGameState(roomId, playerId);

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
      onSendMessage={sendMessage}
      onNextPhase={nextPhase}
    />
  );
};

export default RolePlayGame;
