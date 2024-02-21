import { Button, Flex, Heading, Separator, Strong } from '@radix-ui/themes';
import { useCallback, useEffect, useState } from 'react';

import { PlayerCard } from './PlayerCard';
import { useStore } from '@nanostores/react';
import { $userSession, refreshReactiveUI } from '@/store/store';
import { updateMatch } from '@/actions/setMatchStatus';

export function MatchCard({
  match = { status: 'created' },
  J2 = { name: match?.title, score: 120 },
}) {
  const [matchStatus, setMatchStatus] = useState(match.status);
  const userSession = useStore($userSession);

  useEffect(() => {
    setMatchStatus(match.status);
  }, []);

  const updateMatchStatus = useCallback(
    async (status) => {
      const { error } = await updateMatch(match.id, { status });

      if (error) {
        console.error(error);
      }

      setMatchStatus(status);

      await refreshReactiveUI();
    },
    [match]
  );

  const updateMatchScore = useCallback(
    async (who, score) => {
      const { error } = await updateMatch(match.id, { [who]: score });

      if (error) {
        console.error(error);
      }

      await refreshReactiveUI();
    },
    [match]
  );

  console.log('MatchCard', userSession, match);

  return (
    <Flex direction="column" align="center" gap="5">
      <PlayerCard
        name={userSession?.player?.username}
        points={0}
        onChange={updateMatchScore.bind(null, 'creator_id')}
      />

      <Flex gap="2" align="center">
        <Separator size="2" />
        <Strong>Vs</Strong>
        <Separator size="2" />
      </Flex>

      {matchStatus !== 'created' ? (
        <PlayerCard name={J2.name} points={0} onChange={updateMatchScore.bind(null, 'player_id')} />
      ) : (
        <PlayerCard name="En attente ..." points={0} />
      )}

      {matchStatus === 'started' ? (
        <Button
          size="4"
          radius="full"
          color="green"
          style={{ width: '60%', maxWidth: 240 }}
          onClick={() => updateMatchStatus('finished')}
        >
          Terminer le match
        </Button>
      ) : (
        <Button
          size="4"
          radius="full"
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
          size="4"
          radius="full"
          color="gray"
          style={{ width: '60%', maxWidth: 240 }}
          onClick={() => updateMatchStatus('canceled')}
        >
          Annuler le match
        </Button>
      )}

      {matchStatus !== 'created' && userSession.id === match.player_id && (
        <Button
          variant="ghost"
          color="gray"
          size="4"
          radius="full"
          style={{ width: '60%', maxWidth: 240 }}
          onClick={() => updateMatchStatus('validated')}
        >
          Accepter le match
        </Button>
      )}
    </Flex>
  );
}
