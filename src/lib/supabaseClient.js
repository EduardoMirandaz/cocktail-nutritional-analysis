import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY } from '../../supabase_key.js';

const supabaseUrl = 'https://kpqpzztlolviwhdioqlz.supabase.co';

export const supabase = createClient(supabaseUrl, SUPABASE_KEY);
