import { supabase, postgres } from '@/lib/supabase';
import SessionStore from '@/store/session';
import { useEffect } from 'react';

export default function UserManager() {
  useEffect(() => {
    let postgresListener = null;
    const { data: Listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        if (event === 'SIGNED_IN') {
          location.href = '/account?init=true';
          return;
        }
        const { data } = await supabase.from('Player').select('*').eq('id', session.user.id);

        if (data.length === 0) {
          const user = session.user;
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
          function sessionHandler(payload) {
            const currSess = SessionStore.get();
            if (currSess.player.id === payload.new.id) {
              SessionStore.set({
                ...currSess,
                player: payload.new,
              });
            }
          }

          postgresListener = postgres.player.on('UPDATE', sessionHandler);

          session.player = data[0];
        }
      }
      SessionStore.set(session);
    });

    return () => {
      postgresListener.unsubscribe('*');
      Listener.subscription.unsubscribe();
    };
  }, []);

  return null;
}
