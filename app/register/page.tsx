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

// Validierungsschema für das Registrierungsformular
const registerSchema = z.object({
  name: z.string().min(2, "Der Name muss mindestens 2 Zeichen lang sein."),
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
  password: z.string().min(8, "Das Passwort muss mindestens 8 Zeichen lang sein."),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "Du musst den Nutzungsbedingungen zustimmen, um fortzufahren.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Die Passwörter stimmen nicht überein.",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  // Form-Hook initialisieren
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  function nextStep() {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  }

  function prevStep() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    
    // Fortschrittsbalken simulieren
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Nach "Registrierung" zur Startseite navigieren (für Demo-Zwecke)
          setTimeout(() => {
            setIsLoading(false);
            router.push("/");
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
    
    // Demo-Zwecke: Hier würde normalerweise die Registrierungs-Logik implementiert werden
    console.log("Registrierungsdaten:", data);
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <>
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                </>
              )}

              {step === 2 && (
                <>
                  <FormField
                    control={form.control}
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
                    control={form.control}
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
                    control={form.control}
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
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            Ich stimme den <Link href="/terms" className="text-primary hover:underline">Nutzungsbedingungen</Link> und der <Link href="/privacy" className="text-primary hover:underline">Datenschutzerklärung</Link> zu.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </>
              )}

              {isLoading && (
                <div className="space-y-2">
                  <Progress value={progress} />
                  <p className="text-xs text-center text-muted-foreground">Registrierung läuft...</p>
                </div>
              )}

              <div className="flex justify-between gap-4">
                {step > 1 && (
                  <Button 
                    type="button" 
                    variant="outline"
                    className="flex-1"
                    onClick={prevStep}
                    disabled={isLoading}
                  >
                    Zurück
                  </Button>
                )}
                
                {step < totalSteps ? (
                  <Button 
                    type="button" 
                    className="flex-1"
                    onClick={() => {
                      if (step === 1) {
                        form.trigger(["name", "email"]);
                        if (!form.formState.errors.name && !form.formState.errors.email) {
                          nextStep();
                        }
                      }
                    }}
                    disabled={isLoading}
                  >
                    Weiter
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={isLoading}
                  >
                    {isLoading ? "Wird registriert..." : "Registrieren"}
                    <UserPlus className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </Form>
          
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