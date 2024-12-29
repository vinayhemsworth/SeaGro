import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://prsssbxtfnwpmvoaekbf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByc3NzYnh0Zm53cG12b2Fla2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0NTc3MTEsImV4cCI6MjA1MTAzMzcxMX0.mt8XPwXA6Ecxug1jWDcmjQzWG2SBVz4TAC6TnDM5ODE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 