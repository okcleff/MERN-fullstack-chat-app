import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../utils/apiClient';

/**
 * 비동기 액션의 공통 패턴(로딩 토글 + 에러 토스트)을 한곳에 모은 훅.
 * 각 훅은 도메인 로직(run에 넘기는 action)에만 집중하면 된다.
 */
export function useAsyncAction() {
  const [loading, setLoading] = useState(false);

  const run = useCallback(
    async <T>(action: () => Promise<T>): Promise<T | undefined> => {
      setLoading(true);
      try {
        return await action();
      } catch (error) {
        toast.error(getErrorMessage(error));
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, run };
}
