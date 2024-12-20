import { LocalStorage } from '@libraries/storage';
import React, { createContext, useContext, useMemo, useState } from 'react';

interface IContextProps {
  isAuthenticated: boolean;
  user: any;
  setToken: (token: string) => void;
  setUser: (user: any) => void;
  setLogout: () => void;
}

const AppContext = createContext<IContextProps>({
  isAuthenticated: false,
  user: null,
  setToken: () => {},
  setLogout: () => {},
  setUser: () => {},
});

interface IProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<IProviderProps> = ({ children }) => {
  const localToken: any = LocalStorage.getItem('user_token');
  const localUser: any = LocalStorage.getItem('user_profile');
  const [token, setTokenState] = useState<string | null>(localToken);
  const [user, setUserState] = useState<any | null>(localUser ? JSON.parse(localUser) : null);

  const setToken = (token: string) => {
    if (!token) {
      LocalStorage.removeItem('user_token');
    } else {
      LocalStorage.setItem('user_token', token);
    }

    setTokenState(token);
  };

  const setUser = (user: any) => {
    if (!user) {
      LocalStorage.removeItem('user_profile');
    } else {
      LocalStorage.setItem('user_profile', user);
    }

    setUserState(user);
  };

  const setLogout = () => {
    setUserState(null);
    setTokenState(null);
  };

  const contextPayload = useMemo(
    () => ({
      isAuthenticated: !!token,
      user,
      setToken,
      setUser,
      setLogout,
    }),
    [token, user],
  );

  return <AppContext.Provider value={contextPayload}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => useContext(AppContext);
