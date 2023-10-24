import { supabase, postgres } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { $userSession } from '@/store/store';
import GoogleOneTap from './GoogleOneTap';

export default function UserManager() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    let postgresListeners = [];
    const { data: Listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'INITIAL_SESSION') {
        setLoggedIn(!!session);
        setVerified(true);
      }
      if (session) {
        let currentSession = $userSession.get();
        if (event === 'SIGNED_IN' && !currentSession) {
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
            const currSess = $userSession.get();
            if (currSess.player.id === payload.new.id) {
              console.log('new session', payload.new);

              $userSession.set({
                ...currSess,
                player: payload.new,
              });
            }
          }

          postgresListeners.push(postgres.player.on('UPDATE', sessionHandler));
          session.player = data[0];
        }
      }
      $userSession.set(session);
    });

    return () => {
      if (postgresListeners.length > 0) {
        postgresListeners.forEach((listener) => {
          listener.unsubscribe('*');
        });
      }
      Listener.subscription.unsubscribe();
    };
  }, []);

  if (verified && !loggedIn) {
    return <GoogleOneTap />;
  }
}
