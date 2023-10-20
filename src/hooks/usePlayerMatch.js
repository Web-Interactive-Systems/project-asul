import React from 'react';

import { matchSorter } from 'match-sorter';
import { useThrottle } from './useThrottle';
import { $players } from '@/store/store';
import { useStore } from '@nanostores/react';

// const players = $players; //[{name:"Toto"},{name:"Foo"},{name:"Bar"}]

export function usePlayerMatch(term) {
  let players = useStore($players);
  let throttledTerm = useThrottle(term, 100);

  console.log('pplayers __', players, $players.get());

  return React.useMemo(
    () =>
      term.trim() === ''
        ? players
        : matchSorter(players, term, {
            keys: ['username'],
          }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [throttledTerm, players]
  );
}
