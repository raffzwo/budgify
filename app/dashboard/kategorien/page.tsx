"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { IconPlus, IconFilter, IconPencil, IconTrash } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import kategorienData from "./data.json";

// Typisierung der Kategorien
interface Kategorie {
  id: number;
  name: string;
  typ: "einnahme" | "ausgabe";
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
  const einnahmeKategorien = gefilterteKategorien.filter(k => k.typ === "einnahme");
  const ausgabeKategorien = gefilterteKategorien.filter(k => k.typ === "ausgabe");

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
    <main className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Kategorien</h1>
          <p className="text-muted-foreground mt-1">Verwalten Sie Ihre Einnahmen- und Ausgabenkategorien</p>
        </div>
        <Button size="sm" className="sm:self-start w-full sm:w-auto">
          <IconPlus className="mr-2 h-4 w-4" />
          Neue Kategorie
        </Button>
      </header>

      {/* Statistiken */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Statistiken</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-b from-purple-50 to-transparent border-purple-200 dark:from-purple-950/20 dark:border-purple-800">
            <CardHeader className="pb-2">
              <CardDescription>Gesamtkategorien</CardDescription>
              <CardTitle className="text-2xl text-purple-700 dark:text-purple-400">{gefilterteKategorien.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-700 dark:text-purple-400">Alle Kategorien</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-b from-green-50 to-transparent border-green-200 dark:from-green-950/20 dark:border-green-800">
            <CardHeader className="pb-2">
              <CardDescription>Einnahmenkategorien</CardDescription>
              <CardTitle className="text-2xl text-green-700 dark:text-green-400">{einnahmeKategorien.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-green-700 dark:text-green-400">Für Einnahmen</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-b from-red-50 to-transparent border-red-200 dark:from-red-950/20 dark:border-red-800">
            <CardHeader className="pb-2">
              <CardDescription>Ausgabenkategorien</CardDescription>
              <CardTitle className="text-2xl text-red-700 dark:text-red-400">{ausgabeKategorien.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-700 dark:text-red-400">Für Ausgaben</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Kategorien-Tabelle */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
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
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Name</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Typ</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Farbe</th>
                  <th className="py-3 px-4 text-left font-medium text-muted-foreground">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {gefilterteKategorien.length > 0 ? (
                  gefilterteKategorien.map((kategorie) => (
                    <tr key={kategorie.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">{kategorie.name}</td>
                      <td className="py-3 px-4">
                        {kategorie.typ === "einnahme" ? (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800">
                            Einnahme
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800">
                            Ausgabe
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div 
                          className="w-6 h-6 rounded-full" 
                          style={{ backgroundColor: kategorie.farbe }}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <IconPencil className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 dark:text-red-400">
                            <IconTrash className="h-4 w-4" />
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
        </Card>
      </section>
    </main>
  );
} 