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
import einnahmenData from "./data.json";

// Typisierung der Einnahmen
interface Einnahme {
  id: number;
  beschreibung: string;
  betrag: number;
  datum: string;
  kategorie: string;
  konto: string;
}

export default function EinnahmenPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [einnahmen, setEinnahmen] = useState<Einnahme[]>([]);
  const [suchbegriff, setSuchbegriff] = useState("");

  // Wenn der Benutzer nicht eingeloggt ist und das Laden abgeschlossen ist, zur Login-Seite umleiten
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Einnahmen laden
  useEffect(() => {
    setEinnahmen(einnahmenData as Einnahme[]);
  }, []);

  // Gefilterte Einnahmen
  const gefilterteEinnahmen = einnahmen.filter(einnahme => 
    einnahme.beschreibung.toLowerCase().includes(suchbegriff.toLowerCase()) ||
    einnahme.kategorie.toLowerCase().includes(suchbegriff.toLowerCase()) ||
    einnahme.konto.toLowerCase().includes(suchbegriff.toLowerCase())
  );

  // Gesamtbetrag berechnen
  const gesamtEinnahmen = gefilterteEinnahmen.reduce((sum, einnahme) => sum + einnahme.betrag, 0);

  // Wenn noch geladen wird oder kein Benutzer vorhanden ist, zeige Ladebildschirm
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
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Einnahmen</h1>
          <p className="text-muted-foreground">Verwalten Sie Ihre Einnahmen und Einkommensquellen</p>
        </div>
        <Button className="sm:self-start" size="sm">
          <IconPlus className="mr-2 h-4 w-4" />
          Neue Einnahme
        </Button>
      </div>

      {/* Statistiken */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardDescription>Gesamteinnahmen</CardDescription>
            <CardTitle className="text-2xl text-green-700 dark:text-green-400">{gesamtEinnahmen.toFixed(2)} €</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700 dark:text-green-400">Alle Einnahmen</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Diesen Monat</CardDescription>
            <CardTitle className="text-2xl">3.850,00 €</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">+12,5% zum Vormonat</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Haupteinkommensquelle</CardDescription>
            <CardTitle className="text-2xl">2.500,00 €</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="bg-muted/50">Gehalt</Badge>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Kategorien</CardDescription>
            <CardTitle className="text-2xl">7</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Einnahme-Kategorien</p>
          </CardContent>
        </Card>
      </div>

      {/* Diagramm */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Einnahmen-Verlauf</h2>
        <Card>
          <CardContent className="pt-6">
            <ChartAreaInteractive />
          </CardContent>
        </Card>
      </div>

      {/* Einnahmen-Tabelle */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <h2 className="text-xl font-semibold">Alle Einnahmen</h2>
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
          <CardContent className="p-0">
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
                  {gefilterteEinnahmen.length > 0 ? (
                    gefilterteEinnahmen.map((einnahme) => (
                      <tr key={einnahme.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4">{einnahme.beschreibung}</td>
                        <td className="py-3 px-4 font-medium text-green-600 dark:text-green-400">
                          {einnahme.betrag.toFixed(2)} €
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{new Date(einnahme.datum).toLocaleDateString('de-DE')}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="bg-muted/50">{einnahme.kategorie}</Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{einnahme.konto}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        Keine Einnahmen gefunden.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 