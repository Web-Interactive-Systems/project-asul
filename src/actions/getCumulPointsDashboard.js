import { getScores } from './getScore';
import { getPlayers } from './getPlayers';

function getBonus(delta) {
  let bonus = delta / 10;
  if (delta <= -12) {
    bonus += -0.4;
  } else if (delta <= -7) {
    bonus += -0.2;
  } else if (delta <= -1) {
    bonus += 0;
  } else if (delta <= 6) {
    bonus += 0.7;
  } else if (delta <= 11) {
    bonus += 1.3;
  } else if (delta <= 20) {
    bonus += 1.6;
  }
  return Math.round(bonus * 100) / 100;
}

export async function getCumulPointsDashboard() {
  const { data, error } = await getScores();
  const { data: datap, error: errorp } = await getPlayers();

  let last_score = {};
  let score = [];

  if (!error && !errorp) {
    data.map((score) => {
      (score.winer_id = datap.find((x) => x.id === score.winer_id).username),
        (score.loser_id = datap.find((x) => x.id === score.loser_id).username);
    });

    data.forEach((el) => {
      if (el != {}) {
        if (!last_score[el['winer_id']]) {
          last_score[el['winer_id']] = 100;
        }
        if (!last_score[el['loser_id']]) {
          last_score[el['loser_id']] = 100;
        }
      }
    });

    data.forEach((el) => {
      let delta = el['winer_score'] - el['loser_score'];
      last_score[el['winer_id']] = last_score[el['winer_id']] + getBonus(delta);
      last_score[el['loser_id']] = last_score[el['loser_id']] + getBonus(-delta);

      score.push(
        {
          Joueur: el['winer_id'],
          adversaire: el['loser_id'],
          result: 'Victoire (↗' + getBonus(delta) + ')',
          score: last_score[el['winer_id']],
          match_date: el['created_at'],
          match: el['winer_score'] + ' - ' + el['loser_score'],
        },
        {
          Joueur: el['loser_id'],
          adversaire: el['winer_id'],
          result: 'Défaite (↘' + getBonus(-delta) + ')',
          score: last_score[el['loser_id']],
          match_date: el['created_at'],
          match: el['loser_score'] + ' - ' + el['winer_score'],
        }
      );
    });
  }
  return score;
}
