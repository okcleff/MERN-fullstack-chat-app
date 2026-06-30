import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notificationSound from '../assets/sounds/notification.mp3';
import { IMessage } from '../types/message';

const useListenMessages = (): void => {
  const { socket } = useSocketContext();
  const { addMessage } = useConversation();

  useEffect(() => {
    const messageHandler = (newMessage: IMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      addMessage(newMessage);
    };

    socket?.on('newMessage', messageHandler);

    return () => {
      socket?.off('newMessage', messageHandler);
    };
  }, [socket, addMessage]);
};

export default useListenMessages;
