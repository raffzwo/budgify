"use client";

import Link from "next/link";
import { PiggyBank, TrendingUp, ArrowRight, BadgeDollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

// Beispieldaten für das Kuchendiagramm
const sparkontenData = [
  { name: "Notfallfonds", value: 5000, color: "#3B82F6" },
  { name: "Urlaubskonto", value: 2500, color: "#10B981" },
  { name: "Rente", value: 8000, color: "#F59E0B" },
  { name: "Autokauf", value: 3500, color: "#8B5CF6" },
  { name: "Immobilien", value: 7000, color: "#EC4899" },
];

export default function SparkontenPage() {
  const sparkontenFeatures = [
    {
      icon: <PiggyBank className="h-8 w-8" />,
      title: "Verschiedene Sparkonten",
      description: "Erstelle und verwalte verschiedene Sparkonten für unterschiedliche Ziele - von der Urlaubsreise bis zum Eigenheim."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Zinssimulation",
      description: "Simuliere verschiedene Zinssätze und sieh, wie dein Geld über Zeit wachsen wird, um fundierte Entscheidungen zu treffen."
    },
    {
      icon: <BadgeDollarSign className="h-8 w-8" />,
      title: "Automatisierte Einzahlungen",
      description: "Richte regelmäßige Überweisungen ein und lass dein Sparvermögen automatisch wachsen, ohne daran denken zu müssen."
    }
  ];

  // Berechne die Gesamtsumme für die Prozentanzeige
  const totalAmount = sparkontenData.reduce((sum, account) => sum + account.value, 0);

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
                <BreadcrumbPage>Sparkonten</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Sparkonten</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Verwalte mehrere Sparkonten für unterschiedliche Ziele und optimiere deine Spar- und Anlagestrategie.
              </p>
              <Link href="/signup">
                <Button size="lg">Jetzt ausprobieren</Button>
              </Link>
            </div>
            
            <div className="md:w-1/2 bg-background p-6 rounded-xl border">
              <div className="bg-primary/10 p-4 rounded-full w-fit mb-4 mx-auto">
                <PiggyBank className="h-12 w-12 text-primary" />
              </div>
              <p className="text-center text-muted-foreground">
                Mit unseren Sparkonten-Tools behältst du den Überblick über deine verschiedenen Sparziele und maximierst dein Vermögen.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1400px]">
          <h2 className="text-3xl font-bold mb-12 text-center">Funktionen der Sparkonten</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sparkontenFeatures.map((feature, index) => (
              <div key={index} className="bg-background p-6 rounded-xl border hover:shadow-md transition-shadow">
                <div className="bg-primary/10 p-4 rounded-full w-fit mb-6 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Separator className="my-8" />
            <h2 className="text-3xl font-bold mb-8 text-center">Wie funktionieren Sparkonten?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-background p-6 rounded-xl border">
                <h3 className="text-lg font-semibold mb-4">Beispiel: Verteilung deiner Ersparnisse</h3>
                <div className="h-72 flex justify-center items-center">
                  <PieChart width={400} height={280}>
                    <Pie
                      data={sparkontenData}
                      cx={200}
                      cy={140}
                      innerRadius={70}
                      outerRadius={110}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      paddingAngle={3}
                    >
                      {sparkontenData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          stroke="#ffffff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `${Number(value).toLocaleString('de-DE')}€ `}
                      labelFormatter={(name) => `${name}`}
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </PieChart>
                </div>
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">Gesamtbetrag: {totalAmount.toLocaleString('de-DE')}€</p>
                </div>
              </div>
              
              <div>
                <ol className="space-y-6">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                    <div>
                      <h3 className="font-semibold mb-1">Erstelle Sparkonten</h3>
                      <p className="text-muted-foreground">Lege verschiedene Sparkonten für unterschiedliche Ziele an und bestimme deren Zweck.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                    <div>
                      <h3 className="font-semibold mb-1">Richte Sparpläne ein</h3>
                      <p className="text-muted-foreground">Definiere, wie viel du regelmäßig auf jedes Konto einzahlen möchtest, und aktiviere automatische Überweisungen.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                    <div>
                      <h3 className="font-semibold mb-1">Überwache das Wachstum</h3>
                      <p className="text-muted-foreground">Verfolge, wie deine Konten wachsen, und optimiere deine Strategie basierend auf Zinsen und Zielen.</p>
                    </div>
                  </li>
                </ol>
                
                <div className="mt-8">
                  <Link href="/features/ausgabenanalyse">
                    <Button variant="outline" className="inline-flex items-center">
                      Ausgabenanalyse entdecken
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-muted p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-4">Bereit, effektiver zu sparen?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Starte noch heute mit Budgify und nutze unsere Sparkonten-Tools für ein solides finanzielles Fundament.
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