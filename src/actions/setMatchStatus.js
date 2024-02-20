import { supabase } from '../lib/supabase';

export function setMatchStatus(matchId, status) {
  return supabase.from('Match').update({ status }).eq('id', matchId);
}
