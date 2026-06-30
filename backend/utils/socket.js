import '../loadEnv.js';
import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import {
  setUserOnline,
  setUserOffline,
  getOnlineUserIds,
} from './onlineUsers.js';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId && userId !== 'undefined') setUserOnline(userId, socket.id);

  io.emit('getOnlineUsers', getOnlineUserIds());

  socket.on('disconnect', () => {
    setUserOffline(userId);
    io.emit('getOnlineUsers', getOnlineUserIds());
  });
});

export { app, io, server };
