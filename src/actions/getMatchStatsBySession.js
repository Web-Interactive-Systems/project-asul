import { supabase } from "../lib/supabase";

export async function getMatchStatsBySession(session_id) {

  const { data, error } = await supabase
    .from("Match")
    .select()
    .eq("session_id", session_id);

  // console.log("getMatchStatsBySession", data, error);

  if (error) {
    console.error("error", error);
    throw Error(error.message);
  }

  // console.log("success", data);

  // Stats
  // ToDo : return interesting stats
  const MATCHS_COUNT = data.length;

  return {
      nbMatchs: MATCHS_COUNT,
  };
}