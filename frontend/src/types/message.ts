// 서버가 내려주는 순수 메시지 도메인 타입
export interface IMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
}

// 도메인 타입에 클라이언트 전용 UI 상태(도착 애니메이션 등)를 더한 표현 타입
export interface IChatMessage extends IMessage {
  shouldShake?: boolean;
}
