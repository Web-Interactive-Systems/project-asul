import { supabase, postgres } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { $userSession } from '@/store/store';
import GoogleOneTap from './GoogleOneTap';
import { useStore } from '@nanostores/react';
import { logger } from '@/lib/logger';

const log = logger('UserManager');

export default function UserManager() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [verified, setVerified] = useState(false);
  const currentSession = useStore($userSession);

  log.debug('Render');

  useEffect(() => {
    log.debug('Render useEffect');
    let postgresListeners = [];

    const { data: Listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'INITIAL_SESSION') {
        setLoggedIn(!!session);
        setVerified(true);
      }

      if (session) {
        // let currentSession = $userSession.get();

        log.debug('event', event, location.href);

        if (event === 'SIGNED_IN' && !currentSession) {
          const redirected = location.href?.includes('/account?init=true');
          // if (!redirected) {
          //   location.href = '/account?init=true';
          // }
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
            // const currSess = $userSession.get();
            if (currentSession.player.id === payload.new.id) {
              console.log('new session', payload.new);

              $userSession.set({
                ...currentSession,
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

  return null;
}
