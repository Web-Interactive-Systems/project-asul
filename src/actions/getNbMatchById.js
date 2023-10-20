
import { supabase } from "../lib/supabase";

export async function getNbMatchById(winer_id) {
    
    let { data: score, error } = await supabase
    .from('Score')
    .select('winer_score, winer_id')
    .eq('winer_id', winer_id)

    let count = score.length;

    if (error) {
        return error;
    }
    
    return {data}

}

