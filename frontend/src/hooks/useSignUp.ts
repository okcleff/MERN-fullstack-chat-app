import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import { IUserInfo } from '../types/user';
import { apiClient } from '../utils/apiClient';
import { useAsyncAction } from './useAsyncAction';

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
  const { loading, run } = useAsyncAction();
  const { login: setLoggedInUser } = useAuthContext();

  const signUp = async (data: ISignUpData): Promise<void> => {
    if (!handleInputErrors(data)) return;

    await run(async () => {
      const user = await apiClient<IUserInfo>('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      setLoggedInUser(user);
    });
  };

  return { loading, signUp };
};

export default useSignUp;
