"use client";

import Link from "next/link";
import { BarChart3, PieChart, Layers, LineChart, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AusgabenanalysePage() {
  const analyseFeatures = [
    {
      icon: <PieChart className="h-8 w-8" />,
      title: "Kategorische Analyse",
      description: "Sieh dir an, wie sich deine Ausgaben auf verschiedene Kategorien verteilen, um Sparmöglichkeiten zu identifizieren."
    },
    {
      icon: <LineChart className="h-8 w-8" />,
      title: "Zeitliche Trends",
      description: "Verfolge deine Ausgaben im Laufe der Zeit, um Muster zu erkennen und dein Finanzverhalten anzupassen."
    },
    {
      icon: <Layers className="h-8 w-8" />,
      title: "Vergleichsanalyse",
      description: "Vergleiche deine monatlichen Ausgaben, um zu sehen, wo du Fortschritte machst oder wo du noch sparen kannst."
    }
  ];

  return (
    <div className="w-full">
      <div className="bg-muted py-16 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1400px]">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Startseite</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/features">Features</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Ausgabenanalyse</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Ausgabenanalyse</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Verstehe genau, wohin dein Geld fließt, und treffe fundierte Entscheidungen für deine finanzielle Zukunft.
              </p>
              <Link href="/signup">
                <Button size="lg">Jetzt ausprobieren</Button>
              </Link>
            </div>
            
            <div className="md:w-1/2 bg-background p-6 rounded-xl border">
              <div className="bg-primary/10 p-4 rounded-full w-fit mb-4 mx-auto">
                <BarChart3 className="h-12 w-12 text-primary" />
              </div>
              <p className="text-center text-muted-foreground">
                Mit unserer leistungsstarken Ausgabenanalyse hast du immer den Überblick über deine Finanzen.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1400px]">
          <h2 className="text-3xl font-bold mb-12 text-center">Funktionen der Ausgabenanalyse</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {analyseFeatures.map((feature, index) => (
              <div key={index} className="bg-background p-6 rounded-xl border hover:shadow-md transition-shadow">
                <div className="bg-primary/10 p-4 rounded-full w-fit mb-6 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t pt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Wie funktioniert die Ausgabenanalyse?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-background p-6 rounded-xl border">
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground text-center p-4">Hier würde ein Screenshot oder Video der Analyse-Funktion erscheinen</p>
                </div>
              </div>
              
              <div>
                <ol className="space-y-6">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                    <div>
                      <h3 className="font-semibold mb-1">Erfasse deine Ausgaben</h3>
                      <p className="text-muted-foreground">Gib deine Ausgaben manuell ein oder verbinde dein Bankkonto für automatische Updates.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                    <div>
                      <h3 className="font-semibold mb-1">Kategorisiere Transaktionen</h3>
                      <p className="text-muted-foreground">Jede Ausgabe wird einer Kategorie zugeordnet, entweder automatisch oder manuell.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                    <div>
                      <h3 className="font-semibold mb-1">Erhalte Einblicke</h3>
                      <p className="text-muted-foreground">Sieh dir detaillierte Grafiken und Berichte an, die dir helfen, deine Ausgabenmuster zu verstehen.</p>
                    </div>
                  </li>
                </ol>
                
                <div className="mt-8">
                  <Link href="/features/budgetplanung">
                    <Button variant="outline" className="inline-flex items-center">
                      Budgetplanung entdecken
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-muted p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-4">Bereit, deine Ausgaben zu analysieren?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Starte noch heute mit Budgify und erhalte Einblicke in deine Finanzen.
              </p>
              <Link href="/signup">
                <Button size="lg">Kostenlos starten</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 