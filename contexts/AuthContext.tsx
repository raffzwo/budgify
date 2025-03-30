'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

// Typen für Benutzermetadaten
interface UserMetadata {
  name?: string;
  display_name?: string;
  [key: string]: unknown;
}

// Typen für den Auth-Context
type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signUp: (email: string, password: string, metadata?: object) => Promise<{
    success: boolean
    error: Error | null
  }>
  signIn: (email: string, password: string) => Promise<{
    success: boolean
    error: Error | null
  }>
  signOut: () => Promise<void>
  updateProfile: (data: { displayName?: string }) => Promise<{
    success: boolean
    error: Error | null
  }>
  resendConfirmationEmail: (email: string) => Promise<{
    success: boolean
    error: Error | null
  }>
  lastRegisteredEmail: string | null
}

// Erstelle den Context mit Standardwerten
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signUp: async () => ({ success: false, error: new Error('Not implemented') }),
  signIn: async () => ({ success: false, error: new Error('Not implemented') }),
  signOut: async () => {},
  updateProfile: async () => ({ success: false, error: new Error('Not implemented') }),
  resendConfirmationEmail: async () => ({ success: false, error: new Error('Not implemented') }),
  lastRegisteredEmail: null
})

// Hook für den Zugriff auf den Auth-Context
export const useAuth = () => useContext(AuthContext)

// Auth-Provider-Komponente
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [lastRegisteredEmail, setLastRegisteredEmail] = useState<string | null>(null)

  useEffect(() => {
    // Lade die aktuelle Session beim ersten Rendern
    const getInitialSession = async () => {
      setIsLoading(true)

      const { data: { session: initialSession } } = await supabase.auth.getSession()
      setSession(initialSession)
      setUser(initialSession?.user ?? null)

      // Beim Start versuchen wir, die zuletzt registrierte E-Mail aus dem localStorage zu laden
      if (typeof window !== 'undefined') {
        const storedEmail = localStorage.getItem('lastRegisteredEmail')
        if (storedEmail) {
          setLastRegisteredEmail(storedEmail)
        }
      }

      setIsLoading(false)

      // Richte den Auth-Listener ein
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        (_event, newSession) => {
          setSession(newSession)
          setUser(newSession?.user ?? null)
        }
      )

      // Cleanup-Funktion
      return () => {
        subscription.unsubscribe()
      }
    }

    getInitialSession()
  }, [])

  // Registrierungsfunktion
  const signUp = async (email: string, password: string, metadata?: object) => {
    try {
      // Stelle sicher, dass die Metadaten korrekt formatiert sind
      const userData: UserMetadata = metadata ? { ...metadata as object } : {}
      
      // Wenn es ein name-Feld gibt, stelle sicher, dass es als display_name gespeichert wird
      if (userData && 'name' in userData && typeof userData.name === 'string') {
        userData.display_name = userData.name
      }
      
      console.log('Registrierungsdaten:', { email, userData })
      
      // URL für die Weiterleitung nach der E-Mail-Bestätigung
      // Der Hostname wird automatisch aus dem Browser ermittelt
      const redirectUrl = typeof window !== 'undefined' ? 
        `${window.location.origin}/auth/verified` : 
        undefined;
        
      console.log('Weiterleitung nach Bestätigung:', redirectUrl);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: redirectUrl
        },
      })

      if (error) {
        throw error
      }

      // Speichere die E-Mail für die erneute Bestätigungsmail-Funktion
      setLastRegisteredEmail(email)
      
      // Speichere die E-Mail auch im localStorage, um sie bei Browsersitzungen beizubehalten
      if (typeof window !== 'undefined') {
        localStorage.setItem('lastRegisteredEmail', email)
      }

      return { success: true, error: null }
    } catch (error) {
      console.error('Fehler bei der Registrierung:', error)
      return { success: false, error: error as Error }
    }
  }

  // Login-Funktion
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      return { success: true, error: null }
    } catch (error) {
      console.error('Fehler beim Login:', error)
      return { success: false, error: error as Error }
    }
  }

  // Logout-Funktion
  const signOut = async () => {
    await supabase.auth.signOut()
  }
  
  // Funktion zum Aktualisieren des Benutzerprofils
  const updateProfile = async (data: { displayName?: string }) => {
    try {
      if (!user) {
        throw new Error('Kein Benutzer angemeldet')
      }
      
      const updates = {
        data: {
          // Behalte bestehende Metadaten bei
          ...user.user_metadata,
        } as UserMetadata
      }
      
      // Aktualisiere den Anzeigenamen, wenn vorhanden
      if (data.displayName) {
        updates.data.name = data.displayName
        updates.data.display_name = data.displayName
      }
      
      console.log('Profilaktualisierung:', updates)
      
      const { error } = await supabase.auth.updateUser(updates)
      
      if (error) {
        throw error
      }
      
      return { success: true, error: null }
    } catch (error) {
      console.error('Fehler bei der Profilaktualisierung:', error)
      return { success: false, error: error as Error }
    }
  }
  
  // Funktion zum erneuten Senden der Bestätigungsmail
  const resendConfirmationEmail = async (email: string) => {
    try {
      // URL für die Weiterleitung nach der E-Mail-Bestätigung
      const redirectUrl = typeof window !== 'undefined' ? 
        `${window.location.origin}/auth/verified` : 
        undefined;
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: redirectUrl,
        }
      })
      
      if (error) {
        throw error
      }
      
      return { success: true, error: null }
    } catch (error) {
      console.error('Fehler beim erneuten Senden der Bestätigungsmail:', error)
      return { success: false, error: error as Error }
    }
  }

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    resendConfirmationEmail,
    lastRegisteredEmail
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 