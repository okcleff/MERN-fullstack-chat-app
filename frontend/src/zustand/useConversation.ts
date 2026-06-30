import { create } from 'zustand';
import toast from 'react-hot-toast';
import { IUserInfo } from '../types/user';
import { IMessage } from '../types/message';
import { apiClient, getErrorMessage } from '../utils/apiClient';

interface IConversationStore {
  // 사이드바 대화 상대 목록 (여러 컴포넌트가 공유)
  conversations: IUserInfo[];
  conversationsLoading: boolean;
  fetchConversations: () => Promise<void>;

  // 현재 선택된 대화 상대
  selectedConversation: IUserInfo | null;
  setSelectedConversation: (selectedConversation: IUserInfo | null) => void;

  // 현재 대화의 메시지 목록
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  addMessage: (message: IMessage) => void;
}

const useConversation = create<IConversationStore>((set, get) => ({
  conversations: [],
  conversationsLoading: false,
  // 동시에 여러 컴포넌트에서 호출되어도 진행 중이면 중복 요청하지 않는다.
  fetchConversations: async () => {
    if (get().conversationsLoading) return;

    set({ conversationsLoading: true });
    try {
      const conversations = await apiClient<IUserInfo[]>('/api/users');
      set({ conversations });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      set({ conversationsLoading: false });
    }
  },

  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),

  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
}));

export default useConversation;
