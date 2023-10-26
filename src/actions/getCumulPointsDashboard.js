import { getScores } from './getScore';
import { getPlayers } from '@/actions/getPlayers';
import { getGrades} from '@/actions/getGrades';



export async function getCumulPointsDashboard() {

  const { data: dataScores, error: errorScore } = await getScores();
  const { data: dataPlayers, error: errorPlayer } = await getPlayers();
  const { data: dataGrades, error: errorGrade} = await getGrades();
  function getBonus(delta) {
    let bonus = delta / 10;
    dataGrades.forEach((grade) => {
      console.log(grade)
      if (delta <= grade.max) {
        bonus += grade.coef;
      }
      return bonus
    });
    // if (delta <= -12) {
    //   bonus += -0.4;
    // } else if (delta <= -7) {
    //   bonus += -0.2;
    // } else if (delta <= -1) {
    //   bonus += 0;
    // } else if (delta <= 6) {
    //   bonus += 0.7;
    // } else if (delta <= 11) {
    //   bonus += 1.3;
    // } else if (delta <= 20) {
    //   bonus += 1.6;
    // }
    return Math.round(bonus * 100) / 100;
  }
  console.log(dataPlayers)
  console.log("grades:",dataGrades)
  let last_score = {};
  let score = [];
  if (!errorScore) {
    dataScores.forEach((el) => {
      if (el != {}) {
        if (!last_score[el['winer_id']]) {
          last_score[el['winer_id']] = 100;
        }
        if (!last_score[el['loser_id']]) {
          last_score[el['loser_id']] = 100;
        }
      }
    });
    dataScores.forEach((el) => {
      let delta = el['winer_score'] - el['loser_score'];
      last_score[el['winer_id']] = last_score[el['winer_id']] + getBonus(delta);
      last_score[el['loser_id']] = last_score[el['loser_id']] + getBonus(-delta);
      let victory = 'Victoire (↗' + getBonus(delta) + ')';
      let defeat = 'Victoire (↘' + getBonus(-delta) + ')';
      score.push({
        Joueur: el['winer_id'],
        adversaire: el['loser_id'],
        result: victory,
        score: last_score[el['winer_id']],
        match_date:el['created_at'],
        match: el['winer_score'] + ' - ' + el['loser_score'],
      });
      score.push({
        Joueur: el['loser_id'],
        adversaire: el['winer_id'],
        result: defeat,
        score: last_score[el['loser_id']],
        match_date: el['created_at'],
        match: el['loser_score'] + ' - ' + el['winer_score'],
      });
    });
  }
  return score;
}
