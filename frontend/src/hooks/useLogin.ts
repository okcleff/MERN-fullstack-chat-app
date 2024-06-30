import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { IUserResponse } from '../types/user';

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
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        }
      );

      const data: IUserResponse = await res.json();
      if (!data.result) {
        throw new Error(data.message);
      }

      localStorage.setItem('chat-user', JSON.stringify(data.data));

      setAuthUser(data.data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
