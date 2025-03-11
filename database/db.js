import { createClient } from 'jsr:@supabase/supabase-js@2'
import { config } from 'dotenv'

config()

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
        
