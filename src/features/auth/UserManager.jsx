import { supabase, postgres } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { $userSession } from '@/store/store';
import GoogleOneTap from './GoogleOneTap';
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';

export default function UserManager() {
  useGoogleOneTapLogin({
    onSuccess: (response) => console.log('success', response),
    onError: (response) => console.log('failure', response),
    googleAccountConfigs: {
      client_id: import.meta.env.PUBLIC_GOOGLE_CLIENTID,
    },
  });
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
            const currSess = $userSession.get();
            if (currSess.player.id === payload.new.id) {
              console.log('new session', payload.new);

              $userSession.set({
                ...currSess,
                player: payload.new,
              });
            }
          }

          postgresListener = postgres.player.on('UPDATE', sessionHandler);

          session.player = data[0];
        }
      }
      $userSession.set(session);
    });

    return () => {
      postgresListener.unsubscribe('*');
      Listener.subscription.unsubscribe();
    };
  }, []);

  // return <GoogleOneTap googleAccountConfigs={{}} />;
}
