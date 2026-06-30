import { useEffect } from 'react';
import { TiMessages } from 'react-icons/ti';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';
import MessageInput from './MessageInput';
import Messages from './Messages';

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  const firstName = authUser?.fullName?.split(' ')[0] || 'there';

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="text-center">
        <TiMessages className="mx-auto text-5xl text-line mb-5" />
        <h2 className="font-display text-3xl text-ink">Hello, {firstName} 👋</h2>
        <p className="text-muted mt-2 text-sm">
          Select a conversation to start messaging.
        </p>
      </div>
    </div>
  );
};

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="px-5 py-4 border-b border-line flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-muted">
              To
            </span>
            <span className="font-display font-semibold text-ink">
              {selectedConversation.fullName}
            </span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;
