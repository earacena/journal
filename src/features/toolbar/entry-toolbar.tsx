import type { SetStateAction } from 'react';
import { Eye, Home, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/button';
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
      <Link to="/">
        <Button variant="ghost">
          <Home />
        </Button>
      </Link>
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
