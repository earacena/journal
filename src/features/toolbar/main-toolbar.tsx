import { CalendarDays, Eye, Home, PencilLine, Settings } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, type SetStateAction, useEffect } from 'react';
import { Menubar } from '@/components/ui/menubar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import type { EntryType } from '../entry';
import { UserMenu } from './user-menu';

interface ToolbarProps {
  markdownPreviewEnabled: boolean;
  setMarkdownPreviewEnabled: (value: SetStateAction<boolean>) => void;
  setEntries: (value: SetStateAction<EntryType[]>) => void;
}

export function Toolbar({
  markdownPreviewEnabled,
  setEntries,
  setMarkdownPreviewEnabled,
}: ToolbarProps): JSX.Element {
  const [selected, setSelected] = useState<number>(0);

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const isEditingEntry = pathname.split('/')[1] === 'entry';

  useEffect(() => {
    if (pathname.split('/')[1] === 'entry') {
      setSelected(-1);
    }
  }, [pathname]);

  function handleNewEntry(): void {
    setSelected(-1);
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
    <Menubar className="h-12 mt-auto  mb-4">
      <Link
        onClick={() => {
          setSelected(0);
        }}
        to="/"
      >
        <Button
          className={`${selected === 0 ? 'bg-stone-200' : ''}`}
          variant="ghost"
        >
          <Home />
        </Button>
      </Link>
      <Link
        onClick={() => {
          setSelected(1);
        }}
        to="/calendar"
      >
        <Button
          className={`${selected === 1 ? 'bg-stone-200' : ''}`}
          variant="ghost"
        >
          <CalendarDays />
        </Button>
      </Link>
      {!isEditingEntry ? (
        <Button onClick={handleNewEntry}>
          <PencilLine />
        </Button>
      ) : (
        <Toggle
          className="data-[state=on]:bg-stone-700 data-[state=on]:text-stone-100"
          onClick={() => {
            setMarkdownPreviewEnabled(!markdownPreviewEnabled);
          }}
        >
          <Eye />
        </Toggle>
      )}
      <Link to="/settings">
        <Button
          className={`${selected === 2 ? 'bg-stone-200' : ''}`}
          onClick={() => {
            setSelected(2);
          }}
          variant="ghost"
        >
          <Settings />
        </Button>
      </Link>
      <Separator orientation="vertical" />
      <UserMenu />
    </Menubar>
  );
}
