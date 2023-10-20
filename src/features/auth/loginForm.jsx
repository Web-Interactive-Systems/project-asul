import { supabase } from '@/lib/supabase';
import { Button } from '@radix-ui/themes';
import { useState } from 'react';
import { $userSession } from '@/store/store';
import { useStore } from '@nanostores/react';

export default function LoginForm() {
  const [err, setErr] = useState(null);
  const session = useStore($userSession);

  async function signin() {
    if (!session) {
      const { _, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${location.origin}/auth`,
          queryParams: {
            prompt: 'consent',
          },
        },
      });
      if (error) {
        setErr(error);
        return;
      }
    }
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setErr(error);
      return;
    }
  }

  return (
    <>
      <Button onClick={signin}>Login</Button>
      <Button onClick={logout}>Logout</Button>
      {err && <p>{err.message}</p>}
      {session && (
        <>
          <p>{session?.player?.username}</p>
          <p>{session.user.email}</p>
          <p>{session.user.id}</p>
        </>
      )}
      {!session && (
        <>
          <p>Not signed in</p>
        </>
      )}
    </>
  );
}
