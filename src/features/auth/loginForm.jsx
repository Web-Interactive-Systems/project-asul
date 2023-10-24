import { supabase } from '@/lib/supabase';
import { Button, Flex, Heading, Text, Box } from '@radix-ui/themes';
import { useState } from 'react';
import { $userSession } from '@/store/store';
import { useStore } from '@nanostores/react';
import { GoogleSvg } from '@/components/GoogleSvg';

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
    <Flex
      direction="column"
      gap="4"
      align="center"
      style={{ width: '50vw', marginLeft: 'auto', marginRight: 'auto' }}
    >
      {!session ? (
        <Flex direction="column" gap="4" align="center">
          <Heading size={{ initial: '2', xs: '4', md: '6' }}>Se connecter à ASUL</Heading>

          <Button size="3" onClick={signin}>
            <GoogleSvg /> Google
          </Button>
        </Flex>
      ) : (
        <Flex direction="column" gap="4" align="center">
          <Heading size={{ initial: '2', xs: '4', md: '6' }}>
            Salut {session?.player?.username} 👋
          </Heading>

          <Button size="3" onClick={logout}>
            Logout
          </Button>
        </Flex>
      )}

      {err && <p>{err.message}</p>}
      {session && <Text size="2">{session.user.email}</Text>}
    </Flex>
  );
}
