import { supabase } from '../lib/supabase';

export async function getUserMatchs() {
  //
  // Todo check if user_id is in creator_id or player_id
  const { data, error } = await supabase.from('Match').select();

  // console.log("getMatches", data, error);

  if (error) {
    console.error('error', error);
    throw Error(error.message);
  }

  // console.log("success", data);

  return data;
}
