import { atom, map, task, onMount } from 'nanostores';
import { getPlayers } from '@/actions/getPlayers';
import { getInitialNotifications } from '@/actions/getInitialNotifications';

export const $matchContent = atom('session');
export const $matchSession = atom({});
export const $userSession = map(null);
export const $players = atom([]);
export const $notifs = atom([]);

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

onMount($notifs, () => {
  task(async () => {
    const { data, error } = await getInitialNotifications();

    if (error) {
      //
      console.error('$getInitialNotifications', error);
    } else {
      $notifs.set(data);

      console.warn('$getInitialNotifications', $notifs.get());
    }
  });
});

// export async function $getPlayers() {

// }
