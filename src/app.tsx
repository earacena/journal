import Markdown from 'react-markdown';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Toolbar } from './features/toolbar';

export function App(): JSX.Element {
  const [timestamp, setTimestamp] = useState<Date>(new Date());
  const [entryContent, setEntryContent] = useState<string>('');
  const [markdownPreviewEnabled, setMarkdownPreviewEnabled] =
    useState<boolean>(false);

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
            setTimestamp(new Date());
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
        setMarkdownPreviewEnabled={setMarkdownPreviewEnabled}
      />
    </div>
  );
}
