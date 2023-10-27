import { supabase } from '../lib/supabase';
import { getMatchesBySession } from './getMatchesBySession';

export async function getMatchesStatsBySessionId(session_id) {
  const { data, error } = await supabase
    .from('Match')
    .select('*, Score ( match_id, winer_id, winer_score, loser_id, loser_score )')
    .eq('session_id', session_id);

  // console.log(data);

  if (error) {
    return error;
  }

  // Stats
  // ToDo : return interesting stats
  const MATCHS_COUNT = data.length;
  const TOTAL_SCORES = data.reduce(
    (accumulator, currentValue) =>
      accumulator +
      (currentValue.status === 'finished'
        ? currentValue.Score[0].loser_score + currentValue.Score[0].winer_score
        : 0),
    0
  );
  const AVERAGE_SCORES = TOTAL_SCORES / MATCHS_COUNT / 2;

  return { nb_matchs: MATCHS_COUNT, average_score: AVERAGE_SCORES };
}
