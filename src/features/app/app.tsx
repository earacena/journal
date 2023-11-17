import { useState } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import type { EntryType } from '@/features/entry';
import { Entries, Entry } from '@/features/entry';

export function App(): JSX.Element {
  const [entries, setEntries] = useState<EntryType[]>([
    {
      id: 'abcd1',
      content: '# Happy day\nThese are the things I got done:\n* Work\n* Sleep',
      timestamp: new Date(),
    },
  ]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Entries entries={entries} />} path="/">
        <Route
          element={<Entry entries={entries} setEntries={setEntries} />}
          path="entry/:id"
        />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}
