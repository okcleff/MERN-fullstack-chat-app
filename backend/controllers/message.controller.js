import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';
import { io } from '../utils/socket.js';
import { getReceiverSocketId } from '../utils/onlineUsers.js';
import asyncHandler from '../utils/asyncHandler.js';

export const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  // participants에 senderId와 receiverId가 모두 있는 conversation이 있는지 확인
  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({ senderId, receiverId, message });
  conversation.messages.push(newMessage._id);

  await Promise.all([conversation.save(), newMessage.save()]);

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('newMessage', newMessage);
  }

  res.status(201).json({ result: true, data: newMessage });
});

export const getMessages = asyncHandler(async (req, res) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user._id;

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, userToChatId] },
  }).populate('messages'); // NOT REFERENCE BUT ACTUAL MESSAGES

  if (!conversation) {
    return res.status(200).json({ result: true, data: [] });
  }

  res.status(200).json({ result: true, data: conversation.messages });
});
