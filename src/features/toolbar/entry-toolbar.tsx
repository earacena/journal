import type { SetStateAction } from 'react';
import { Eye, Scroll, Settings, Type } from 'lucide-react';
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
import { Toggle } from '@/components/ui/toggle';
import type { EntryType } from '../entry';
import { UserMenu } from './user-menu';

interface ToolbarProps {
  setEntries: (value: SetStateAction<EntryType[]>) => void;
  markdownPreviewEnabled: boolean;
  setMarkdownPreviewEnabled: (value: React.SetStateAction<boolean>) => void;
}

export function EntryToolbar({
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
      <UserMenu />
    </Menubar>
  );
}
