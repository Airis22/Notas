import { createClient } from '@supabase/supabase-js';

// Configura la URL y la clave de Supabase
const supabaseUrl = 'https://hjnhqogdmapkxphyvlfe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqbmhxb2dkbWFwa3hwaHl2bGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4NzYzODEsImV4cCI6MjA1NDQ1MjM4MX0.U7pTMsis_df283F08Tb1RVsr-Ik5BWx8ndwUcqIlF6A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey,{
  auth: {
    //storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

