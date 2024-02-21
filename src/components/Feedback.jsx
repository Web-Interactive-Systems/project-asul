import { $messages } from '@/store/store';
import { useStore } from '@nanostores/react';
import { Cross2Icon, InfoCircledIcon } from '@radix-ui/react-icons';
import { Button, Callout } from '@radix-ui/themes';

export default function Feedback() {
  const messages = useStore($messages);

  return messages?.length > 0
    ? messages.map(({ message, color = 'blue' }) => (
        <Callout.Root color={color} style={{ display: 'flex', alignItems: 'center' }}>
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{message}</Callout.Text>
          <Button size="2" variant="soft" radius="full" style={{ marginLeft: 'auto' }}>
            <Cross2Icon />
          </Button>
        </Callout.Root>
      ))
    : null;
}
