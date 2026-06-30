import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { extractTime } from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation';
import { IMessage } from '../../types/message';

const Message: React.FC<{ message: IMessage }> = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser?._id;
  const formattedTime = extractTime(message.createdAt);
  const profilePic = fromMe
    ? authUser?.profilePic
    : selectedConversation?.profilePic;

  const shakeClass = message.shouldShake ? 'shake' : '';

  const bubbleClass = fromMe
    ? 'bg-brand text-brand-ink rounded-2xl rounded-br-md'
    : 'bg-paper text-ink rounded-2xl rounded-bl-md';

  return (
    <div className={`flex flex-col ${fromMe ? 'items-end' : 'items-start'}`}>
      <div className="flex items-end gap-2 max-w-[78%]">
        {!fromMe && (
          <img
            src={profilePic}
            alt=""
            className="w-7 h-7 rounded-full object-cover bg-paper shrink-0"
          />
        )}
        <div
          className={`px-3.5 py-2 text-sm leading-relaxed break-words ${bubbleClass} ${shakeClass}`}
        >
          {message.message}
        </div>
      </div>
      <span
        className={`text-[10px] text-muted mt-1 ${fromMe ? 'pr-1' : 'pl-9'}`}
      >
        {formattedTime}
      </span>
    </div>
  );
};

export default Message;
