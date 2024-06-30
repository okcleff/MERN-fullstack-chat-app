import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IUserInfo, IGetUsersResponse } from '../types/user';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState<IUserInfo[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/users`, {
          credentials: 'include',
        });

        const data: IGetUsersResponse = await res.json();

        if (!data.result) {
          throw new Error(data.message);
        }

        setConversations(data.filteredUsers);
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

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
