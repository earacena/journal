import Markdown from 'react-markdown';
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Toolbar } from './features/toolbar';

export function App(): JSX.Element {
  const [entryContent, setEntryContent] = useState<string>('');
  const [markdownPreviewEnabled, setMarkdownPreviewEnabled] =
    useState<boolean>(false);

  return (
    <div className="flex w-full h-full flex-col items-center p-4">
      {markdownPreviewEnabled ? (
        <div className="p-4 grow border border-dotted border-gray-400 rounded-sm mb-2 w-96 h-full">
          <Markdown className="prose">{entryContent}</Markdown>
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
      <Toolbar
        markdownPreviewEnabled={markdownPreviewEnabled}
        setMarkdownPreviewEnabled={setMarkdownPreviewEnabled}
      />
    </div>
  );
}
