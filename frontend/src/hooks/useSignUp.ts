import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { IUserResponse } from '../types/user';

interface ISignUpData {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}: ISignUpData): boolean {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error('Please fill in all fields');
    return false;
  }

  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return false;
  }

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return false;
  }

  return true;
}

const useSignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();

  const signUp = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }: ISignUpData): Promise<void> => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });

    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

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

  return { loading, signUp };
};

export default useSignUp;
