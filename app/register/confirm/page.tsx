"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

export default function ConfirmPage() {
  const { resendConfirmationEmail, lastRegisteredEmail } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | null;
    message: string | null;
  }>({ type: null, message: null });
  const [emailInput, setEmailInput] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);

  // Funktion zum erneuten Senden der Bestätigungsmail
  const handleResendConfirmationEmail = async () => {
    // Zurücksetzen des Status
    setStatusMessage({ type: null, message: null });
    setIsSending(true);
    
    try {
      const emailToUse = showEmailInput ? emailInput : lastRegisteredEmail;
      
      if (!emailToUse) {
        setStatusMessage({
          type: 'error',
          message: 'Bitte gib deine E-Mail-Adresse ein.'
        });
        setShowEmailInput(true);
        setIsSending(false);
        return;
      }
      
      const { success, error } = await resendConfirmationEmail(emailToUse);
      
      if (success) {
        setStatusMessage({
          type: 'success',
          message: 'Eine neue Bestätigungsmail wurde gesendet. Bitte überprüfe deinen Posteingang.'
        });
        setShowEmailInput(false);
      } else {
        setStatusMessage({
          type: 'error',
          message: error?.message || 'Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.'
        });
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        message: 'Es ist ein unerwarteter Fehler aufgetreten. Bitte versuche es später erneut.'
      });
      console.error("Fehler beim Senden der Bestätigungsmail:", error);
    } finally {
      setIsSending(false);
    }
  };

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
          
          {statusMessage.type && (
            <div className={`p-3 rounded-md ${statusMessage.type === 'success' ? 'bg-green-100 border border-green-200' : 'bg-destructive/10 border border-destructive/20'}`}>
              <div className="flex items-center gap-2">
                {statusMessage.type === 'success' ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                )}
                <p className={`text-sm ${statusMessage.type === 'success' ? 'text-green-600' : 'text-destructive'}`}>
                  {statusMessage.message}
                </p>
              </div>
            </div>
          )}
          
          <p className="text-sm font-medium">
            Keine E-Mail erhalten?
          </p>
          
          {showEmailInput && (
            <div className="flex flex-col gap-2">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Deine E-Mail-Adresse"
                className="px-3 py-2 rounded-md border border-input bg-background text-sm"
                disabled={isSending}
              />
            </div>
          )}
          
          <Button
            variant="outline"
            className="w-full"
            onClick={handleResendConfirmationEmail}
            disabled={isSending || (showEmailInput && !emailInput)}
          >
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Bestätigungsmail wird gesendet...
              </>
            ) : (
              'Bestätigungsmail erneut senden'
            )}
          </Button>
          
          {!showEmailInput && !lastRegisteredEmail && (
            <button
              type="button"
              onClick={() => setShowEmailInput(true)}
              className="text-sm text-primary hover:underline"
            >
              E-Mail-Adresse eingeben
            </button>
          )}
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