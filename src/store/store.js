import { atom, map, task, onMount } from 'nanostores';
import { getPlayers } from '@/actions/getPlayers';

export const $matchContent = atom('session');
export const $matchSession = atom({});
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

// export async function $getPlayers() {

// }