import React, { useMemo } from 'react';
import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation';
import { getRandomEmoji } from '../../utils/emojis';
import { IUserInfo } from '../../types/user';

interface IConversationProps {
  conversation: IUserInfo;
}

const Conversation: React.FC<IConversationProps> = ({ conversation }) => {
  const { onlineUsers } = useSocketContext();
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);
  // 대화 상대별로 고정된 이모지 (리렌더 시 깜빡이지 않도록 _id 기준 메모이즈)
  const emoji = useMemo(() => getRandomEmoji(), [conversation._id]);

  return (
    <div
      onClick={() => setSelectedConversation(conversation)}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer transition ${
        isSelected ? 'bg-brand/10' : 'hover:bg-paper'
      }`}
    >
      <div className="relative shrink-0">
        <img
          src={conversation.profilePic}
          alt={conversation.fullName}
          className="w-10 h-10 rounded-full object-cover bg-paper"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-online ring-2 ring-surface" />
        )}
      </div>

      <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
        <p
          className={`font-medium truncate ${
            isSelected ? 'text-brand' : 'text-ink'
          }`}
        >
          {conversation.fullName}
        </p>
        <span className="text-base shrink-0">{emoji}</span>
      </div>
    </div>
  );
};

export default Conversation;
