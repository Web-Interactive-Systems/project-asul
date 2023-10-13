import { supabase } from "../lib/supabase";

export async function getMatches() {
  //
  const { data, error } = await supabase.from("Match").select();

  // console.log("getMatches", data, error);

  if (error) {
    console.error("error", error);
    throw Error(error.message);
  }

  // console.log("success", data);

  return data;
}