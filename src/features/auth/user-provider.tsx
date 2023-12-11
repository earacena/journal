import type { UserCredential } from 'firebase/auth';
import type { SetStateAction } from 'react';
import { createContext, useState } from 'react';

interface UserContextType {
  userCredential: UserCredential | null;
  setUserCredential: (value: SetStateAction<UserCredential | null>) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserCredentialProvider({
  children,
}: UserProviderProps): JSX.Element {
  const [userCredential, setUserCredential] = useState<UserCredential | null>(
    null,
  );

  return (
    <UserContext.Provider value={{ userCredential, setUserCredential }}>
      {children}
    </UserContext.Provider>
  );
}
