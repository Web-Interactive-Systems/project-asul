import { supabase } from '../lib/supabase';

export function getGrades() {
  return supabase.from('Grade').select('*');
}
