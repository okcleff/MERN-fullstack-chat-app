// 다른 모듈이 process.env를 읽기 전에 가장 먼저 .env를 로드해야 한다.
import './loadEnv.js';

import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import { app, server } from './utils/socket.js';
import connectDB from './db/connectDB.js';

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server Running on port ${PORT}`);
});
