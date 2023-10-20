import { supabase } from '@/lib/supabase';

export function addMatch(payload) {
  return supabase.from('Match').insert({
    //
  });
}
