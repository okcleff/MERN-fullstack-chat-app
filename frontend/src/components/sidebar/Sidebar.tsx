import Conversations from './Conversations';
import LogoutButton from './LogoutButton';
import SearchInput from './SearchInput';

const Sidebar = () => {
  return (
    <div className="w-72 shrink-0 flex flex-col border-r border-line bg-surface">
      <div className="px-5 pt-5 pb-4">
        <span className="font-display text-lg font-semibold text-ink">
          ✦ ChatApp
        </span>
      </div>

      <div className="px-4 pb-3">
        <SearchInput />
      </div>

      <Conversations />

      <div className="px-4 py-3 border-t border-line">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Sidebar;
