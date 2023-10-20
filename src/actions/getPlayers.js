import { supabase } from '../lib/supabase';

export function getPlayers() {
  return supabase.from('Player').select('*');
}
