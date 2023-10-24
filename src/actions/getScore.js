import { supabase } from "../lib/supabase";

export async function getScores() {
  // const { data, error } = await supabase.from("Score").select()//.eq('winer_id',1)//.or('winer_id.eq.1,loser_id.eq.1');
  const { data, error } = await supabase.from("Score").select();
  if (error) {
   return {error}
  }
  return {data};
}