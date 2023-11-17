import { Separator } from '@/components/ui/separator';
import type { EntryType } from './entry';

interface EntriesProps {
  entries: EntryType[];
}

export function Entries({ entries }: EntriesProps): JSX.Element {
  return (
    <ul>
      {entries.length === 0 ? (
        <span className="text-stone-200">Add some entries!</span>
      ) : (
        ''
      )}
      {entries.map((e) => (
        <li key={e.id}>
          {e.content}
          <Separator className="mx-2" orientation="vertical" />
          {e.timestamp.toLocaleDateString()}
        </li>
      ))}
    </ul>
  );
}
