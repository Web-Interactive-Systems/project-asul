import { supabase } from '@/lib/supabase';
import SessionStore from '@/Stores/session';
import { useEffect } from 'react';

export default function UserLayout() {
  const $session = SessionStore.get();
  console.log($session);

  useEffect(() => {
    const { data: Listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        location.href = '/account?init=true';
        return;
      }

      if (session) {
        const { data } = await supabase.from('Player').select('*').eq('id', session.user.id);

        if (!data) {
          const user = session.user;
          console.log('user: ', user);
          const { data: player } = await supabase
            .from('Player')
            .insert({
              id: user.id,
              username: user.user_metadata.name,
              avatar: user.user_metadata.avatar_url,
            })
            .select();
          session.player = player[0];
        } else {
          session.player = data[0];
        }
      }
      SessionStore.set(session);
    });

    return Listener.subscription.unsubscribe;
  }, []);

  return null;
}
