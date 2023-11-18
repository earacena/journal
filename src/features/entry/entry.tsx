import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Toolbar } from '../toolbar';

export interface EntryType {
  id: string;
  content: string;
  timestamp: Date;
}

interface EntryProps {
  entries: EntryType[];
  setEntries: (value: React.SetStateAction<EntryType[]>) => void;
}

export function Entry({ entries, setEntries }: EntryProps): JSX.Element {
  const { id } = useParams();
  const entry = entries.find((e) => e.id === id) ?? undefined;
  const [timestamp, setTimestamp] = useState<Date>(
    entry?.timestamp ?? new Date(),
  );
  const [entryContent, setEntryContent] = useState<string>(
    entry?.content ?? '',
  );
  const [markdownPreviewEnabled, setMarkdownPreviewEnabled] =
    useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newTimestamp = new Date();
      setEntries((prevEntries) =>
        prevEntries.map((e) =>
          e.id === entry?.id
            ? { ...e, content: entryContent, newTimestamp }
            : e,
        ),
      );
      setTimestamp(newTimestamp);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [entry?.id, entryContent, setEntries]);

  return (
    <div className="flex w-full h-full flex-col items-center p-4">
      {markdownPreviewEnabled ? (
        <div className="p-4 grow border border-dotted border-gray-400 rounded-sm mb-2 w-96 h-full">
          <Markdown className="prose prose-sm">{entryContent}</Markdown>
        </div>
      ) : (
        <Textarea
          className="grow resize-none mb-2 w-96 h-full"
          onChange={(event) => {
            setEntryContent(event.target.value);
          }}
          value={entryContent}
        />
      )}
      {markdownPreviewEnabled ? (
        <div className="text-sm rounded-md bg-stone-700 text-stone-100 p-2 mb-1 font-extrabold">
          PREVIEW
        </div>
      ) : (
        <span className="text-gray-500 p-2">
          Saved {timestamp.toLocaleDateString()} ~{' '}
          {timestamp.toLocaleTimeString()}
        </span>
      )}
      <Toolbar
        markdownPreviewEnabled={markdownPreviewEnabled}
        setEntries={setEntries}
        setMarkdownPreviewEnabled={setMarkdownPreviewEnabled}
      />
    </div>
  );
}
