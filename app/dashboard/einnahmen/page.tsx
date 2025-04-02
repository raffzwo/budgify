"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { IconPlus, IconFilter, IconArrowUp, IconArrowDown, IconRepeat, IconChevronsLeft, IconChevronLeft, IconChevronRight, IconChevronsRight, IconCalendar } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

type SortConfig = {
  key: keyof Einnahme | null;
  direction: 'ascending' | 'descending';
};

// Funktion zum Formatieren von Geldbeträgen
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('de-DE', { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 2 
  }).format(amount);
};

// Funktion zum Formatieren von Datum
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Farbmap für verschiedene Kategorien
const categoryColorMap: Record<string, string> = {
  'Gehalt': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  'Freelance': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  'Dividenden': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  'Verkauf': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  'Rückerstattung': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400',
  'Geschenk': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400',
  'Sonstiges': 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
};

export default function EinnahmenPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [einnahmen, setEinnahmen] = useState<Einnahme[]>([]);
  const [suchbegriff, setSuchbegriff] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'datum',
    direction: 'descending'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    setEinnahmen(einnahmenData as Einnahme[]);
  }, []);

  const gefilterteEinnahmen = einnahmen.filter(einnahme => 
    einnahme.beschreibung.toLowerCase().includes(suchbegriff.toLowerCase()) ||
    einnahme.kategorie.toLowerCase().includes(suchbegriff.toLowerCase()) ||
    einnahme.konto.toLowerCase().includes(suchbegriff.toLowerCase())
  );

  const gesamtEinnahmen = gefilterteEinnahmen.reduce((sum, einnahme) => sum + einnahme.betrag, 0);

  // Sortierte Einnahmen
  const sortedEinnahmen = useMemo(() => {
    const sortableItems = [...gefilterteEinnahmen];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [gefilterteEinnahmen, sortConfig]);

  // Paginierung
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedEinnahmen.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedEinnahmen.length / itemsPerPage);

  // Sortierungsfunktion
  const requestSort = (key: keyof Einnahme) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Zeilen-Klick-Handler
  const handleRowClick = (einnahme: Einnahme) => {
    // Hier könnte später eine Detailansicht implementiert werden
    console.log("Einnahme ausgewählt:", einnahme);
  };

  // Seitenänderungsfunktion
  const changePage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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
          <h1 className="text-3xl font-bold">Einnahmen</h1>
          <p className="text-muted-foreground mt-1">Verwalten Sie Ihre Einnahmen und Einkommensquellen</p>
        </div>
        <Button size="sm" className="sm:self-start w-full sm:w-auto">
          <IconPlus className="mr-2 h-4 w-4" />
          Neue Einnahme
        </Button>
      </header>

      {/* Tabs für Einnahmen-Ansichten */}
      <Tabs defaultValue="uebersicht" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="uebersicht">Übersicht</TabsTrigger>
          <TabsTrigger value="alle-einnahmen">Alle Einnahmen</TabsTrigger>
        </TabsList>
        
        {/* Übersicht Tab */}
        <TabsContent value="uebersicht" className="space-y-6">
          {/* Statistiken */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-b from-green-50 to-transparent border-green-200 dark:from-green-950/20 dark:border-green-800">
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
          
          {/* Diagramm ohne Container mit Überschrift */}
          <div className="rounded-xl border shadow overflow-hidden">
            <ChartAreaInteractive />
          </div>
        </TabsContent>
        
        {/* Alle Einnahmen Tab */}
        <TabsContent value="alle-einnahmen" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Einnahmen durchsuchen</h2>
              <Badge variant="outline" className="ml-2">
                {sortedEinnahmen.length} Einträge
              </Badge>
            </div>
            <div className="flex gap-2 w-full sm:w-auto max-w-xs">
              <Input 
                placeholder="Suchen..." 
                value={suchbegriff}
                onChange={(e) => {
                  setSuchbegriff(e.target.value);
                  setCurrentPage(1); // Zurück zur ersten Seite bei Suche
                }}
                className="h-9"
              />
              <Button variant="outline" size="sm" className="shrink-0">
                <IconFilter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => requestSort('beschreibung')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Beschreibung</span>
                          {sortConfig.key === 'beschreibung' && (
                            <span>{sortConfig.direction === 'ascending' 
                              ? <IconArrowUp className="h-4 w-4" /> 
                              : <IconArrowDown className="h-4 w-4" />}
                            </span>
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer text-right"
                        onClick={() => requestSort('betrag')}
                      >
                        <div className="flex items-center justify-end space-x-1">
                          <span>Betrag</span>
                          {sortConfig.key === 'betrag' && (
                            <span>{sortConfig.direction === 'ascending' 
                              ? <IconArrowUp className="h-4 w-4" /> 
                              : <IconArrowDown className="h-4 w-4" />}
                            </span>
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => requestSort('datum')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Datum</span>
                          {sortConfig.key === 'datum' && (
                            <span>{sortConfig.direction === 'ascending' 
                              ? <IconArrowUp className="h-4 w-4" /> 
                              : <IconArrowDown className="h-4 w-4" />}
                            </span>
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hidden md:table-cell"
                        onClick={() => requestSort('kategorie')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Kategorie</span>
                          {sortConfig.key === 'kategorie' && (
                            <span>{sortConfig.direction === 'ascending' 
                              ? <IconArrowUp className="h-4 w-4" /> 
                              : <IconArrowDown className="h-4 w-4" />}
                            </span>
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer hidden lg:table-cell"
                        onClick={() => requestSort('konto')}
                      >
                        <div className="flex items-center space-x-1">
                          <span>Konto</span>
                          {sortConfig.key === 'konto' && (
                            <span>{sortConfig.direction === 'ascending' 
                              ? <IconArrowUp className="h-4 w-4" /> 
                              : <IconArrowDown className="h-4 w-4" />}
                            </span>
                          )}
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentItems.length > 0 ? (
                      currentItems.map((einnahme) => (
                        <TableRow 
                          key={einnahme.id} 
                          className="cursor-pointer"
                          onClick={() => handleRowClick(einnahme)}
                        >
                          <TableCell className="font-medium flex items-center space-x-2">
                            {einnahme.beschreibung.includes("Monatlich") && (
                              <IconRepeat className="h-4 w-4 text-blue-500 shrink-0" title="Wiederkehrende Einnahme" />
                            )}
                            <span>{einnahme.beschreibung}</span>
                          </TableCell>
                          <TableCell className="text-right font-semibold text-green-600 dark:text-green-400">
                            {formatCurrency(einnahme.betrag)}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <IconCalendar className="h-4 w-4 text-muted-foreground shrink-0" />
                              <span>{formatDate(einnahme.datum)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge 
                              variant="secondary"
                              className={categoryColorMap[einnahme.kategorie] || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"}
                            >
                              {einnahme.kategorie}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-muted-foreground">
                            {einnahme.konto}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                          Keine Einnahmen gefunden.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {/* Paginierung */}
              {sortedEinnahmen.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-t">
                  <div className="text-sm text-muted-foreground mb-4 sm:mb-0">
                    Zeige {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedEinnahmen.length)} von {sortedEinnahmen.length} Einträgen
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select 
                      value={String(itemsPerPage)} 
                      onValueChange={(value) => {
                        setItemsPerPage(Number(value));
                        setCurrentPage(1); // Zurück zur ersten Seite
                      }}
                    >
                      <SelectTrigger className="w-[110px] h-8 text-xs">
                        <SelectValue placeholder="Einträge pro Seite" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 pro Seite</SelectItem>
                        <SelectItem value="10">10 pro Seite</SelectItem>
                        <SelectItem value="20">20 pro Seite</SelectItem>
                        <SelectItem value="50">50 pro Seite</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => changePage(1)}
                        disabled={currentPage === 1}
                      >
                        <IconChevronsLeft className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => changePage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <IconChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      <span className="text-sm mx-2">
                        Seite {currentPage} von {totalPages}
                      </span>
                      
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => changePage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <IconChevronRight className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => changePage(totalPages)}
                        disabled={currentPage === totalPages}
                      >
                        <IconChevronsRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
} 