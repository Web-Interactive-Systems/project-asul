import { getScores } from './getScore';
import { getPlayers } from './getPlayers';
import { getGrades} from '@/actions/getGrades';

export async function getCumulPointsDashboard() {

  const { data: dataScores, error: errorScore } = await getScores();
  const { data: dataPlayers, error: errorPlayer } = await getPlayers();
  const { data: dataGrades, error: errorGrade} = await getGrades();
  
  function getBonus(delta) {
    let bonus = delta / 10;
    dataGrades.forEach((grade) => {
      if (delta >= grade.min && delta <= grade.max ) {
        bonus += grade.coef; 
      }  
    });
    return Math.round(bonus * 100) / 100; 
  }

  let last_score = {};
  let score = [];

  if (!errorScore && !errorPlayer) {
    
    dataScores.map((score) => {
      (score.winer_id = dataPlayers.find((x) => x.id === score.winer_id).username),
        (score.loser_id = dataPlayers.find((x) => x.id === score.loser_id).username);
    });

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
      
      score.push({
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
      });
    });
  }
  return score;
}
