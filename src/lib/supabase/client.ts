"use client"

import { createClient } from '@supabase/supabase-js'

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
