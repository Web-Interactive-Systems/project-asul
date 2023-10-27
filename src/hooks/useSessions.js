import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

export function useSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase
      .from('Session')
      .select()
      .gte('session_date', format(new Date(), 'yyyy-MM-01', { local: { code: 'fr-FR' } }))
      .then(({ data, error }) => {
        if (error) {
          setError(error);
          return;
        }
        setSessions(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return { sessions, loading, error };
}
