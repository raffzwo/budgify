// Dieser Client wird für serverseitige Operationen in Next.js Server-Komponenten verwendet
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Erstelle einen Supabase-Client für die Server-Umgebung (Readonly-Mode für Server-Komponenten)
export function createSupabaseServerClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // Einfache Implementierung für Server-Komponenten, die nur Cookie-Auslesen unterstützt
      cookies: {
        get(name: string) {
          // @ts-expect-error - In Next.js 14 funktioniert dies trotz TypeScript-Warnung
          return cookies().get(name)?.value
        },
      },
    }
  )
}

// Hilfsfunktion zum Abrufen der aktuellen Session
export async function getSession() {
  try {
    const supabase = createSupabaseServerClient()
    const { data } = await supabase.auth.getSession()
    return data.session
  } catch (error) {
    console.error('Fehler beim Abrufen der Session:', error)
    return null
  }
}

// Hilfsfunktion zum Abrufen des aktuellen Benutzers
export async function getCurrentUser() {
  try {
    const session = await getSession()
    return session?.user ?? null
  } catch (error) {
    console.error('Fehler beim Abrufen des Benutzers:', error)
    return null
  }
} 