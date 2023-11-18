import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import type { EntryType } from '.';

interface EntryListItemProps {
  entry: EntryType;
}

export function EntryListItem({ entry }: EntryListItemProps): JSX.Element {
  return (
    <li>
      <Link
        className="flex flex-col items-start w-96 border rounded-lg p-4 my-2 border-stone-400 hover:bg-stone-100 hover:cursor-pointer"
        to={`/entry/${entry.id}`}
      >
        <Markdown className="prose prose-sm">
          {entry.content.length < 18
            ? entry.content
            : entry.content.split('\n')[0]?.substring(0, 18).concat('...')}
        </Markdown>

        <Separator className="my-3" />

        <span className="text-sm text-stone-500">
          {entry.timestamp.toLocaleDateString()}
        </span>
      </Link>
    </li>
  );
}
