import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from 'react';

interface IAuthUser {
  _id: string;
  username: string;
  fullName: string;
  profilePic: string;
}

interface IAuthContextType {
  authUser: IAuthUser | null;
  login: (user: IAuthUser) => void;
  logout: () => void;
}

const STORAGE_KEY = 'chat-user';

export const AuthContext = createContext<IAuthContextType | undefined>(
  undefined
);

export const useAuthContext = (): IAuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider'
    );
  }
  return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<IAuthUser | null>(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 인증 상태의 영속화(localStorage)와 메모리 상태를 한곳에서 함께 관리한다.
  const login = useCallback((user: IAuthUser) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    setAuthUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
