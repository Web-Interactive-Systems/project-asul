import { Tabs, Box, Text, Card, Avatar } from '@radix-ui/themes';
import sessionStore from '@/Stores/session';
import { useStore } from '@nanostores/react';
export function Account() {
  const session = useStore(sessionStore);

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
          <Text size="2">Make changes to your account.</Text>
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
