import type { SetStateAction } from 'react';
import type { EntryType } from './entry';
import { EntryListItem } from './entry-list-item';

interface EntryListProps {
  entries: EntryType[];
  setEntries: (value: SetStateAction<EntryType[]>) => void;
}

export function EntryList({ entries }: EntryListProps): JSX.Element {
  return (
    <div className="flex flex-col items-center h-full">
      <h2 className="text-4xl font-bold my-3 underline">Entries</h2>
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
    </div>
  );
}
