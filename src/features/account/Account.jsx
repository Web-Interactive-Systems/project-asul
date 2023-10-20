import { Tabs, Box, Text, Card, Avatar } from '@radix-ui/themes';
import { MatchList } from '../matchlist/MatchList';
import { SessionSelector } from '../session/sessionSelect';
import { SessionList } from '../matchlist/SessionList';
import { useState } from 'react';
import { useStore } from '@nanostores/react';
import sessionStore from '@/Stores/session';
import { $matchContent, $matchSession } from '@/store/store';

export function Account() {
  const matchContent = useStore($matchContent);
  const session = useStore(sessionStore);
  const [session, setSession] = useState(null);
  console.log('matchContent', matchContent);
  const params = new URLSearchParams(window.location.search);

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
            <Avatar src={session.player.avatar} fallback="A" />
          </Card>
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
}
