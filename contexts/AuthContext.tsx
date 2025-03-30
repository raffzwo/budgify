'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

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
}

// Erstelle den Context mit Standardwerten
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  signUp: async () => ({ success: false, error: new Error('Not implemented') }),
  signIn: async () => ({ success: false, error: new Error('Not implemented') }),
  signOut: async () => {},
})

// Hook für den Zugriff auf den Auth-Context
export const useAuth = () => useContext(AuthContext)

// Auth-Provider-Komponente
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    // Lade die aktuelle Session beim ersten Rendern
    const getInitialSession = async () => {
      setIsLoading(true)

      const { data: { session: initialSession } } = await supabase.auth.getSession()
      setSession(initialSession)
      setUser(initialSession?.user ?? null)

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
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      })

      if (error) {
        throw error
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

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 