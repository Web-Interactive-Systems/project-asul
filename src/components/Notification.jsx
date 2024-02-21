import { Button, Flex, Box, Heading, Separator } from '@radix-ui/themes';
import styles from './Notification.module.css';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { refreshReactiveUI } from '@/store/store';

export default function Notification({ data }) {
  // const [statusChanged, setStatusChanged] = useState(false);

  const { title, id } = data;

  console.log('rest notif', data);

  async function answerMatch(status, id) {
    const { error } = await supabase.from('Match').update({ status }).eq('id', id);
    // if (!error) setStatusChanged(true);
    await refreshReactiveUI();
  }

  return (
    <Box p="3">
      <Heading as="h3" size="3" className={styles.title}>
        {title}
      </Heading>

      <Flex direction="row" p="4" gap="4">
        <Button variant="soft" onClick={() => answerMatch('canceled', id)}>
          <Cross2Icon color="red" />
          Refuser
        </Button>

        <Button variant="soft" onClick={() => answerMatch('started', id)}>
          <CheckIcon color="green" />
          Accepter
        </Button>
      </Flex>
      <Separator style={{ width: '100%' }} />
    </Box>
  );
}
