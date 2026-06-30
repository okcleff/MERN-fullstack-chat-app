import { BiLogOut } from 'react-icons/bi';
import useLogout from '../../hooks/useLogout';
import Spinner from '../Spinner';

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <button
      onClick={logout}
      disabled={loading}
      className="flex items-center gap-2 text-sm text-muted hover:text-brand transition disabled:opacity-60"
    >
      {loading ? (
        <Spinner className="w-5 h-5" />
      ) : (
        <BiLogOut className="w-5 h-5" />
      )}
      <span>Log out</span>
    </button>
  );
};

export default LogoutButton;
