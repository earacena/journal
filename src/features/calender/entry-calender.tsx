import { useState } from 'react';
import { isSameDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import type { EntryType } from '../entry';
import { EntryList } from '../entry';

interface EntryCalendarProps {
  entries: EntryType[];
}

export function EntryCalendar({ entries }: EntryCalendarProps): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const allEntryDates = entries.map((e) => e.timestamp);

  function handleSelect(day: Date): void {
    setSelectedDate(day);
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl font-bold my-3 underline">Calender</h2>
      <Calendar onDayClick={handleSelect} selected={allEntryDates} />
      Entries made on {selectedDate.toDateString()}
      <EntryList
        entries={entries.filter((e) => isSameDay(e.timestamp, selectedDate))}
        onlyList
      />
    </div>
  );
}
