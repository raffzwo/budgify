// Dieser Client wird für Import im Browser verwendet
import { createBrowserClient } from '@supabase/ssr'

// Erstelle einen Supabase-Client für die Browser-Umgebung
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
) 