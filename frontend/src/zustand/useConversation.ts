import { create } from 'zustand';
import { IUserInfo } from '../types/user';
import { IMessage } from '../types/message';

interface IConversationStore {
  selectedConversation: IUserInfo | null;
  setSelectedConversation: (selectedConversation: IUserInfo | null) => void;
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
}

const useConversation = create<IConversationStore>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
