"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
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

// Validierungsschema für das Login-Formular
const loginSchema = z.object({
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
  password: z.string().min(8, "Das Passwort muss mindestens 8 Zeichen lang sein."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [progress, setProgress] = useState(0);

  // Form-Hook initialisieren
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    
    // Fortschrittsbalken simulieren
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Nach "Login" zur Startseite navigieren (für Demo-Zwecke)
          setTimeout(() => {
            setIsLoading(false);
            router.push("/");
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
    
    // Demo-Zwecke: Hier würde normalerweise die Login-Logik implementiert werden
    console.log("Login-Daten:", data);
  }

  return (
    <div className="container mx-auto max-w-md py-12 px-4">
      <Card className="animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
        <CardHeader>
          <CardTitle className="text-center">Anmelden</CardTitle>
          <CardDescription className="text-center">
            Melde dich mit deinen Zugangsdaten an
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <div className="flex justify-end">
                      <Link
                        href="/forgot-password"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Passwort vergessen?
                      </Link>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {isLoading && (
                <div className="space-y-2">
                  <Progress value={progress} />
                  <p className="text-xs text-center text-muted-foreground">Anmeldung läuft...</p>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Wird angemeldet..." : "Anmelden"}
                <LogIn className="ml-2 h-4 w-4" />
              </Button>
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
                Mit Google fortfahren
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                disabled={isLoading}
              >
                Mit Apple fortfahren
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-center gap-2">
          <div className="text-sm text-muted-foreground">
            Noch kein Konto?{" "}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Registrieren
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