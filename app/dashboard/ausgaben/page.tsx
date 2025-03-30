"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { IconPlus, IconFilter } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ausgabenData from "./data.json";

// Typisierung der Ausgaben
interface Ausgabe {
  id: number;
  beschreibung: string;
  betrag: number;
  datum: string;
  kategorie: string;
  konto: string;
}

export default function AusgabenPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [ausgaben, setAusgaben] = useState<Ausgabe[]>([]);
  const [suchbegriff, setSuchbegriff] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    setAusgaben(ausgabenData as Ausgabe[]);
  }, []);

  const gefilterteAusgaben = ausgaben.filter(ausgabe => 
    ausgabe.beschreibung.toLowerCase().includes(suchbegriff.toLowerCase()) ||
    ausgabe.kategorie.toLowerCase().includes(suchbegriff.toLowerCase()) ||
    ausgabe.konto.toLowerCase().includes(suchbegriff.toLowerCase())
  );

  const gesamtAusgaben = gefilterteAusgaben.reduce((sum, ausgabe) => sum + ausgabe.betrag, 0);

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
    <main className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Ausgaben</h1>
          <p className="text-muted-foreground mt-1">Verwalten Sie Ihre Ausgaben und Kosten</p>
        </div>
        <Button size="sm" className="sm:self-start w-full sm:w-auto">
          <IconPlus className="mr-2 h-4 w-4" />
          Neue Ausgabe
        </Button>
      </header>

      {/* Statistiken */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Statistiken</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-b from-red-50 to-transparent border-red-200 dark:from-red-950/20 dark:border-red-800">
            <CardHeader className="pb-2">
              <CardDescription>Gesamtausgaben</CardDescription>
              <CardTitle className="text-2xl text-red-700 dark:text-red-400">{gesamtAusgaben.toFixed(2)} €</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-700 dark:text-red-400">Alle Ausgaben</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Diesen Monat</CardDescription>
              <CardTitle className="text-2xl">2.450,00 €</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">+5,2% zum Vormonat</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Hauptausgabentyp</CardDescription>
              <CardTitle className="text-2xl">1.200,00 €</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline" className="bg-muted/50">Miete</Badge>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Kategorien</CardDescription>
              <CardTitle className="text-2xl">12</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Ausgaben-Kategorien</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Diagramm */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Ausgaben-Verlauf</h2>
        <Card>
          <CardContent className="pt-6">
            <ChartAreaInteractive />
          </CardContent>
        </Card>
      </section>

      {/* Ausgaben-Tabelle */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold">Alle Ausgaben</h2>
          <div className="flex gap-2 w-full sm:w-auto max-w-xs">
            <Input 
              placeholder="Suchen..." 
              value={suchbegriff}
              onChange={(e) => setSuchbegriff(e.target.value)}
              className="h-9"
            />
            <Button variant="outline" size="sm" className="shrink-0">
              <IconFilter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Beschreibung</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Betrag</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Datum</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Kategorie</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Konto</th>
                </tr>
              </thead>
              <tbody>
                {gefilterteAusgaben.length > 0 ? (
                  gefilterteAusgaben.map((ausgabe) => (
                    <tr key={ausgabe.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">{ausgabe.beschreibung}</td>
                      <td className="py-3 px-4 font-medium text-red-600 dark:text-red-400">
                        {ausgabe.betrag.toFixed(2)} €
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{new Date(ausgabe.datum).toLocaleDateString('de-DE')}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-muted/50">{ausgabe.kategorie}</Badge>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{ausgabe.konto}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      Keine Ausgaben gefunden.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </main>
  );
} 