import { supabase } from "../lib/supabase";

export async function getSessions() {
  //
  const { data, error } = await supabase.from("Session").select();

  // console.log("getMatches", data, error);

  if (error) {
    console.error("error", error);
    throw Error(error.message);
  }

  // console.log("success", data);

  return data;
}