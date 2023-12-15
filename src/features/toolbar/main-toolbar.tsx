import { CalendarDays, PencilLine, ScrollText, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import type { SetStateAction } from 'react';
import { Menubar } from '@/components/ui/menubar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import type { EntryType } from '../entry';
import { UserMenu } from './user-menu';

interface ToolbarProps {
  setEntries: (value: SetStateAction<EntryType[]>) => void;
}

export function Toolbar({ setEntries }: ToolbarProps): JSX.Element {
  const navigate = useNavigate();

  function handleNewEntry(): void {
    const newId = crypto.randomUUID();

    setEntries((prevEntries) => {
      return prevEntries.concat({
        id: newId,
        content: `# ${new Date().toLocaleDateString()}`,
        timestamp: new Date(),
      });
    });

    navigate(`/entry/${newId}`);
  }

  return (
    <Menubar className="h-12">
      <Link to="/">
        <Button variant="ghost">
          <ScrollText />
        </Button>
      </Link>
      <Link to="/calender">
        <Button variant="ghost">
          <CalendarDays />
        </Button>
      </Link>
      <Button onClick={handleNewEntry}>
        <PencilLine />
      </Button>
      <Link to="/settings">
        <Button variant="ghost">
          <Settings />
        </Button>
      </Link>
      <Separator orientation="vertical" />
      <UserMenu />
    </Menubar>
  );
}
