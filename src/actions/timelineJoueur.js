import { supabase } from "../lib/supabase";


export async function timelineJoueur(id) {


    let { data: Score, error } = await supabase
    .from('Score')
    .select('winer_score, loser_score, winer_id, loser_id, created_at')
    .or(`winer_id.eq.${id},loser_id.eq.${id}`)
    

    if(error){
        return error;
    }

    const computedScoreByDate = {};

    Score = Score.map(score => {

    //Voir si user est gagnant ou perdant
    let isWinner = false;
    if(id === score.winer_id){
        isWinner = true;
    }

    let diff = score.winer_score - score.loser_score;

    let computedScore = 0;
    if(isWinner){
        
        //Get grades from supabase
        //En fonction de place +diff (positif) 
        const grades = [{id: "1", min: 20, max: 25, coef: 0.7}] //Supabase query
        const grade = grades[0]
        computedScore = diff/10 + grade.coef
    }
    else{
        //Get grades from supabase
        //En fonction de place -diff (négatif) 
        const grades = [{id: "1", min: 20, max: 25, coef: 0.4}] //Supabase query
        const grade = grades[0]
        computedScore = -diff/10 + grade.coef
    }

    score.computedScore = computedScore

    // Regroupez les computedScore par date
    // Formatez la date correctement
    const date = new Date(score.created_at); //Création d'un objet
    const dateKey = date.toISOString();

    if (!computedScoreByDate[dateKey]) {
      computedScoreByDate[dateKey] = 0;
    }
    computedScoreByDate[dateKey] += computedScore;

    return score

    });
  
    console.log("Somme des computedScore par date:", computedScoreByDate);

    return {Score};

    
};