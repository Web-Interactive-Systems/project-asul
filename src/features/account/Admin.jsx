import { Tabs, Box, Text } from '@radix-ui/themes';
import { SessionList } from '../matchlist/SessionList';
import { SessionSelector } from '../session/sessionSelect';
import { Barem } from '../barem/Barem';

export function Admin() {
  return (
    <Tabs.Root defaultValue="dashboard">
      <Tabs.List>
        <Tabs.Trigger value="dashboard">Dashboard</Tabs.Trigger>
        <Tabs.Trigger value="session">Sessions</Tabs.Trigger>
        <Tabs.Trigger value="grad">Barème</Tabs.Trigger>
      </Tabs.List>

      <Box px="4" pt="3" pb="2">
        <Tabs.Content value="dashboard">
          <Text size="2">Access and update your documents.</Text>
        </Tabs.Content>

        <Tabs.Content value="session">
          <SessionSelector />
        </Tabs.Content>

        <Tabs.Content value="grad">
          <Barem />
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
}
