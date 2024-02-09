import { supabase } from '../lib/supabase';
import { useStore } from '@nanostores/react';
import { $userSession } from '@/store/store';
import { getAuthUser } from '.';

export async function getInitialNotifications() {
  const user = await getAuthUser();
  console.log('user', user);
  const userPending = await supabase
    .from('Match')
    .select('*')
    .eq('status', 'created')
    .or(`player_id.eq.${user.id},creator_id.eq.${user.id}`);

  return userPending;
}
