export interface IMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  shouldShake: boolean;
}

export interface ISendMessageResponse {
  result: boolean;
  newMessage: IMessage;
  message: string;
}
