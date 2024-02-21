import { logger } from '@/lib/logger';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';

const log = logger('getSessions');

export async function getSessions(search_query) {
  let query = supabase
    .from('Session')
    .select()
    .gte('session_date', format(new Date(), 'yyyy-MM-dd', { local: { code: 'fr-FR' } }));

  query = search_query ? query.eq('session_date', search_query) : query;

  console.log('supa query', query);

  const { data, error } = await query;

  log.debug('search_query, data, error', search_query, data, error);

  if (error) {
    return { error };
  }

  return { data };
}
