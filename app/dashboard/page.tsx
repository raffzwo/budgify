"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, TrendingUp, ArrowRight } from "lucide-react";
import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import Link from "next/link";

export default function DashboardPage() {
  const { user, signOut, isLoading } = useAuth();
  const router = useRouter();

  // Wenn der Benutzer nicht eingeloggt ist und das Laden abgeschlossen ist, zur Login-Seite umleiten
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Ausloggen-Funktion
  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  // Wenn noch geladen wird oder kein Benutzer vorhanden ist, zeige Ladebildschirm
  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md animate-pulse">
          <CardHeader className="space-y-2">
            <div className="h-6 bg-muted rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header mit Begrüßung */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-1">Willkommen, {user.user_metadata?.name || user.email}!</h1>
          <p className="text-muted-foreground">Hier ist ein Überblick über Ihre Finanzen</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleSignOut}
          title="Abmelden"
          className="h-10 w-10"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      {/* Statusübersicht */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardDescription>Gesamteinnahmen</CardDescription>
            <CardTitle className="text-2xl text-green-700 dark:text-green-400">4.685,70 €</CardTitle>
          </CardHeader>
          <CardFooter>
            <Link href="/dashboard/einnahmen" className="text-sm text-green-700 dark:text-green-400 hover:underline inline-flex items-center">
              <span>Details anzeigen</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-red-200 dark:border-red-800">
          <CardHeader className="pb-2">
            <CardDescription>Gesamtausgaben</CardDescription>
            <CardTitle className="text-2xl text-red-700 dark:text-red-400">2.472,73 €</CardTitle>
          </CardHeader>
          <CardFooter>
            <Link href="/dashboard/ausgaben" className="text-sm text-red-700 dark:text-red-400 hover:underline inline-flex items-center">
              <span>Details anzeigen</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardDescription>Aktuelles Saldo</CardDescription>
            <CardTitle className="text-2xl text-blue-700 dark:text-blue-400">2.212,97 €</CardTitle>
          </CardHeader>
          <CardFooter>
            <div className="text-sm text-blue-700 dark:text-blue-400 inline-flex items-center">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+9,3% diesen Monat</span>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Übersichtskarten - Zeigen wir nur eine für ein schlankeres Design */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Finanzkennzahlen</h2>
        <SectionCards />
      </div>

      {/* Diagramm */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Verlauf</h2>
        <Card>
          <CardContent className="pt-6">
            <ChartAreaInteractive />
          </CardContent>
        </Card>
      </div>

      {/* Schnellzugriff-Navigation */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Finanzverwaltung</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/dashboard/einnahmen" className="block">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <div className="mr-2 p-2 rounded-full bg-green-100 dark:bg-green-900/40">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  Einnahmen
                </CardTitle>
                <CardDescription>Verwalten Sie Ihre Einnahmen</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Erfassen und verfolgen Sie Ihre Einkommensquellen und Einnahmen</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" className="w-full justify-start p-0 h-8 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
                  <span>Zur Übersicht</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/dashboard/ausgaben" className="block">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <div className="mr-2 p-2 rounded-full bg-red-100 dark:bg-red-900/40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-red-600 dark:text-red-400">
                      <path d="M23 18c-3.3 0-6-2.7-6-6v-6c0-1.1-.9-2-2-2H3C1.9 4 1 4.9 1 6v6c0 3.3 2.7 6 6 6h16"/>
                      <path d="M11 14v6"/>
                      <path d="m14 17-3 3-3-3"/>
                    </svg>
                  </div>
                  Ausgaben
                </CardTitle>
                <CardDescription>Verwalten Sie Ihre Ausgaben</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Behalten Sie den Überblick über Ausgaben und Kosten</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" className="w-full justify-start p-0 h-8 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                  <span>Zur Übersicht</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/dashboard/kategorien" className="block">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <div className="mr-2 p-2 rounded-full bg-purple-100 dark:bg-purple-900/40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-purple-600 dark:text-purple-400">
                      <rect width="3" height="7" x="3" y="14" rx="1"/>
                      <rect width="3" height="10" x="9" y="11" rx="1"/>
                      <rect width="3" height="14" x="15" y="7" rx="1"/>
                      <rect width="3" height="18" x="21" y="3" rx="1"/>
                    </svg>
                  </div>
                  Kategorien
                </CardTitle>
                <CardDescription>Verwalten Sie Ihre Kategorien</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Organisieren Sie Finanzen mit anpassbaren Kategorien</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="ghost" className="w-full justify-start p-0 h-8 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                  <span>Zur Übersicht</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
} 