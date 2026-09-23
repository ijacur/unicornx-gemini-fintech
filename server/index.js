import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// In-memory store for game states and leaderboard
const games = {};
const leaderboard = [];

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join_room', (roomId, callback) => {
    socket.join(roomId);
    if (!games[roomId]) {
      games[roomId] = {
        roomId,
        phase: 'LOBBY',
        players: {},
        messages: [],
        currentTurn: null,
        createdAt: Date.now()
      };
    }
    callback(games[roomId]);
    socket.to(roomId).emit('game_state_update', games[roomId]);
  });

  socket.on('update_game', (roomId, newState) => {
    if (games[roomId]) {
      games[roomId] = newState;
      io.to(roomId).emit('game_state_update', games[roomId]);
    }
  });

  // QUIZ LEADERBOARD
  socket.on('get_leaderboard', (callback) => {
    callback(leaderboard.sort((a, b) => b.score - a.score));
  });

  socket.on('submit_score', (data) => {
    // data: { name, score, time }
    const existingIndex = leaderboard.findIndex(entry => entry.name === data.name);
    if (existingIndex === -1) {
      leaderboard.push(data);
    } // if already exists, they can't submit again
    io.emit('leaderboard_update', leaderboard.sort((a, b) => b.score - a.score));
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO Server running on port ${PORT}`);
});
