import { getScores } from "./getScore"

function getBonus(delta){
  let bonus = delta/10
  if(delta <= -12){
    bonus += -0.4
  } else if(delta <= -7){
    bonus += -0.2
  } else if(delta <= -1){
    bonus += 0
  } else if(delta <= 6){
    bonus += 0.7
  } else if(delta <= 11){
    bonus += 1.3
  } else if(delta <= 20){
    bonus += 1.6
  }
  return Math.round(bonus*100)/100
}

export async function getCumulPointsDashboard(){
  const{data,error} = await getScores();
  let last_score = {}
  let score = []
  if(!error){
    data.forEach((el) =>{
      if(el != {}){
        if(!last_score[el["winer_id"]]){
          last_score[el["winer_id"]] = 100
        }
        if(!last_score[el["loser_id"]]){
          last_score[el["loser_id"]] = 100
        }
      }
    })
    data.forEach((el) =>{
      let delta = (el["winer_score"] - el["loser_score"])
      last_score[el["winer_id"]] = last_score[el["winer_id"]] + getBonus(delta)
      last_score[el["loser_id"]] = last_score[el["loser_id"]] + getBonus(-delta)
      score.push({"userid":el["winer_id"],"score":last_score[el["winer_id"]],"match_date":new Date(el["created_at"])})
      score.push({"userid":el["loser_id"],"score":last_score[el["loser_id"]],"match_date":new Date(el["created_at"])})
    })
    // console.table(last_score)
    // console.table(score)
    // score.sort((a, b) => (new Date(a["created_at"] > new Date(b["created_at"])) ? 1 : -1))
  }
  return(score)
}