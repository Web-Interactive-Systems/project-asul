import { setMatchStatus } from "@/actions/setMatchStatus";
import { broadcast } from "@/lib/supabase";
import { $players, $matchContent, $matchSession } from "@/store/store";
import { useStore } from "@nanostores/react";
import { Button, Dialog } from "@radix-ui/themes";
import { useCallback, useEffect, useState } from "react";

export const MatchAskPopup = () => {
  const [open, setOpen] = useState(false);
  const [opponentName, setOpponentName] = useState('')
  const [opponentId, setOpponentId] = useState('')
  const [opponentMatchId, setOpponentMatchId] = useState(null)
  const [opponentSessionId, setOpponentSessionId] = useState(null)
  const players = useStore($players)

  const handleClick = useCallback(async (accepted) => {
    await broadcast.notifications.send('match-res', opponentId, { accepted })

    if (accepted) {
      window.location.href = window.location.origin + '/account?init=true&mode=session&session-id=' + opponentSessionId
    } else {
      await setMatchStatus(opponentMatchId, 'declined')
      setOpen(false)
    }
  })

  useEffect(() => {
    const matchNotificationHandler = (e) => {
      console.log(players)
      setOpponentId(e.payload.senderId)
      setOpponentSessionId(e.payload.data.sessionId)
      setOpponentMatchId(e.payload.data.matchId)
      setOpponentName(players.find(player => player.id === e.payload.senderId)?.username || 'Unknown')
      setOpen(true);
    }

    broadcast.notifications.on('match', matchNotificationHandler);

    return () => {
      broadcast.notifications.off('match', matchNotificationHandler);
    };
  }, [players]);

  return (
    <Dialog.Root open={open}>
    <Dialog.Content>
      <Dialog.Title>Demande de match de {opponentName}</Dialog.Title>
      <Button onClick={handleClick.bind(null, true)}>Accepter</Button>
      <Button onClick={handleClick.bind(null, false)}>Refuser</Button>
    </Dialog.Content>
  </Dialog.Root>
  );
};