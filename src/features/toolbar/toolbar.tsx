import { Scroll, Settings, Type } from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function Toolbar(): JSX.Element {
  return (
    <Menubar className="h-12">
      <MenubarMenu>
        <MenubarTrigger>
          <Scroll />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Page <MenubarShortcut>Alt+T</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
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
      <MenubarMenu>
        <MenubarTrigger>
          <Settings />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="about">About</MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
      <Separator orientation="vertical" />
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Avatar className="p-1">
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
