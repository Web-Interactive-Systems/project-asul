import { supabase } from '../lib/supabase';

export async function getMatchesBySession(sessionId) {
  //
  // const { data, error } = await supabase.from("Match").select().eq("session_id", sessionId);
  return supabase
    .from('Match')
    .select('*, Score ( match_id, winer_id, winer_score, loser_id, loser_score )')
    .eq('session_id', sessionId);
}
