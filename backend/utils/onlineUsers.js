// 온라인 사용자(userId -> socketId) 상태를 한곳에 캡슐화한다.
// 가변 Map은 모듈 내부에 가두고, 외부에는 의도가 드러나는 함수만 노출한다.
const userSocketMap = new Map();

export const setUserOnline = (userId, socketId) => {
  userSocketMap.set(userId, socketId);
};

export const setUserOffline = (userId) => {
  userSocketMap.delete(userId);
};

export const getReceiverSocketId = (userId) => userSocketMap.get(userId);

export const getOnlineUserIds = () => [...userSocketMap.keys()];
