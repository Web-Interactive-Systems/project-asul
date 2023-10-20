import { Tabs, Box, Text } from '@radix-ui/themes';
import { MatchList } from '../matchlist/MatchList';
import { SessionList } from '../matchlist/SessionList';
import { useState } from 'react';

export function Account() {
  const [isMatchList, setIsMatchList] = useState(false)
  const [session, setSession] = useState(null)

  return (
    <Tabs.Root defaultValue="match">
      <Tabs.List>
        <Tabs.Trigger value="match">Match</Tabs.Trigger>
        <Tabs.Trigger value="dashboard">Dashboard</Tabs.Trigger>
        <Tabs.Trigger value="profile">Profil</Tabs.Trigger>
      </Tabs.List>

      <Box px="4" pt="3" pb="2">
        <Tabs.Content value="match">
          {isMatchList &&
          <MatchList onClose={() => {
            setIsMatchList(false)
          }} session={session} /> ||
          <SessionList onClose={(s) => {
            setSession(s);
            setIsMatchList(true);
          }} />}
        </Tabs.Content>

        <Tabs.Content value="dashboard">  
          <Text size="2">Access and update your documents.</Text>
        </Tabs.Content>

        <Tabs.Content value="profile">
          <Text size="2">Edit your profile or update contact information.</Text>
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
}
