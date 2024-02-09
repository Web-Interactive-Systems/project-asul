import { broadcast, supabase } from '@/lib/supabase';
import { Button, Dialog } from '@radix-ui/themes';
import { useEffect, useState } from 'react';

export const MatchAskPopup = () => {
  const [open, setOpen] = useState(false);
  const [opponentName, setOpponentName] = useState('');
  const [matchId, setMatchId] = useState('');

  useEffect(() => {
    const matchNotificationHandler = (e) => {
      console.log('payload', e);
      setOpponentName(e.payload.sender.user_metadata.name);
      setOpen(true);
    };

    broadcast.notifications.on('match', matchNotificationHandler);

    return () => {
      broadcast.notifications.off('match', matchNotificationHandler);
    };
  }, []);

  const handleAccept = () => {
    supabase
      .from('match')
      .update({
        status: 'started',
      })
      .eq('id', matchId)
      .catch((err) => {
        console.log('err', err);
      });

    setOpen(false);
  };

  const handleRefuse = () => {
    supabase
      .from('match')
      .update({
        status: 'canceled',
      })
      .eq('id', matchId)
      .catch((err) => {
        console.log('err', err);
      });

    setOpen(false);
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Content>
        <Dialog.Title>Demande de match de {opponentName}</Dialog.Title>
        <Button onClick={() => handleAccept()}>Accepter</Button>
        <Button onClick={() => handleRefuse()}>Refuser</Button>
      </Dialog.Content>
    </Dialog.Root>
  );
};
