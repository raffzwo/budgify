"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, UserPlus, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

// Validierungsschema für Schritt 1 (Name und E-Mail)
const step1Schema = z.object({
  name: z.string().min(2, "Der Name muss mindestens 2 Zeichen lang sein."),
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein.")
});

// Validierungsschema für Schritt 2 (Passwort und Zustimmung)
const step2Schema = z.object({
  password: z.string().min(8, "Das Passwort muss mindestens 8 Zeichen lang sein."),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "Du musst den Nutzungsbedingungen zustimmen, um fortzufahren."
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Die Passwörter stimmen nicht überein.",
  path: ["confirmPassword"]
});

// Typen für die Formulardaten
type Step1FormValues = z.infer<typeof step1Schema>;
type Step2FormValues = z.infer<typeof step2Schema>;
type RegisterFormValues = Step1FormValues & Step2FormValues;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(1);
  const totalSteps = 2;
  
  // Zentraler Zustand für alle Formulardaten
  const [formData, setFormData] = useState<Partial<RegisterFormValues>>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false
  });

  // Form-Hook für Schritt 1
  const form1 = useForm<Step1FormValues>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: formData.name || "",
      email: formData.email || ""
    }
  });

  // Form-Hook für Schritt 2
  const form2 = useForm<Step2FormValues>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      password: formData.password || "",
      confirmPassword: formData.confirmPassword || "",
      terms: formData.terms || false
    }
  });

  const { signUp } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);

  function nextStep() {
    if (step === 1) {
      // Validiere Formular 1 und gehe erst zum nächsten Schritt, wenn es gültig ist
      form1.handleSubmit((data) => {
        // Speichere die Daten und gehe zum nächsten Schritt
        setFormData(prev => ({ ...prev, ...data }));
        setStep(2);
      })();
    }
  }

  function prevStep() {
    if (step === 2) {
      // Speichere die eingegebenen Daten aus Schritt 2
      const step2Data = form2.getValues();
      setFormData(prev => ({ ...prev, ...step2Data }));
      setStep(1);
    }
  }

  // Handler für Schritt 2 Submit
  async function onSubmitStep2(data: Step2FormValues) {
    setIsLoading(true);
    setAuthError(null);
    
    // Fortschrittsbalken starten
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 80) {
          clearInterval(interval);
          return 80;
        }
        return prev + 10;
      });
    }, 100);

    try {
      // Kombiniere die Daten aus beiden Schritten
      const completeData = { ...formData, ...data };
      
      // Registriere den Benutzer mit Supabase
      const { success, error } = await signUp(
        completeData.email || "", 
        completeData.password || "", 
        { name: completeData.name || "" }
      );
      
      if (success) {
        // Fortschrittsbalken auf 100% setzen
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          // Nach erfolgreicher Registrierung zur Bestätigungsseite navigieren
          router.push("/register/confirm");
        }, 500);
      } else {
        clearInterval(interval);
        setProgress(0);
        setIsLoading(false);
        if (error) {
          // Fehlermeldung anzeigen
          setAuthError("Es ist ein Fehler bei der Registrierung aufgetreten. Bitte überprüfe deine Eingaben.");
          console.error("Registrierungsfehler:", error);
        }
      }
    } catch (error) {
      clearInterval(interval);
      setProgress(0);
      setIsLoading(false);
      setAuthError("Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.");
      console.error("Registrierungsfehler:", error);
    }
  }

  return (
    <div className="container mx-auto max-w-md py-12 px-4">
      <Card className="animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
        <CardHeader>
          <CardTitle className="text-center">Registrieren</CardTitle>
          <CardDescription className="text-center">
            Erstelle ein neues Konto, um Budgify zu nutzen
          </CardDescription>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground">Schritt {step} von {totalSteps}</span>
            <Progress value={(step / totalSteps) * 100} className="w-32" />
          </div>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <Form {...form1}>
              <form onSubmit={form1.handleSubmit(nextStep)} className="space-y-6">
                <FormField
                  control={form1.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Max Mustermann"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form1.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@example.com"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Deine E-Mail-Adresse wird für die Kontoerstellung und Benachrichtigungen verwendet.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  Weiter
                </Button>
              </form>
            </Form>
          )}

          {step === 2 && (
            <Form {...form2}>
              <form onSubmit={form2.handleSubmit(onSubmitStep2)} className="space-y-6">
                {authError && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                    <p className="text-sm text-destructive text-center">{authError}</p>
                  </div>
                )}
                
                <FormField
                  control={form2.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passwort</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            disabled={isLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Verwende mindestens 8 Zeichen mit Buchstaben, Zahlen und Sonderzeichen.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form2.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passwort bestätigen</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            disabled={isLoading}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={isLoading}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form2.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="text-sm font-normal inline-flex flex-wrap items-center gap-1">
                          <span>Ich stimme den</span>
                          <Link href="/terms" className="text-primary hover:underline whitespace-nowrap">Nutzungsbedingungen</Link>
                          <span>und der</span>
                          <Link href="/privacy" className="text-primary hover:underline whitespace-nowrap">Datenschutzerklärung</Link>
                          <span>zu.</span>
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {isLoading && (
                  <div className="space-y-2">
                    <Progress value={progress} />
                    <p className="text-xs text-center text-muted-foreground">Registrierung läuft...</p>
                  </div>
                )}

                <div className="flex justify-between gap-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="flex-1"
                    onClick={prevStep}
                    disabled={isLoading}
                  >
                    Zurück
                  </Button>
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? "Wird registriert..." : "Registrieren"}
                    <UserPlus className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          )}
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Oder mit
                </span>
              </div>
            </div>
            
            <div className="mt-4 flex flex-col space-y-3">
              <Button 
                variant="outline" 
                className="w-full"
                disabled={isLoading}
              >
                Mit Google registrieren
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                disabled={isLoading}
              >
                Mit Apple registrieren
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-center gap-2">
          <div className="text-sm text-muted-foreground">
            Bereits registriert?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Anmelden
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