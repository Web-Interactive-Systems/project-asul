import { broadcast } from "@/lib/supabase";
import { Button, Dialog } from "@radix-ui/themes";
import {useEffect, useState} from "react";

export const MatchAskPopup = () => {
  const [open, setOpen] = useState(false);
  const [matchAsk, setMatchAsk] = useState({})

  useEffect(() => {
    broadcast.notifications.on('match', (payload) => {
      setMatchAsk(payload.data)
      setOpen(true);
    })
  });

  return (
    <Dialog.Root open={open}>
    <Dialog.Content>
      <Dialog.Title>Demande de match de {matchAsk.username}</Dialog.Title>
      <Button>Accepter</Button>
      <Button>Refuser</Button>
    </Dialog.Content>
  </Dialog.Root>
  );
};