import { getScores } from './getScore';
import { getPlayers } from './getPlayers';
import { format } from 'date-fns/esm/fp';

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

export async function getCurrentScore() {
  const { data, error } = await getScores();
  const { data: datap, error: errorp } = await getPlayers();

  let last_score = {};
  
  let scoreList = [];
  let playerList = [];
  let finalList = [];

  if (!error && !errorp) {
    //mapping de tout les score
    data.map((score) => {
        (score.winer_id = datap.find((x) => x.id === score.winer_id).username),
        (score.loser_id = datap.find((x) => x.id === score.loser_id).username)
    });
//pas sur de l'utilité
    data.forEach((el) => {
      if (el != {}) {
        if (!last_score[el['winer_id']]) {
          last_score[el['winer_id']] = 100;
        }
        if (!last_score[el['loser_id']]) {
          last_score[el['loser_id']] = 100;
        }
        if (!last_score[el['creator_id']]) {
          last_score[el['creator_id']] = 100;
        }
      }
    });
    let compteMatch = [];
    datap.forEach((ele) => {
      playerList.push(ele["username"])
      compteMatch.push(0);
    });
    
    data.forEach((el) => {
      let delta = el['winer_score'] - el['loser_score'];
      last_score[el['winer_id']] = last_score[el['winer_id']] + getBonus(delta);
      last_score[el['loser_id']] = last_score[el['loser_id']] + getBonus(-delta);
      playerList.forEach((username, index) => {
        if (username==el['winer_id']){
          compteMatch[index]++;
          scoreList[index]={
            Joueur: el['winer_id'],
            score: last_score[el['winer_id']],
            nb_match : compteMatch[index],
            last_match: el['created_at'],
            position: 1,
          }
        }
        if (username==el['loser_id']){
          compteMatch[index]++;
          scoreList[index]={
            Joueur: el['loser_id'],
            score: last_score[el['loser_id']],
            nb_match : compteMatch[index],
            last_match: el['created_at'],
          }
        }
      });
      });
  }
  console.log("ppppppppppp",playerList);
  console.log("dddddd",scoreList);
  return scoreList;
}