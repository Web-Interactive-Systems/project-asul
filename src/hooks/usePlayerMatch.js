import React from 'react';

import { matchSorter } from 'match-sorter';
import { useThrottle } from './useThrottle';
import { $players } from '@/store/store';
import { useStore } from '@nanostores/react';
import { $userSession } from '@/store/store';

export function usePlayerMatch(term) {
  const players = useStore($players);
  const userSession = useStore($userSession);
  const filteredPlayers = players.filter((player) => player.id !== userSession.player.id);
  let throttledTerm = useThrottle(term, 100);

  console.log('pplayers __', players, $players.get());

  return React.useMemo(
    () =>
      term.trim() === ''
        ? filteredPlayers
        : matchSorter(filteredPlayers, term, {
            keys: ['username'],
          }),
    [throttledTerm, players]
  );
}
