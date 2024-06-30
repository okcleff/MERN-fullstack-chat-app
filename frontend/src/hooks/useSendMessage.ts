import { useState } from 'react';
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';
import { ISendMessageResponse } from '../types/message';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/messages/send/${
          selectedConversation?._id || ''
        }`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
          credentials: 'include',
        }
      );

      const data: ISendMessageResponse = await res.json();

      if (!data.result) throw new Error(data.message);

      setMessages([...messages, data.newMessage]);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};
export default useSendMessage;
