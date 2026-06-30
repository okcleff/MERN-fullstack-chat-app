import { useState } from 'react';
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';
import { IMessage } from '../types/message';
import { apiClient, getErrorMessage } from '../utils/apiClient';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, addMessage } = useConversation();

  const sendMessage = async (message: string) => {
    if (!selectedConversation?._id) return;

    setLoading(true);
    try {
      const newMessage = await apiClient<IMessage>(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: 'POST',
          body: JSON.stringify({ message }),
        }
      );

      addMessage(newMessage);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
