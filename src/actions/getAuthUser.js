import { supabase } from '@/lib/supabase';

export async function getAuthUser() {
  const res = await supabase.auth.getUser();

  if (res.error) {
    throw new Error(res.error.message);
  }

  console.log('getAuthUser', res.data.user);

  return res.data.user;
}
