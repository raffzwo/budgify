"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Settings, UserIcon } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  
  // Überprüfe, ob der Benutzer angemeldet ist
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

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
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <Card className="animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
        <CardHeader className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-start md:space-y-0">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Einstellungen
            </CardTitle>
            <CardDescription>
              Verwalte deine Kontoeinstellungen und Präferenzen
            </CardDescription>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Profil
              </h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Bearbeite deine persönlichen Daten und Anzeigeinformationen
              </p>
              
              <div className="px-4 py-3 bg-muted/30 rounded-md text-center text-sm text-muted-foreground">
                Die Einstellungsseite befindet sich noch in der Entwicklung. Bald kannst du hier deine Kontoeinstellungen verwalten.
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
          >
            Zurück zum Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 