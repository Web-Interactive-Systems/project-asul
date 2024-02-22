
import { supabase } from "@/lib/supabase.js";

export async function getNbMatchById(user_id) {
    
    const { data,  error } = await supabase
    .from('Score')
    .select('winer_score, loser_score', {count: "exact"})
    .or(`winer_id.eq.${user_id},loser_id.eq.${user_id}`)
    
    if (error) {
        return error;
    }
    
    return {data}

}

