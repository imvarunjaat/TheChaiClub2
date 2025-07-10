import { createClient } from '@supabase/supabase-js';

// Supabase project URL and anonymous key
const supabaseUrl = 'https://vkbsjkegzftbkkgdkrkt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrYnNqa2VnemZ0YmtrZ2Rrcmt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4MjQwMzEsImV4cCI6MjA2NzQwMDAzMX0.9Y43fcRRZrjiXfEzms7Y31LfzdIQmrjjGmYDob0JIzU';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase };
