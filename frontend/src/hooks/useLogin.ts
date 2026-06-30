import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { IUserInfo } from '../types/user';
import { apiClient } from '../utils/apiClient';
import { useAsyncAction } from './useAsyncAction';

function handleInputErrors(username: string, password: string) {
  if (!username || !password) {
    toast.error('Please fill in all fields');
    return false;
  }

  return true;
}

const useLogin = () => {
  const { loading, run } = useAsyncAction();
  const { login: setLoggedInUser } = useAuthContext();

  const login = async (username: string, password: string) => {
    if (!handleInputErrors(username, password)) return;

    await run(async () => {
      const user = await apiClient<IUserInfo>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      setLoggedInUser(user);
    });
  };

  return { loading, login };
};

export default useLogin;
