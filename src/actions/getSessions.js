import { supabase } from '../lib/supabase';
import { format } from 'date-fns';

export async function getSessions(search_query) {
  // console.log('search date', search_query);

  let query = supabase
    .from('Session')
    .select()
    .gte('session_date', format(new Date(), 'yyyy-MM-dd', { local: { code: 'fr-FR' } }));
  query = search_query ? query.eq('session_date', search_query) : query;
  const { data, error } = await query;

  // console.log("getMatches", data, error);

  if (error) {
    console.error('error', error);
    throw Error(error.message);
  }

  // console.log("success", data);

  return data;
}
