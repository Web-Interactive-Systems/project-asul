import { Tabs, Box, Text } from '@radix-ui/themes';

export function Account() {
  return (
    <Tabs.Root defaultValue="session">
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
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
}
