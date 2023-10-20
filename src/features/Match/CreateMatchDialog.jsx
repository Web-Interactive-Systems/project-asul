import { Flex, Button, Text, Dialog, IconButton } from '@radix-ui/themes';
import { Cross1Icon } from '@radix-ui/react-icons';
import { CreateMatch } from './CreateMatch';
import { useState } from 'react';

export function CreateMatchDialog({ open, onCancel, children }) {
  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title
          style={{
            position: 'relative',
          }}
        >
          Choisir votre adversaire
          <IconButton
            variant="soft"
            color="gray"
            onClick={onCancel}
            style={{
              position: 'absolute',
              right: 0,
            }}
          >
            <Cross1Icon />
          </IconButton>
        </Dialog.Title>

        <CreateMatch />
      </Dialog.Content>
    </Dialog.Root>
  );
}
