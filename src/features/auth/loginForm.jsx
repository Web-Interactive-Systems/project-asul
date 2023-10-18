import { supabase } from '@/lib/supabase';
import { Button } from '@radix-ui/themes';
import { useState } from 'react';
import useSession from '@/hooks/useSession';

export default function LoginForm() {
  const [err, setErr] = useState(null);
  const [session, loading] = useSession();

  async function signin() {
    if (!(await supabase.auth.getSession()).data.session) {
      const { _, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://localhost:4321/auth',
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
      {loading && <p>Loading ...</p>}
      {err && <p>{err.message}</p>}
      {!loading && session && (
        <>
          <p>{session.user.email}</p>
          <p>{session.user.id}</p>
        </>
      )}
      {!loading && !session && (
        <>
          <p>Not signed in</p>
        </>
      )}
    </>
  );
}
