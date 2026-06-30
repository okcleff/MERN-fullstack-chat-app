import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { IUserInfo } from '../types/user';
import { apiClient, getErrorMessage } from '../utils/apiClient';

function handleInputErrors(username: string, password: string) {
  if (!username || !password) {
    toast.error('Please fill in all fields');
    return false;
  }

  return true;
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username: string, password: string) => {
    const success = handleInputErrors(username, password);

    if (!success) return;

    setLoading(true);

    try {
      const user = await apiClient<IUserInfo>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      localStorage.setItem('chat-user', JSON.stringify(user));
      setAuthUser(user);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
