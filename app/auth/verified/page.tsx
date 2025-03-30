"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function EmailVerifiedPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [verificationChecked, setVerificationChecked] = useState(false);

  useEffect(() => {
    // Wenn der Benutzer eingeloggt ist und seine E-Mail bestätigt wurde, 
    // markieren wir die Verifizierung als geprüft
    if (!isLoading && user) {
      setVerificationChecked(true);
    }
  }, [user, isLoading]);

  // Handler für die Weiterleitung zum Dashboard
  const handleGoToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="container mx-auto max-w-md py-12 px-4">
      <Card className="animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">E-Mail bestätigt!</CardTitle>
          <CardDescription className="text-center">
            Deine E-Mail-Adresse wurde erfolgreich bestätigt. Du kannst nun alle Funktionen von Budgify nutzen.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">
            {verificationChecked 
              ? "Dein Konto ist nun vollständig aktiviert."
              : "Bitte melde dich an, um alle Funktionen von Budgify zu nutzen."}
          </p>
          
          {user ? (
            <Button 
              className="w-full" 
              onClick={handleGoToDashboard}
            >
              Zum Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Link href="/login" className="block w-full">
              <Button className="w-full">
                Zur Anmeldung
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </CardContent>
        <CardFooter className="flex-col items-center gap-2">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors mt-2">
            Zurück zur Startseite
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
} 