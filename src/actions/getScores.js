import { supabase } from '../lib/supabase';

export function getScores() {
  return supabase.from('Scores').select('*');
}
