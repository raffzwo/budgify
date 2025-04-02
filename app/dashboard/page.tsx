"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, ArrowRight, TrendingDown, Tags, ExternalLink, Target } from "lucide-react";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md animate-pulse">
          <CardContent>
            <div className="space-y-4">
              <div className="h-6 bg-muted rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
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
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl p-4 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Willkommen, {user.user_metadata?.name || user.email}!
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Hier ist ein Überblick über Ihre Finanzen
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => {}}
            className="h-9 w-9 text-muted-foreground"
          >
            <ExternalLink className="h-5 w-5" />
            <span className="sr-only">Vollbild</span>
          </Button>
        </div>

        {/* Tabs für die verschiedenen Dashboard-Ansichten */}
        <Tabs defaultValue="uebersicht" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="uebersicht">Übersicht</TabsTrigger>
            <TabsTrigger value="finanzen">Finanzen</TabsTrigger>
            <TabsTrigger value="ziele">Ziele</TabsTrigger>
          </TabsList>
          
          {/* Übersicht Tab */}
          <TabsContent value="uebersicht" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="rounded-xl border shadow">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-base font-medium">Gesamteinnahmen</div>
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-emerald-600">4.685,70 €</div>
                  <Link 
                    href="/dashboard/einnahmen" 
                    className="mt-3 inline-flex items-center text-sm text-muted-foreground hover:text-emerald-600 transition-colors"
                  >
                    Details anzeigen
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </Card>
              
              <Card className="rounded-xl border shadow">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-base font-medium">Gesamtausgaben</div>
                    <TrendingDown className="h-5 w-5 text-rose-500" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-rose-600">2.472,73 €</div>
                  <Link 
                    href="/dashboard/ausgaben" 
                    className="mt-3 inline-flex items-center text-sm text-muted-foreground hover:text-rose-600 transition-colors"
                  >
                    Details anzeigen
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </Card>
              
              <Card className="rounded-xl border shadow">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-base font-medium">Aktuelles Saldo</div>
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-blue-600">2.212,97 €</div>
                  <div className="mt-3 inline-flex items-center text-sm text-muted-foreground">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    +9,3% diesen Monat
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Chart ohne Container mit Überschrift */}
            <div className="rounded-xl border shadow overflow-hidden">
              <ChartAreaInteractive />
            </div>
            
            {/* Budget-Fortschritt */}
            <Card className="rounded-xl border shadow">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-base font-medium">Budget-Fortschritt</div>
                  <Target className="h-5 w-5 text-blue-500" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Monatliches Ausgabenlimit</span>
                      <span className="text-sm text-muted-foreground">2.472,73 € / 3.000,00 €</span>
                    </div>
                    <Progress value={82} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">82% des monatlichen Budgets ausgegeben</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Sparziel erreicht</span>
                      <span className="text-sm text-muted-foreground">1.200,00 € / 5.000,00 €</span>
                    </div>
                    <Progress value={24} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">24% des Sparziels erreicht</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* Finanzen Tab */}
          <TabsContent value="finanzen" className="space-y-6">
            <Card className="rounded-xl border shadow p-6">
              <h3 className="text-lg font-medium mb-4">Detaillierte Finanzübersicht</h3>
              <p className="text-muted-foreground mb-4">Hier finden Sie eine detaillierte Aufschlüsselung Ihrer Finanzen.</p>
              <div className="text-sm text-muted-foreground">
                Wählen Sie die &quot;Einnahmen&quot; oder &quot;Ausgaben&quot; Links in der Navigation, um detaillierte Ansichten zu sehen.
              </div>
            </Card>
          </TabsContent>
          
          {/* Ziele Tab */}
          <TabsContent value="ziele" className="space-y-6">
            <Card className="rounded-xl border shadow p-6">
              <h3 className="text-lg font-medium mb-4">Ihre Finanzziele</h3>
              <p className="text-muted-foreground mb-4">Verfolgen Sie Ihre Finanzzieleund setzen Sie neue Ziele.</p>
              <Button variant="outline">Neues Ziel setzen</Button>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation Cards (beibehalten) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard/einnahmen" className="block group">
            <Card className="rounded-xl border shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-100 dark:bg-emerald-900/20 w-12 h-12 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-medium">Einnahmen</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Erfassen und verfolgen Sie Ihre Einkommensquellen
                </p>
                <div className="flex items-center text-sm text-emerald-600">
                  Zur Übersicht
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/ausgaben" className="block group">
            <Card className="rounded-xl border shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-rose-100 dark:bg-rose-900/20 w-12 h-12 rounded-full flex items-center justify-center">
                    <TrendingDown className="h-6 w-6 text-rose-600" />
                  </div>
                  <h3 className="text-lg font-medium">Ausgaben</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Behalten Sie Ihre Ausgaben im Überblick
                </p>
                <div className="flex items-center text-sm text-rose-600">
                  Zur Übersicht
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/kategorien" className="block group">
            <Card className="rounded-xl border shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center">
                    <Tags className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium">Kategorien</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Organisieren Sie Ihre Finanzen in Kategorien
                </p>
                <div className="flex items-center text-sm text-blue-600">
                  Zur Übersicht
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
} 