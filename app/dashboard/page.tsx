"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, User } from "lucide-react";

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
      <div className="container mx-auto max-w-7xl py-12 px-4 flex items-center justify-center min-h-[60vh]">
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
          <CardFooter>
            <div className="h-10 bg-muted rounded w-full"></div>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl py-12 px-4">
      <Card className="w-full max-w-3xl mx-auto animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
              <CardDescription>
                Willkommen zurück, {user.user_metadata?.name || user.email}!
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleSignOut}
              title="Abmelden"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border rounded-md p-4 bg-muted/10">
              <h3 className="font-medium flex items-center gap-2">
                <User className="h-4 w-4" /> Kontoinformationen
              </h3>
              <div className="mt-2 space-y-2">
                <p className="text-sm"><span className="text-muted-foreground">E-Mail:</span> {user.email}</p>
                <p className="text-sm"><span className="text-muted-foreground">Registriert seit:</span> {new Date(user.created_at).toLocaleDateString('de-DE')}</p>
                <p className="text-sm"><span className="text-muted-foreground">E-Mail bestätigt:</span> {user.email_confirmed_at ? 'Ja' : 'Nein'}</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Dies ist eine einfache Dashboard-Seite. Hier könnten Budgetinformationen, Diagramme und andere finanzbezogene Daten angezeigt werden.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <Button onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" /> Abmelden
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 