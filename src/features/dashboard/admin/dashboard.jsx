import mockData from '@/features/dashboard/data.json';
import { Leaderboard } from '@/features/dashboard/Leaderboard';
import { MultipleDatePicker } from '@/components/MultiDatePicker.jsx';
import { useMemo, useState } from 'react';

import { useSessions } from '@/hooks/useSessions.js';

const Data = mockData.map((d) => {
  return {
    ...d,
    date: new Date(d.date),
  };
});

export function Dashboard() {
  const [selectedDates, onDatesChange] = useState([]);
  const { sessions } = useSessions();

  console.log({ sessions });

  const includeDates = useMemo(() => {
    if (!sessions) return [];
    return sessions.map((session) => new Date(session.session_date));
  }, [sessions]);

  const handleUnselectDate = () => {};
  return (
    <>
      <MultipleDatePicker
        selectedDates={selectedDates}
        onDatesChange={onDatesChange}
        handleSupprClick={handleUnselectDate}
        mode="single"
        include={includeDates}
      />
      <Leaderboard session={selectedDates} />
    </>
  );
}
