export interface IMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  // 클라이언트에서 새 메시지 도착 애니메이션을 위해서만 사용하는 값.
  shouldShake?: boolean;
}
