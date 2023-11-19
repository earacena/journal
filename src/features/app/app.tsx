import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import type { EntryType } from '@/features/entry';
import { EntryList, Entry } from '@/features/entry';
import { Toaster } from '@/components/ui/toaster';

export function App(): JSX.Element {
  const [entries, setEntries] = useState<EntryType[]>([
    {
      id: 'abcd1',
      content: '# Happy day\nThese are the things I got done:\n* Work\n* Sleep',
      timestamp: new Date(),
    },
  ]);

  return (
    <>
      <Routes>
        <Route element={<EntryList entries={entries} />} path="/" />
        <Route
          element={<Entry entries={entries} setEntries={setEntries} />}
          path="entry/:id"
        />
      </Routes>
      <Toaster />
    </>
  );
}
