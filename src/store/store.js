import { atom, map, task, onMount } from 'nanostores';
import { getPlayers } from '@/actions/getPlayers';
import { getSessions } from '@/actions/getSessions';

export const $matchContent = atom('session');
export const $matchSession = atom([]);
export const $userSession = map(null);
export const $players = atom([]);

onMount($players, () => {
  task(async () => {
    const { data, error } = await getPlayers();

    if (error) {
      //
      console.error('$getPlayers', error);
    } else {
      $players.set(data);

      console.warn('$getPlayers', $players.get());
    }
  });
});

onMount($matchSession, () => {
  task(async () => {
    const { data, error } = await getSessions();

    if (error) {
      //
      console.error('$getSession', error);
    } else {
      $matchSession.set(data);

      console.warn('$getSession', $matchSession.get());
    }
  });
});

// export async function $getPlayers() {

// }
