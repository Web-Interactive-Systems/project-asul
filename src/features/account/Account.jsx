import { Tabs, Box, Text, Card, Avatar } from '@radix-ui/themes';
import sessionStore from '@/store/session';
import { useStore } from '@nanostores/react';
import { MatchList } from '../matchlist/MatchList';
import { SessionList } from '../matchlist/SessionList';
import { useState } from 'react';

import { $matchContent, $matchSession } from '@/store/store';

export function Account() {
  const [session, setSession] = useState(null);
  const matchContent = useStore($matchContent);
  const userSession = useStore(sessionStore);
  const params = new URLSearchParams(window.location.search);

  console.log('matchContent', matchContent);

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
            <Avatar src={userSession.player.avatar} fallback="A" />
          </Card>
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
}
