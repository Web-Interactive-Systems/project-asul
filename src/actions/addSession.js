import { supabase } from '@/lib/supabase';

export async function addSession({ sessions }) {
  const { data, error } = await supabase.from('Session').upsert(sessions);

  if (error) return { error };
  return { data };
}
