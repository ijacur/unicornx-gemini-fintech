import { useState, useEffect } from 'react';


import type { GameState, GamePhase } from '../types/game';

const API_URL = '/api/sync';

export function useGameState(roomId: string, playerId: string) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Polling loop
  useEffect(() => {
    if (!roomId) return;
    setIsConnected(true);
    let isActive = true;

    const poll = async () => {
      if (!isActive) return;
      try {
        const res = await fetch(`${API_URL}?roomId=${roomId}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.phase) {
            setGameState(data);
          }
          setHasLoaded(true);
        }
      } catch (e) {
        console.error("Polling error", e);
      }
      if (isActive) {
        setTimeout(poll, 1500); // Poll every 1.5s
      }
    };
    
    poll();

    return () => {
      isActive = false;
    };
  }, [roomId]);

  const updateGameState = async (newState: GameState) => {
    if (!roomId) return;
    setGameState(newState);
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomId, state: newState })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const joinGame = async (playerName: string) => {
    if (!hasLoaded) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    let currentState = gameState;
    if (!currentState) {
      currentState = {
        roomId,
        phase: 'LOBBY',
        players: {},
        messages: [],
        currentTurn: null,
        createdAt: Date.now()
      };
    } else {
      currentState = JSON.parse(JSON.stringify(currentState));
    }

    if (!currentState!.players[playerId]) {
      currentState!.players[playerId] = {
        id: playerId,
        name: playerName,
        role: null,
        joinedAt: Date.now()
      };
      await updateGameState(currentState!);
    }
  };

  const selectRole = (role: any) => {
    if (!gameState) return;
    const newState = JSON.parse(JSON.stringify(gameState)) as GameState;
    if (newState.players[playerId]) {
      newState.players[playerId].role = role;
      updateGameState(newState);
    }
  };

  const startGame = () => {
    if (!gameState) return;
    const newState = JSON.parse(JSON.stringify(gameState)) as GameState;
    newState.phase = 'INTRO';
    // Find the first player with a role
    const firstPlayerId = Object.keys(newState.players).find(id => newState.players[id].role);
    newState.currentTurn = firstPlayerId ? newState.players[firstPlayerId].role : null;
    updateGameState(newState);
  };

  const sendMessage = (content: string) => {
    if (!gameState) return;
    const newState = JSON.parse(JSON.stringify(gameState)) as GameState;
    const player = newState.players[playerId];
    newState.messages.push({
      id: Math.random().toString(36).substring(7),
      playerId: playerId,
      role: player?.role || 'Moderator' as any,
      content,
      timestamp: Date.now(),
      type: 'TEXT'
    });
    updateGameState(newState);
  };

  const nextPhase = () => {
    if (!gameState) return;
    const newState = JSON.parse(JSON.stringify(gameState)) as GameState;
    
    // Cycle phases
    const phases: GamePhase[] = ['LOBBY', 'INTRO', 'ARGUMENTATION', 'DECISION', 'FINISHED'];
    const currentIndex = phases.indexOf(newState.phase);
    if (currentIndex < phases.length - 1) {
      newState.phase = phases[currentIndex + 1];
    }
    updateGameState(newState);
  };

  return { gameState, isConnected, joinGame, selectRole, startGame, sendMessage, nextPhase };
}
