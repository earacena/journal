import { PencilLine, Scroll, Type } from 'lucide-react';
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
import { UserMenu } from './user-menu';

export function Toolbar(): JSX.Element {
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
      <UserMenu />
    </Menubar>
  );
}
