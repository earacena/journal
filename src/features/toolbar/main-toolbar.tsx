import {
  CalendarDays,
  LogIn,
  LogOut,
  PencilLine,
  Scroll,
  ScrollText,
  Settings,
  Type,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { logger } from '@/utils/logger';
import { UserCredentialContext } from '../auth/user-provider';

export function MainToolbar(): JSX.Element {
  const auth = getAuth();
  const user = useContext(UserCredentialContext);

  async function handleSignOut(): Promise<void> {
    await auth.signOut();
    user?.setAuthUser(null);
    logger.log('User signed out.');
  }

  useEffect(() => {
    logger.log(user);
  }, [user]);

  return (
    <Menubar className="h-12">
      <MenubarMenu>
        <MenubarTrigger>
          <Scroll />
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Type />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>Alt+Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧+Alt+Z</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <Button>
        <PencilLine />
      </Button>

      <Separator orientation="vertical" />
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Avatar className="p-1">
            <AvatarFallback>
              {user?.authUser
                ? user.authUser.displayName?.substring(0, 2)
                : '?'}
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
          <Link to="/">
            <MenubarItem>
              <ScrollText className="mr-2" />
              Entries
            </MenubarItem>
          </Link>
          <MenubarItem>
            <CalendarDays className="mr-2" />
            Calender
          </MenubarItem>
          <Link to="/settings">
            <MenubarItem>
              <Settings className="mr-2" />
              Settings
            </MenubarItem>
          </Link>
          {user?.authUser ? (
            <MenubarItem onClick={() => void handleSignOut()}>
              <LogOut className="mr-2" />
              Sign Out
            </MenubarItem>
          ) : null}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
