import { Button, Flex, Dialog, IconButton } from '@radix-ui/themes';
import { MatchCard } from './MatchCard';
import { Cross1Icon } from '@radix-ui/react-icons';

export function MatchCardDialog({ children, match }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title
          style={{
            position: 'relative',
          }}
        >
          Info Match
          <Dialog.Close>
            <IconButton
              variant="soft"
              color="gray"
              style={{
                position: 'absolute',
                right: 0,
              }}
            >
              <Cross1Icon />
            </IconButton>
          </Dialog.Close>
        </Dialog.Title>

        <Flex direction="column" gap="3">
          <MatchCard match={match} />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
