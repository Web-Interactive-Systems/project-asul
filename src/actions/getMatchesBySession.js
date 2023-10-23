import { supabase } from "../lib/supabase";

export async function getMatchesBySession(sessionId) {
  //
  // const { data, error } = await supabase.from("Match").select().eq("session_id", sessionId);
  const { data, error } = await supabase.from('Match').select('*, Score ( match_id, winer_id, winer_score, loser_id, loser_score )').eq('session_id', sessionId);

  console.log("getMatchesBySession", data);

  if (error) {
    console.error("error", error);
    throw Error(error.message);
  }

  // console.log("success", data);

  return data;
}