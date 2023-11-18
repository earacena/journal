import type { EntryType } from './entry';
import { EntryListItem } from './entry-list-item';

interface EntryListProps {
  entries: EntryType[];
}

export function EntryList({ entries }: EntryListProps): JSX.Element {
  return (
    <ul className="flex flex-col items-center mx-auto w-96">
      {entries.length === 0 ? (
        <span className="text-stone-200">Add some entries!</span>
      ) : (
        ''
      )}
      {entries.map((e) => (
        <EntryListItem entry={e} key={e.id} />
      ))}
    </ul>
  );
}
