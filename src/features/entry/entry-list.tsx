import type { SetStateAction } from 'react';
import { Toolbar } from '../toolbar';
import type { EntryType } from './entry';
import { EntryListItem } from './entry-list-item';

interface EntryListProps {
  entries: EntryType[];
  setEntries: (value: SetStateAction<EntryType[]>) => void;
}

export function EntryList({
  entries,
  setEntries,
}: EntryListProps): JSX.Element {
  return (
    <div className="flex flex-col items-center h-full">
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
      <div className="mt-auto mb-7">
        <Toolbar setEntries={setEntries} />
      </div>
    </div>
  );
}
