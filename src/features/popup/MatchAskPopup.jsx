import { broadcast } from "@/lib/supabase";
import { Button, Dialog } from "@radix-ui/themes";
import {useEffect, useState} from "react";

export const MatchAskPopup = () => {
  const [open, setOpen] = useState(false);
  const [opponentName, setOpponentName] = useState('')

  useEffect(() => {
    const matchNotificationHandler = (e) => {
      console.log('payload', e)
      setOpponentName(e.payload.sender.user_metadata.name)
      setOpen(true);
    }

    broadcast.notifications.on('match', matchNotificationHandler);

    return () => {
      broadcast.notifications.off('match', matchNotificationHandler);
    };
  }, []);

  return (
    <Dialog.Root open={open}>
    <Dialog.Content>
      <Dialog.Title>Demande de match de {opponentName}</Dialog.Title>
      <Button>Accepter</Button>
      <Button>Refuser</Button>
    </Dialog.Content>
  </Dialog.Root>
  );
};