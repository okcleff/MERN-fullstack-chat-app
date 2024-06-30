import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IAuthUser {
  _id: string;
  username: string;
  fullName: string;
  profilePic: string;
}

interface IAuthContextType {
  authUser: IAuthUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<IAuthUser | null>>;
}

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
    const storedUser = localStorage.getItem('chat-user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
