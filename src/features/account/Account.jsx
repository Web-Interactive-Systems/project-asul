import { Tabs, Box, Text, Card, Avatar, TextFieldInput } from '@radix-ui/themes';
import sessionStore from '@/store/session';
import { useStore } from '@nanostores/react';
import { MatchList } from '../matchlist/MatchList';
import { SessionSelector } from '../session/sessionSelect';
import { SessionList } from '../matchlist/SessionList';
import { useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { $matchContent, $matchSession } from '@/store/store';
import { throttle } from '@/lib/utils';

export function Account() {
  const [session, setSession] = useState(null);
  const matchContent = useStore($matchContent);
  const userSession = useStore(sessionStore);
  const params = new URLSearchParams(window.location.search);
  const throttled = useMemo(() => throttle(handleNameChange, 500), []);

  const throttled = useMemo(() => throttle(handleNameChange, 500), []);

  console.log('matchContent', matchContent);

  async function handleNameChange(e) {
    await supabase
      .from('Player')
      .update({ username: e.target.value })
      .eq('id', userSession.player.id);
  }

  return (
    <Tabs.Root defaultValue={params.get('init') ? 'profile' : 'match'}>
      <Tabs.List>
        <Tabs.Trigger value="match">Match</Tabs.Trigger>
        <Tabs.Trigger value="dashboard">Dashboard</Tabs.Trigger>
        <Tabs.Trigger value="profile">Profil</Tabs.Trigger>
      </Tabs.List>

      <Box px="4" pt="3" pb="2">
        <Tabs.Content value="match">
          {matchContent === 'session' && <SessionList />}

          {matchContent === 'match' && (
            <MatchList
              onClose={() => {
                //
              }}
              session={session}
            />
          )}
        </Tabs.Content>

        <Tabs.Content value="dashboard">
          <Text size="2">Access and update your documents.</Text>
        </Tabs.Content>

        <Tabs.Content value="profile">
          <Text size="2">Edit your profile or update contact information.</Text>
          <Card>
            <Avatar
              src={userSession.player.avatar}
              fallback={userSession.player.username.charAt(0)}
            />
            <TextFieldInput
              label="Username"
              defaultValue={userSession.player.username}
              onChange={throttled}
            ></TextFieldInput>
          </Card>
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
}
