"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { IconPlus, IconPencil, IconTrash, IconFilter } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import kategorienData from "./data.json";

// Typisierung der Kategorien
interface Kategorie {
  id: number;
  name: string;
  typ: string;
  farbe: string;
}

export default function KategorienPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [kategorien, setKategorien] = useState<Kategorie[]>([]);
  const [suchbegriff, setSuchbegriff] = useState("");

  // Wenn der Benutzer nicht eingeloggt ist und das Laden abgeschlossen ist, zur Login-Seite umleiten
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Kategorien laden
  useEffect(() => {
    setKategorien(kategorienData as Kategorie[]);
  }, []);

  // Gefilterte Kategorien
  const gefilterteKategorien = kategorien.filter(kategorie => 
    kategorie.name.toLowerCase().includes(suchbegriff.toLowerCase()) ||
    kategorie.typ.toLowerCase().includes(suchbegriff.toLowerCase())
  );

  // Kategorien nach Typ aufteilen
  const einnahmeKategorien = kategorien.filter(k => k.typ === "Einnahme");
  const ausgabeKategorien = kategorien.filter(k => k.typ === "Ausgabe");

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
          <h1 className="text-3xl font-bold mb-1">Kategorien</h1>
          <p className="text-muted-foreground">Verwalten Sie Ihre Ein- und Ausgabe-Kategorien</p>
        </div>
        <Button className="sm:self-start" size="sm">
          <IconPlus className="mr-2 h-4 w-4" />
          Neue Kategorie
        </Button>
      </div>

      {/* Statistiken */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardDescription>Alle Kategorien</CardDescription>
            <CardTitle className="text-2xl text-purple-700 dark:text-purple-400">{kategorien.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-700 dark:text-purple-400">Gesamt</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <CardDescription>Einnahme-Kategorien</CardDescription>
            <CardTitle className="text-2xl text-green-700 dark:text-green-400">{einnahmeKategorien.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700 dark:text-green-400">Zur Einkommensverwaltung</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/20 dark:to-red-900/20 border-red-200 dark:border-red-800">
          <CardHeader className="pb-2">
            <CardDescription>Ausgabe-Kategorien</CardDescription>
            <CardTitle className="text-2xl text-red-700 dark:text-red-400">{ausgabeKategorien.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-700 dark:text-red-400">Zur Ausgabenverwaltung</p>
          </CardContent>
        </Card>
      </div>

      {/* Kategorien-Tabelle */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <h2 className="text-xl font-semibold">Alle Kategorien</h2>
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
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground">Name</th>
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground">Typ</th>
                    <th className="py-3 px-4 text-left font-medium text-muted-foreground">Farbe</th>
                    <th className="py-3 px-4 text-right font-medium text-muted-foreground">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {gefilterteKategorien.length > 0 ? (
                    gefilterteKategorien.map((kategorie) => (
                      <tr key={kategorie.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span 
                              className="inline-block w-3 h-3 rounded-full" 
                              style={{ backgroundColor: kategorie.farbe }}
                            ></span>
                            {kategorie.name}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge 
                            variant={kategorie.typ === "Einnahme" ? "outline" : "secondary"}
                            className={
                              kategorie.typ === "Einnahme" 
                                ? "text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800" 
                                : "text-red-600 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800"
                            }
                          >
                            {kategorie.typ}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span 
                              className="inline-block w-5 h-5 rounded" 
                              style={{ backgroundColor: kategorie.farbe }}
                            ></span>
                            <span className="text-muted-foreground text-sm">{kategorie.farbe}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <IconPencil className="h-4 w-4" />
                              <span className="sr-only">Bearbeiten</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 dark:hover:text-red-400">
                              <IconTrash className="h-4 w-4" />
                              <span className="sr-only">Löschen</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-muted-foreground">
                        Keine Kategorien gefunden.
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