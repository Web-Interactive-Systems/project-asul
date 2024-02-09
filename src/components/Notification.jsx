import { Button, Flex, Heading } from '@radix-ui/themes';
import styles from './Notification.module.css';
import { supabase } from '@/lib/supabase';
import { $matchContent, $userSession } from '@/store/store';
import { useState } from 'react';
import { useStore } from '@nanostores/react';

export default async function Notification({ match }) {
  const { id, title, creator_id, player_id } = match;
  const [statusChanged, setStatusChanged] = useState(false);
  const session = useStore($userSession);
  console.log('session', session);
  let oponent;

  if (player_id !== session.user.id)
    oponent = await supabase.from('Player').select('*').eq('id', player_id);
  if (creator_id !== session.user.id)
    oponent = await supabase.from('Player').select('*').eq('id', creator_id);

  console.log('oponent', oponent);

  async function answerMatch(status) {
    const { error } = await supabase.from('Match').update({ status }).eq('id', id);
    if (!error) setStatusChanged(true);
  }

  return (
    <div className={styles.notification}>
      {/* Add creator */}
      <Heading as="h3" size="3" className={styles.title}>
        {title + ' vs ' + oponent?.data[0].name}
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
