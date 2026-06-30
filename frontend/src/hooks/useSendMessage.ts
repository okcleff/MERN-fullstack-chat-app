import useConversation from '../zustand/useConversation';
import { IMessage } from '../types/message';
import { apiClient } from '../utils/apiClient';
import { useAsyncAction } from './useAsyncAction';

const useSendMessage = () => {
  const { loading, run } = useAsyncAction();
  const { selectedConversation, addMessage } = useConversation();

  const sendMessage = async (message: string) => {
    if (!selectedConversation?._id) return;

    await run(async () => {
      const newMessage = await apiClient<IMessage>(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: 'POST',
          body: JSON.stringify({ message }),
        }
      );

      addMessage(newMessage);
    });
  };

  return { sendMessage, loading };
};

export default useSendMessage;
