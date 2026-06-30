import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { apiClient } from '../utils/apiClient';
import { useAsyncAction } from './useAsyncAction';

const useLogout = () => {
  const { loading, run } = useAsyncAction();
  const { logout: clearLoggedInUser } = useAuthContext();

  const logout = async () => {
    await run(async () => {
      await apiClient('/api/auth/logout', { method: 'POST' });

      clearLoggedInUser();
      toast.success('로그아웃되었습니다');
    });
  };

  return { loading, logout };
};

export default useLogout;
