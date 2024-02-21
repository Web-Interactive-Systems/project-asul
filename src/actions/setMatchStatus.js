import { supabase } from '../lib/supabase';

export function updateMatchStatus(matchId, status) {
  return supabase.from('Match').update({ status }).eq('id', matchId);
}

export function updateMatch(matchId, payload) {
  return supabase.from('Match').update(payload).eq('id', matchId);
}
