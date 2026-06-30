import { useEffect } from 'react';
import useConversation from '../zustand/useConversation';

// 대화 상대 목록을 가져온다. 실제 fetch/상태는 store가 담당하므로
// 여러 컴포넌트에서 호출해도 요청은 한 번만 나간다.
const useGetConversations = () => {
  const { conversations, conversationsLoading, fetchConversations } =
    useConversation();

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return { loading: conversationsLoading, conversations };
};

export default useGetConversations;
