import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notificationSound from '../assets/sounds/notification.mp3';
import { IMessage } from '../types/message';

const useListenMessages = (): void => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    const messageHandler = (newMessage: IMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    };

    socket?.on('newMessage', messageHandler);

    return () => {
      socket?.off('newMessage', messageHandler);
    };
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
