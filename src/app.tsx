import { Textarea } from '@/components/ui/textarea';
import { Toolbar } from './features/toolbar';

export function App(): JSX.Element {
  return (
    <div className="flex w-full h-full flex-col items-center p-4">
      <Textarea className="grow resize-none mb-2 w-96 h-full" />
      <Toolbar />
    </div>
  );
}
