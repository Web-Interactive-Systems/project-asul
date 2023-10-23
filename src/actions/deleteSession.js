import { supabase } from '@/lib/supabase';

export async function deleteSession({ session_id }) {
  const { data, error } = await supabase.from('Session').delete().eq('id', session_id);

  if (error) return { error };
  return { data: `session ${session_id} supprmiée.` };
}
