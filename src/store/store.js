import { atom, map } from 'nanostores';

export const $matchContent = atom('session');
export const $matchSession = atom({});
export const $userSession = map(null);
