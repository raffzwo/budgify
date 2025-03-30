"use client";

import Link from "next/link";
import { BarChart3, Calculator, Target, ArrowRight } from "lucide-react";

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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";

// Beispieldaten für das Balkendiagramm
const budgetData = [
  { name: "Lebensmittel", budget: 400, ausgegeben: 320 },
  { name: "Transport", budget: 200, ausgegeben: 180 },
  { name: "Unterhaltung", budget: 150, ausgegeben: 170 },
  { name: "Wohnen", budget: 800, ausgegeben: 800 },
  { name: "Bildung", budget: 100, ausgegeben: 70 },
];

export default function BudgetplanungPage() {
  const budgetFeatures = [
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "Flexible Budgetplanung",
      description: "Erstelle anpassbare Budgets für verschiedene Ausgabekategorien und behalte den Überblick über deine Finanzen."
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Budget-Tracking",
      description: "Verfolge in Echtzeit, wie nah du an deinen Budgetgrenzen bist und erhalte Benachrichtigungen, wenn du Grenzwerte erreichst."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Ausgabenziele",
      description: "Setze dir monatliche oder wöchentliche Sparziele und optimiere deine Ausgaben, um deine finanziellen Ziele zu erreichen."
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
                <BreadcrumbPage>Budgetplanung</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Budgetplanung</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Setze Grenzen für deine Ausgaben, erreiche deine Sparziele und übernimm die Kontrolle über deine Finanzen.
              </p>
              <Link href="/signup">
                <Button size="lg">Jetzt ausprobieren</Button>
              </Link>
            </div>
            
            <div className="md:w-1/2 bg-background p-6 rounded-xl border">
              <div className="bg-primary/10 p-4 rounded-full w-fit mb-4 mx-auto">
                <Calculator className="h-12 w-12 text-primary" />
              </div>
              <p className="text-center text-muted-foreground">
                Mit unserer intelligenten Budgetplanung behältst du deine Ausgaben im Griff und erreichst deine finanziellen Ziele.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1400px]">
          <h2 className="text-3xl font-bold mb-12 text-center">Funktionen der Budgetplanung</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {budgetFeatures.map((feature, index) => (
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
            <h2 className="text-3xl font-bold mb-8 text-center">Wie funktioniert die Budgetplanung?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-background p-6 rounded-xl border">
                <h3 className="text-lg font-semibold mb-4">Beispiel: Monatliches Budget</h3>
                <div className="h-72">
                  <ChartContainer
                    config={{
                      budget: {
                        label: "Budget",
                        color: "#3B82F6",
                      },
                      ausgegeben: {
                        label: "Ausgegeben",
                        color: "#10B981",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={budgetData} barGap={8} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                        <XAxis
                          dataKey="name"
                          tickLine={false}
                          axisLine={false}
                          fontSize={12}
                          tickMargin={8}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value}€ `}
                          fontSize={12}
                          tickMargin={8}
                        />
                        <Bar
                          dataKey="budget"
                          fill="var(--color-budget)"
                          radius={[4, 4, 0, 0]}
                          name="Budget"
                          isAnimationActive={true}
                        />
                        <Bar
                          dataKey="ausgegeben"
                          fill="var(--color-ausgegeben)"
                          radius={[4, 4, 0, 0]}
                          name="Ausgegeben"
                          isAnimationActive={true}
                        />
                        <ChartTooltip
                          cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
                          content={
                            <ChartTooltipContent
                              indicator="dot"
                              formatter={(value, name) => [`${value}€ `, name]}
                            />
                          }
                        />
                        <ChartLegend
                          content={<ChartLegendContent />}
                          verticalAlign="bottom"
                          height={36}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
              
              <div>
                <ol className="space-y-6">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                    <div>
                      <h3 className="font-semibold mb-1">Lege Budgetkategorien fest</h3>
                      <p className="text-muted-foreground">Erstelle Budgets für verschiedene Kategorien wie Lebensmittel, Transport oder Unterhaltung.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                    <div>
                      <h3 className="font-semibold mb-1">Setze Budgetgrenzen</h3>
                      <p className="text-muted-foreground">Bestimme, wie viel du in jeder Kategorie ausgeben möchtest und passe die Grenzen bei Bedarf an.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                    <div>
                      <h3 className="font-semibold mb-1">Überwache deine Ausgaben</h3>
                      <p className="text-muted-foreground">Verfolge, wie deine tatsächlichen Ausgaben im Vergleich zu deinen Budgets stehen und erhalte Benachrichtigungen.</p>
                    </div>
                  </li>
                </ol>
                
                <div className="mt-8">
                  <Link href="/features/finanzielle-ziele">
                    <Button variant="outline" className="inline-flex items-center">
                      Finanzielle Ziele entdecken
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-muted p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-4">Bereit, deine Finanzen zu planen?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Starte noch heute mit Budgify und übernimm die Kontrolle über deine Ausgaben.
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