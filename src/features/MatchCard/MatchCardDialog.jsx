import { Button, Flex, Dialog } from '@radix-ui/themes';
import { MatchCard } from './MatchCard';

export function MatchCardDialog({ children, match }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Info Match</Dialog.Title>

        <Flex direction="column" gap="3">
          <MatchCard match={match} />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
