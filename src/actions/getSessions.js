import { supabase } from '../lib/supabase';
import { format } from 'date-fns';

export async function getSessions() {
  //
  const { data, error } = await supabase.from('Session').select();
  // .gt('session_date', format(new Date(), 'yyyy-MM-dd', { local: { code: 'fr-FR' } }));

  // console.log("getMatches", data, error);

  if (error) {
    console.error('error', error);
    throw Error(error.message);
  }

  // console.log("success", data);

  return data;
}
