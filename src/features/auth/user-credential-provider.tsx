import { getAuth, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import type { SetStateAction } from 'react';
import { createContext, useEffect, useState } from 'react';
import { logger } from '@/utils/logger';

interface UserContextType {
  authUser: User | null;
  setAuthUser: (value: SetStateAction<User | null>) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserCredentialContext = createContext<UserContextType | null>(
  null,
);

export function UserCredentialProvider({
  children,
}: UserProviderProps): JSX.Element {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        logger.log('User is currently logged out');
        setAuthUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <UserCredentialContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </UserCredentialContext.Provider>
  );
}
