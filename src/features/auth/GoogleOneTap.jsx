import { useScript } from '@/actions/useScript';
import { useNonce } from '@/hooks/useNonce';
import { useEffect, useId, useState } from 'react';
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';

export default function GoogleOneTap({ callback, googleAccountConfigs }) {
  const [nonceData, nonceLoading] = useNonce();
  useGoogleOneTapLogin({
    onSuccess: handleSignInWithGoogle,
    onError: (response) => console.log('failure', response),
    googleAccountConfigs: {
      client_id: import.meta.env.PUBLIC_GOOGLE_CLIENTID,
      auto_select: true,
      nonce: nonceData.hashedNonce,
      ux_mode: 'popup',
      context: 'use',
      itp_support: true,
    },
  });
  // const scriptLoad = useScript('https://accounts.google.com/gsi/client');
  // const buttonId = useId('google-button');

  async function handleSignInWithGoogle(response) {
    console.log('handleSignInWithGoogle', response);
    const { data, error } = await supabase.auth.signInWithIdToken({
      token: response.credential,
      nonce: nonceData.nonce, // must be the same one as provided in data-nonce (if any)
    });
  }

  // async function initGoogle(...rest) {
  //   console.log('initGoogle', rest);
  // }

  // globalThis.handleSignInWithGoogle = handleSignInWithGoogle;
  // globalThis.initGoogle = initGoogle;

  // useEffect(() => {
  //   if (scriptLoad === 'ready' && nonceData) {
  //     console.log('google', google);
  //     google.accounts.id.initialize({
  //       ...googleAccountConfigs,
  //       client_id: import.meta.env.PUBLIC_GOOGLE_CLIENTID,
  //       callback: initGoogle,
  //       auto_select: true,
  //       ux_mode: 'popup',
  //       context: 'use',
  //       nonce: nonceData.hashedNonce,
  //       itp_support: true,
  //     });
  //     // google.accounts.id.renderButton(
  //     //   document.getElementById(buttonId),
  //     //   { theme: 'outline', size: 'large' } // customization attributes
  //     // );
  //     google.accounts.id.prompt((notification) => {
  //       console.log('notif', notification);
  //       console.log(notification.isNotDisplayed());
  //     });
  //   }
  // }, [scriptLoad, nonceData]);

  console.log('nonceData', nonceData);
  if (!nonceData || nonceLoading) return null;

  return <></>;
}
