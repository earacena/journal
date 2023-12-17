import { Calendar } from '@/components/ui/calendar';

export function EntryCalendar(): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl font-bold my-3 underline">Calender</h2>
      <Calendar />
    </div>
  );
}
