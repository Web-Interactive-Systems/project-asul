import { atom, map, task, onMount } from 'nanostores';
import { getPlayers } from '@/actions/getPlayers';
import { getSessions } from '@/actions/getSessions';

export const $matchContent = atom('session');
export const $matchSession = atom({});
export const $userSession = map(null);
export const $players = atom([]);
export const $sessions = atom([]);


onMount($sessions, () => {
  task(async () => {
    const { data, error } = await getSessions();

    if (error) {
      //
      console.error('$getSessions error', error);
    } else {
      $sessions.set(data);

      console.warn('$getSessions', $sessions.get());
    }
  });
});

onMount($players, () => {
  task(async () => {
    const { data, error } = await getPlayers();

    if (error) {
      //
      console.error('$getPlayers error', error);
    } else {
      $players.set(data);

      console.warn('$getPlayers', $players.get());
    }
  });
});
