import { supabase } from "../lib/supabase";

export async function addMatch(name) {
  //
  const { data, error } = await supabase.from("Match").insert([
    {
      title: name,
    },
  ]);
}