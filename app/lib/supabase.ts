import { createClient } from '@supabase/supabase-js';

// เปลี่ยน URL และ ANON KEY เป็นของคุณจากหน้า Project Settings -> API ใน Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://patgdqshytaekupjlsiy.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhdGdkcXNoeXRhZWt1cGpsc2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0OTE2MTEsImV4cCI6MjA4NzA2NzYxMX0.d6cqbLoMEREeXdP3moNZN8ehbeXOkHNwqboJSS-XOSs';

export const supabase = createClient(supabaseUrl, supabaseKey);