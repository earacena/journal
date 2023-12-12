import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import type { EntryType } from '@/features/entry';
import { EntryList, Entry } from '@/features/entry';
import { Toaster } from '@/components/ui/toaster';
import { LoginMenu, EmailLoginForm, EmailSignUpForm } from '../auth';

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
        <Route element={<LoginMenu />} path="/signin" />
        <Route element={<EmailLoginForm />} path="/signin/email" />
        <Route element={<EmailSignUpForm />} path="/signup/email" />
      </Routes>
      <Toaster />
    </>
  );
}
