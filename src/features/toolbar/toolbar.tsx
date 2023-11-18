import type { SetStateAction } from 'react';
import { Eye, Scroll, Settings, Type } from 'lucide-react';
import { Link } from 'react-router-dom';
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
import { Toggle } from '@/components/ui/toggle';
import type { EntryType } from '../entry';

interface ToolbarProps {
  setEntries: (value: SetStateAction<EntryType[]>) => void;
  markdownPreviewEnabled: boolean;
  setMarkdownPreviewEnabled: (value: React.SetStateAction<boolean>) => void;
}

export function Toolbar({
  setEntries,
  markdownPreviewEnabled,
  setMarkdownPreviewEnabled,
}: ToolbarProps): JSX.Element {
  return (
    <Menubar className="h-12">
      <Toggle
        className="data-[state=on]:bg-stone-700 data-[state=on]:text-stone-100"
        onClick={() => {
          setMarkdownPreviewEnabled(!markdownPreviewEnabled);
        }}
      >
        <Eye />
      </Toggle>
      <MenubarMenu>
        <MenubarTrigger>
          <Scroll />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onClick={() => {
              setEntries((prevEntries) =>
                prevEntries.concat({
                  id: 'new',
                  content: '# '.concat(new Date().toLocaleDateString()),
                  timestamp: new Date(),
                }),
              );

              // toast announcing new entry and button to go check it out
            }}
          >
            New Entry <MenubarShortcut>Alt+T</MenubarShortcut>
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
        <MenubarContent>
          <Link to="/">
            <MenubarItem>Entries</MenubarItem>
          </Link>
          <MenubarItem>Calender</MenubarItem>
          <MenubarItem>Preferences</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
