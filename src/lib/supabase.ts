import { createClient } from '@supabase/supabase-js';

// In a real production app, these would be required environment variables.
// For the MVP, we use mock URLs to prevent crashing if the user hasn't set them up yet,
// but they can be easily overridden.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
