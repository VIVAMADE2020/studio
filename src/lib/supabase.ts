
"use server"

import { createClient } from '@supabase/supabase-js'

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in Server-Side code.
// The SERVICE_ROLE_KEY has admin privileges and can bypass any Row Level Security policies.
let supabaseAdmin: ReturnType<typeof createClient> | null = null;

export const createServerClient = () => {
    if (supabaseAdmin) {
        return supabaseAdmin;
    }
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error('Supabase URL or service role key is missing from environment variables.');
    }
    
    supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
    return supabaseAdmin;
}


// The regular createClient should be used in client-side code with the ANON_KEY.
// This key is public and safe to use in a browser.
export const createBrowserClient = () => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Supabase URL or anon key is missing from environment variables.');
    }
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
}
