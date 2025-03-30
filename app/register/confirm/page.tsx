"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";

export default function ConfirmPage() {
  return (
    <div className="container mx-auto max-w-md py-12 px-4">
      <Card className="animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Bestätige deine E-Mail</CardTitle>
          <CardDescription className="text-center">
            Wir haben eine Bestätigungs-E-Mail an deine E-Mail-Adresse gesendet. Bitte klicke auf den Link in der E-Mail, um deine Registrierung abzuschließen.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Überprüfe bitte auch deinen Spam-Ordner, falls du die E-Mail nicht in deinem Posteingang findest. Die Bestätigungsmail sollte innerhalb weniger Minuten eintreffen.
          </p>
          <p className="text-sm font-medium">
            Keine E-Mail erhalten?
          </p>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              // Hier könnte eine Funktion zum erneuten Senden der Bestätigungsmail implementiert werden
              alert("Eine neue Bestätigungsmail wurde gesendet. Bitte überprüfe deinen Posteingang.");
            }}
          >
            Bestätigungsmail erneut senden
          </Button>
        </CardContent>
        <CardFooter className="flex-col items-center gap-2">
          <div className="text-sm text-muted-foreground">
            Bereits bestätigt?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Zur Anmeldung
            </Link>
          </div>
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mt-2">
            <ArrowLeft className="h-3 w-3" />
            Zurück zur Startseite
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
} 