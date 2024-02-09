import { Button, Flex, Heading, Separator, Strong } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

import { PlayerCard } from './PlayerCard';
import { postgres } from '@/lib/supabase';

export function MatchCard({ match = { status: 'created' }, J2 = { name: 'J2', score: 120 } }) {
  const [matchStatus, setMatchStatus] = useState(match.status);

  useEffect(() => {
    postgres.match.on('UPDATE', (data) => {
      console.log('match update', data);
    });

    setMatchStatus(match.status);
  }, []);

  return (
    <Flex direction="column" align="center" gap="5">
      <PlayerCard name="J1" points={`${125} points`} />
      <Flex gap="2" align="center">
        <Separator size="2" />
        <Strong>Vs</Strong>
        <Separator size="2" />
      </Flex>

      {matchStatus !== 'created' ? (
        <PlayerCard name={J2.name} points={`${J2.score} points`} />
      ) : (
        <PlayerCard name="En attente ..." points="" />
      )}

      {matchStatus === 'started' ? (
        <Button
          radius="large"
          color="green"
          style={{ width: '60%', maxWidth: 240 }}
          onClick={() => setMatchStatus('finished')}
        >
          Terminer
        </Button>
      ) : (
        <Button
          radius="large"
          style={{ width: '60%', maxWidth: 240 }}
          disabled={matchStatus !== 'validated'}
          onClick={() => setMatchStatus('started')}
        >
          Commencer
        </Button>
      )}

      {matchStatus !== 'started' ? (
        <Button
          variant="ghost"
          color="gray"
          radius="large"
          style={{ width: '60%', maxWidth: 240 }}
          onClick={() => setMatchStatus('Canceled')}
        >
          Annuler le match
        </Button>
      ) : null}
    </Flex>
  );
}
