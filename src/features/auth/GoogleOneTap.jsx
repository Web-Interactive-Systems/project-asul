import { useNonce } from '@/hooks/useNonce';
import { useEffect, useMemo } from 'react';
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';
import { supabase } from '@/lib/supabase';

export default function GoogleOneTap({ callback, googleAccountConfigs }) {
  const [nonceData, nonceLoading] = useNonce();
  useGoogleOneTapLogin({
    onSuccess: handleSignInWithGoogle,
    onError: (response) => console.log('failure', response),
    googleAccountConfigs: {
      client_id: import.meta.env.PUBLIC_GOOGLE_CLIENTID,
      auto_select: true,
      nonce: nonceData?.hashed,
      ux_mode: 'popup',
      context: 'use',
      itp_support: true,
      callback: handleSignInWithGoogle,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      const popup = document.querySelector('iframe[src^="https://accounts.google.com"]');
      if (popup) {
        popup.style.colorScheme = 'light';
      }
    }, 1000);
  }, [nonceData]);

  async function handleSignInWithGoogle(response) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: 'google',
      token: response.credential,
      nonce: nonceData?.nonce,
    });
  }

  if (!nonceData || nonceLoading) return null;

  return <></>;
}
