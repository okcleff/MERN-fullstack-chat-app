import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { apiClient, getErrorMessage } from '../utils/apiClient';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);

    try {
      await apiClient('/api/auth/logout', { method: 'POST' });

      localStorage.removeItem('chat-user');
      setAuthUser(null);
      toast.success('로그아웃되었습니다');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
