import { getAuth } from 'firebase/auth';
import { LogIn, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { logger } from '@/utils/logger';
import { UserCredentialContext } from '../auth/user-provider';

export function UserMenu(): JSX.Element {
  const auth = getAuth();
  const user = useContext(UserCredentialContext);

  async function handleSignOut(): Promise<void> {
    await auth.signOut();
    user?.setAuthUser(null);
    logger.log('User signed out.');
  }

  return (
    <MenubarMenu>
      <MenubarTrigger asChild>
        <Avatar className="p-1">
          <AvatarFallback>
            {user?.authUser ? user.authUser.displayName?.substring(0, 2) : '?'}
          </AvatarFallback>
        </Avatar>
      </MenubarTrigger>
      <MenubarContent>
        {user?.authUser === null && (
          <Link to="/signin">
            <MenubarItem>
              <LogIn className="mr-2" />
              Sign In
            </MenubarItem>
          </Link>
        )}
        {user?.authUser ? (
          <MenubarItem onClick={() => void handleSignOut()}>
            <LogOut className="mr-2" />
            Sign Out
          </MenubarItem>
        ) : null}
      </MenubarContent>
    </MenubarMenu>
  );
}
