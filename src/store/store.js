import { atom, map, task, onMount } from 'nanostores';
import { getPlayers } from '@/actions/getPlayers';
import { getInitialNotifications } from '@/actions/getInitialNotifications';
import { getMatchesBySession } from '@/actions/getMatchesBySession';
import { getSessions } from '@/actions/getSessions';

export const $matchContent = atom('session');
export const $matchSession = atom({});
export const $userSession = map(null);
export const $players = atom([]);
export const $notifs = atom([]);
export const $matches = atom([]);
export const $sessions = atom([]);
export const $messages = atom([]);

onMount($sessions, () => {
  task(loadSessions);
});

onMount($players, () => {
  task(loadPlayers);
});

onMount($notifs, () => {
  task(loadNotifs);
});

onMount($matches, () => {
  task(loadMatches);
});

export const refreshReactiveUI = async () => {
  await loadMatches();
  await loadNotifs();
};

export const loadSessions = async () => {
  const { data, error } = await getSessions();

  if (error) {
    //
    console.error('$getSessions error', error);
  } else {
    $sessions.set(data);

    console.warn('$getSessions', $sessions.get());
  }
};

export const loadNotifs = async () => {
  const { data, error } = await getInitialNotifications();

  if (error) {
    //
    console.error('$getInitialNotifications', error);
  } else {
    $notifs.set(data);

    console.log('$getInitialNotifications', $notifs.get());
  }
};

export const loadMatches = async () => {
  const sessionData = $matchSession.get();
  console.log('== get matches ', sessionData);

  try {
    console.log('== get matches 1');
    const { data, error } = await getMatchesBySession(sessionData.id);

    console.log('== get  matches 2', data, error);

    if (error) {
      throw Error();
    }

    $matches.set(data);
    console.log('$getMatchesBySession', data);
  } catch (e) {
    console.error('$getMatchesBySession', e);
  }
};

export const loadPlayers = async () => {
  const { data, error } = await getPlayers();

  if (error) {
    //
    console.error('$getPlayers error', error);
  } else {
    $players.set(data);

    console.warn('$getPlayers', $players.get());
  }
};
