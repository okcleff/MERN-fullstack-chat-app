import MessageContainer from '../../components/messages/MessageContainer';
import Sidebar from '../../components/sidebar/Sidebar';

const Home = () => {
  return (
    <div className="w-full max-w-4xl h-[80vh] max-h-[640px] flex bg-surface rounded-3xl border border-line shadow-[0_16px_48px_rgba(16,24,40,0.10)] overflow-hidden">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
