import { supabase } from '@/lib/supabase';

export async function getAuthUser() {
  const res = await supabase.auth.getUser();
  if (res.error) {
    throw new Error(res.error.message);
  }
  return res.data;
}
