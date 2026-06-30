import useGetConversations from '../../hooks/useGetConversations';
import Spinner from '../Spinner';
import Conversation from './Conversation';

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="flex-1 overflow-auto px-2 py-1">
      {conversations.map((conversation) => (
        <Conversation key={conversation._id} conversation={conversation} />
      ))}

      {loading && (
        <div className="flex justify-center py-4 text-muted">
          <Spinner className="w-5 h-5" />
        </div>
      )}

      {!loading && conversations.length === 0 && (
        <p className="text-center text-sm text-muted py-6">No people yet</p>
      )}
    </div>
  );
};

export default Conversations;
