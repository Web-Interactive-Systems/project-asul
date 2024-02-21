import { updateMatchStatus } from '@/actions/setMatchStatus';
import { logger } from '@/lib/logger';
import { broadcast } from '@/lib/supabase';
import { $players, loadNotifs, refreshReactiveUI } from '@/store/store';
import { useStore } from '@nanostores/react';
import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { Button, Dialog, Flex, Text } from '@radix-ui/themes';
import { useCallback, useEffect, useState } from 'react';

const log = logger('MatchAskPopup');

export const MatchAskPopup = () => {
  const [open, setOpen] = useState(false);
  const [opponentName, setOpponentName] = useState('');
  const [opponentId, setOpponentId] = useState('');
  const [opponentMatchId, setOpponentMatchId] = useState(null);
  const [opponentSessionId, setOpponentSessionId] = useState(null);
  const players = useStore($players);

  const handleClick = useCallback(async (accepted) => {
    await broadcast.notifications.send('match-res', opponentId, { accepted });

    if (accepted) {
      await updateMatchStatus(opponentMatchId, 'validated');

      // window.location.href =
      //   window.location.origin + '/account?init=true&mode=session&session-id=' + opponentSessionId;
    } else {
      await updateMatchStatus(opponentMatchId, 'declined');
    }

    await refreshReactiveUI();

    setOpen(false);
  });

  useEffect(() => {
    const matchNotificationHandler = async (e) => {
      log.debug('matchNotificationHandler', e);
      log.debug(players);

      setOpponentId(e.payload.senderId);
      setOpponentSessionId(e.payload.data.sessionId);
      setOpponentMatchId(e.payload.data.matchId);

      setOpponentName(
        players.find((player) => player.id === e.payload.senderId)?.username || 'Unknown'
      );

      setOpen(true);

      await refreshReactiveUI();
    };

    broadcast.notifications.on('match', matchNotificationHandler);

    return () => {
      broadcast.notifications.off('match', matchNotificationHandler);
    };
  }, [players]);

  return (
    <Dialog.Root open={open}>
      <Dialog.Content>
        <Text>
          Un match contre <Text weight="bold">{opponentName}</Text> 🏸
        </Text>
        <Flex p="4" gap="4">
          <Button size="4" variant="soft" onClick={handleClick.bind(null, false)}>
            <Cross2Icon color="red" />
            Refuser
          </Button>

          <Button size="4" variant="soft" onClick={handleClick.bind(null, true)}>
            <CheckIcon color="green" />
            Accepter
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
