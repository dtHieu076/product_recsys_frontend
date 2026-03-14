import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/type';

interface UserContextType {
  user: User | null;
  user_session: string | null;
  loginUser: (user: User) => void;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [user_session, setUserSession] = useState<string | null>(() => {
    return localStorage.getItem('user_session');
  });

  const loginUser = (newUser: User) => {
    setUser(newUser);
    const newSession = uuidv4();
    setUserSession(newSession);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('user_session', newSession);
  };

  const logoutUser = () => {
    setUser(null);
    setUserSession(null);
    localStorage.removeItem('user');
    localStorage.removeItem('user_session');
  };

  return (
    <UserContext.Provider value={{ user, user_session, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
