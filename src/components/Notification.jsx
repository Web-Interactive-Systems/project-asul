import { Button, Flex, Heading } from '@radix-ui/themes';
import styles from './Notification.module.css';
import { supabase } from '@/lib/supabase';
import { $matchContent } from '@/store/store';
import { useState } from 'react';

async function answerMatch(status) {
  const { error } = await supabase.from('Match').update({ status }).eq('id', id);
  if (!error) setStatusChanged(true);
}

export default function Notification({ id, title }) {
  const [statusChanged, setStatusChanged] = useState(false);

  return (
    <div className={styles.notification}>
      <Heading as="h3" size="3" className={styles.title}>
        {title}
      </Heading>

      {!statusChanged && (
        <Flex
          direction="row"
          style={{
            justifyContent: 'space-evenly',
            padding: '1rem',
          }}
        >
          <Button variant="soft" onClick={() => answerMatch('started')}>
            Accepter
          </Button>
          <Button variant="soft" onClick={() => answerMatch('canceled')}>
            Refuser
          </Button>
        </Flex>
      )}
    </div>
  );
}
