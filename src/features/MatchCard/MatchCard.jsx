import { Button, Flex, Heading, Separator, Strong } from '@radix-ui/themes';
import { useCallback, useEffect, useState } from 'react';

import { PlayerCard } from './PlayerCard';
import { useStore } from '@nanostores/react';
import { $userSession } from '@/store/store';
import { setMatchStatus as setMatchStatusBdd } from '@/actions/setMatchStatus';

export function MatchCard({ match = { status: 'created' }, J2 = { name: 'J2', score: 120 } }) {
  const [matchStatus, setMatchStatus] = useState(match.status);
  const userSession = useStore($userSession);

  useEffect(() => {
    setMatchStatus(match.status);
  }, []);

  const updateMatchStatus = useCallback(async (status) => {
    const { error } = await setMatchStatusBdd(match.id, status);

    if (error) {
      console.error(error);
    }

    setMatchStatus(status);
  })

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
          onClick={() => updateMatchStatus('finished')}
        >
          Terminer le match
        </Button>
      ) : (
        <Button
          radius="large"
          style={{ width: '60%', maxWidth: 240 }}
          disabled={matchStatus !== 'validated'}
          onClick={() => updateMatchStatus('started')}
        >
          Commencer le match
        </Button>
      )}

      {matchStatus === 'created' && (
        <Button
          variant="ghost"
          color="gray"
          radius="large"
          style={{ width: '60%', maxWidth: 240 }}
          onClick={() => updateMatchStatus('canceled')}
        >
          Annuler le match
        </Button>
      )}

      {(matchStatus !== 'created' && userSession.id === match.player_id) && (
        <Button
          variant="ghost"
          color="gray"
          radius="large"
          style={{ width: '60%', maxWidth: 240 }}
          onClick={() => updateMatchStatus('validated')}
        >
          Accepter le match
        </Button>
      )}
    </Flex>
  );
}
