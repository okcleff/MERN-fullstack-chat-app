import React, { useMemo } from 'react';
import { useSocketContext } from '../../context/SocketContext';
import useConversation from '../../zustand/useConversation';
import { getRandomEmoji } from '../../utils/emojis';
import { IUserInfo } from '../../types/user';

interface IConversationProps {
  conversation: IUserInfo;
  isLastIdx: boolean;
}

const Conversation: React.FC<IConversationProps> = ({
  conversation,
  isLastIdx,
}) => {
  const { onlineUsers } = useSocketContext();
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === conversation._id;
  const isOnline = onlineUsers.includes(conversation._id);
  // 대화 상대별로 고정된 이모지 (리렌더 시 깜빡이지 않도록 _id 기준 메모이즈)
  const emoji = useMemo(() => getRandomEmoji(), [conversation._id]);

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? 'bg-sky-500' : ''}
			`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>

      {!isLastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Conversation;
