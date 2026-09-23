import React, { useState } from 'react';

interface LobbyProps {
  onJoin: (roomId: string, playerName: string) => void;
}

export const Lobby: React.FC<LobbyProps> = ({ onJoin }) => {
  const [roomId, setRoomId] = useState('');
  const [playerName, setPlayerName] = useState('');

  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreate = () => {
    if (!playerName.trim()) return alert("Iltimos, ismingizni kiriting");
    const newRoom = generateRoomId();
    onJoin(newRoom, playerName);
  };

  const handleJoin = () => {
    if (!playerName.trim()) return alert("Iltimos, ismingizni kiriting");
    if (!roomId.trim()) return alert("Iltimos, xona kodini kiriting");
    onJoin(roomId.toUpperCase(), playerName);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-900 mb-2">
            Tibbiyot muassasasida strategik qaror
          </h1>
          <p className="text-gray-500">Jonli rolli simulyatsiya</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ismingiz
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Masalan: Alisher"
            />
          </div>

          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Xona kodi (mavjud bo'lsa)
              </label>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                placeholder="Kod"
              />
            </div>
            <button
              onClick={handleJoin}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Qo'shilish
            </button>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 bg-white">yoki</span>
            </div>
          </div>

          <button
            onClick={handleCreate}
            className="w-full px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
          >
            Yangi xona yaratish
          </button>
        </div>
      </div>
    </div>
  );
};
