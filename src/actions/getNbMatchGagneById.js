
import { supabase } from "@/lib/supabase.js";

export async function getNbMatchGagneById(winer_id = 41) {
    
    const { data: score, error } = await supabase
    .from('Score')
    .select('winer_score, winer_id')
    .eq('winer_id', winer_id)

    
    if (error) {
        return error;
    }
    
    const count = score.length;
    // console.log(score)
    // console.log(count)
    return {count}

}

