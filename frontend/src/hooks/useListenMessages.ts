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
      const sound = new Audio(notificationSound);
      sound.play().catch(() => {});
      // 인자로 받은 객체를 변이하지 않고, UI 상태를 더한 새 객체를 만든다.
      addMessage({ ...newMessage, shouldShake: true });
    };

    socket?.on('newMessage', messageHandler);

    return () => {
      socket?.off('newMessage', messageHandler);
    };
  }, [socket, addMessage]);
};

export default useListenMessages;
