import { useContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import type { EntryType } from '@/features/entry';
import { EntryList, Entry } from '@/features/entry';
import { Toaster } from '@/components/ui/toaster';
import { logger } from '@/utils/logger';
import {
  LoginMenu,
  EmailLoginForm,
  EmailSignUpForm,
  UserCredentialContext,
} from '../auth';
import { EntryCalendar } from '../calender';
import { Toolbar } from '../toolbar';
import { Settings } from '../settings';

export function App(): JSX.Element {
  const authUser = useContext(UserCredentialContext);
  const [entries, setEntries] = useState<EntryType[]>([
    {
      id: crypto.randomUUID(),
      content: '# Happy day\nThese are the things I got done:\n* Work\n* Sleep',
      timestamp: new Date(),
    },
  ]);

  const [markdownPreviewEnabled, setMarkdownPreviewEnabled] =
    useState<boolean>(false);

  const isUserAuthenticated =
    authUser?.token !== null && authUser?.userId !== null;
  logger.log(authUser?.userId);
  return (
    <div className="flex flex-col items-center h-full">
      <Routes>
        <Route
          element={<EntryList entries={entries} onlyList={false} />}
          path="/"
        />
        <Route
          element={
            <Entry
              entries={entries}
              markdownPreviewEnabled={markdownPreviewEnabled}
              setEntries={setEntries}
            />
          }
          path="entry/:id"
        />
        <Route element={<LoginMenu />} path="/signin" />
        <Route element={<EmailLoginForm />} path="/signin/email" />
        <Route element={<EmailSignUpForm />} path="/signup/email" />
        <Route element={<EntryCalendar entries={entries} />} path="/calendar" />
        <Route element={<Settings />} path="/settings" />
      </Routes>
      {isUserAuthenticated ? (
        <Toolbar
          markdownPreviewEnabled={markdownPreviewEnabled}
          setEntries={setEntries}
          setMarkdownPreviewEnabled={setMarkdownPreviewEnabled}
        />
      ) : null}
      <Toaster />
    </div>
  );
}
