import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // Prüfe, ob die Route login oder register ist
  const isAuthRoute = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register'
  
  const response = NextResponse.next()
  
  // Erstelle einen Supabase-Client für den Middleware-Kontext
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        set(name, value, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name, options) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )
  
  try {
    // Prüfe, ob der Benutzer authentifiziert ist
    const { data } = await supabase.auth.getSession()
    const session = data.session
    
    // Definiere geschützte Routen
    const protectedRoutes = ['/dashboard', '/profile', '/settings']
    const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))
    
    console.log('Middleware - URL:', request.nextUrl.pathname)
    console.log('Middleware - Session vorhanden:', !!session)
    console.log('Middleware - Ist geschützte Route:', isProtectedRoute)
    console.log('Middleware - Ist Auth-Route:', isAuthRoute)
    
    // Leite zu /login um, wenn es eine geschützte Route ist und der Benutzer nicht angemeldet ist
    if (isProtectedRoute && !session) {
      console.log('Middleware - Umleitung zu /login')
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // Leite zu /dashboard um, wenn der Benutzer bereits angemeldet ist und login oder register aufruft
    if (isAuthRoute && session) {
      console.log('Middleware - Umleitung zu /dashboard')
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    
    // Falls keine Umleitung nötig ist, einfach fortfahren
    return response
  } catch (error) {
    console.error('Middleware - Fehler bei der Session-Prüfung:', error)
    
    // Bei einem Fehler in der Session-Prüfung:
    // Wenn es eine geschützte Route ist, zur Login-Seite umleiten (sicherer)
    const protectedRoutes = ['/dashboard', '/profile', '/settings']
    if (protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // Sonst normal fortfahren
    return response
  }
} 