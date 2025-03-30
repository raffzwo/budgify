"use client";

import Link from "next/link";
import { LineChart as LineChartIcon, Wallet, TrendingUp, ArrowRight, BadgePercent } from "lucide-react";

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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts";

// Beispieldaten für das Liniendiagramm
const zielData = [
  { monat: 'Jan', fortschritt: 500, ziel: 10000 },
  { monat: 'Feb', fortschritt: 1200, ziel: 10000 },
  { monat: 'Mär', fortschritt: 2100, ziel: 10000 },
  { monat: 'Apr', fortschritt: 2800, ziel: 10000 },
  { monat: 'Mai', fortschritt: 3600, ziel: 10000 },
  { monat: 'Jun', fortschritt: 4500, ziel: 10000 },
  { monat: 'Jul', fortschritt: 5500, ziel: 10000 },
  { monat: 'Aug', fortschritt: 6500, ziel: 10000 },
  { monat: 'Sep', fortschritt: 7800, ziel: 10000 },
  { monat: 'Okt', fortschritt: 8500, ziel: 10000 },
  { monat: 'Nov', fortschritt: 9300, ziel: 10000 },
  { monat: 'Dez', fortschritt: 10000, ziel: 10000 },
];

export default function FinanzielleZielePage() {
  const zielFeatures = [
    {
      icon: <Wallet className="h-8 w-8" />,
      title: "Ziele definieren",
      description: "Setze dir konkrete finanzielle Ziele wie ein Eigenheim, ein Auto oder einen Notfallfonds und plane deren Umsetzung."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Fortschritt verfolgen",
      description: "Behalte den Überblick über deinen Fortschritt und sieh in Echtzeit, wie nah du deinen Zielen kommst."
    },
    {
      icon: <BadgePercent className="h-8 w-8" />,
      title: "Automatisches Sparen",
      description: "Richte automatische Überweisungen ein, um regelmäßig und schmerzfrei für deine Ziele zu sparen."
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
                <BreadcrumbPage>Finanzielle Ziele</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Finanzielle Ziele</h1>
              <p className="text-xl text-muted-foreground mb-6">
                Definiere deine Sparziele, verfolge deinen Fortschritt und erreiche deine finanziellen Träume schneller.
              </p>
              <Link href="/signup">
                <Button size="lg">Jetzt ausprobieren</Button>
              </Link>
            </div>
            
            <div className="md:w-1/2 bg-background p-6 rounded-xl border">
              <div className="bg-primary/10 p-4 rounded-full w-fit mb-4 mx-auto">
                <LineChartIcon className="h-12 w-12 text-primary" />
              </div>
              <p className="text-center text-muted-foreground">
                Mit unseren Tools für finanzielle Ziele behältst du den Überblick und wirst motiviert bleiben, bis du deine Träume verwirklichst.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1400px]">
          <h2 className="text-3xl font-bold mb-12 text-center">Funktionen für finanzielle Ziele</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {zielFeatures.map((feature, index) => (
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
            <h2 className="text-3xl font-bold mb-8 text-center">Wie funktionieren finanzielle Ziele?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-background p-6 rounded-xl border">
                <h3 className="text-lg font-semibold mb-4">Beispiel: Sparziel von 10.000€</h3>
                <div className="h-72">
                  <ChartContainer
                    config={{
                      fortschritt: {
                        label: "Fortschritt",
                        color: "#8B5CF6",
                      },
                      ziel: {
                        label: "Ziel",
                        color: "#f43f5e",
                      }
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={zielData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis
                          dataKey="monat"
                          tickLine={false}
                          axisLine={false}
                          fontSize={12}
                          tickMargin={8}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => `${value}€`}
                          fontSize={12}
                          tickMargin={8}
                        />
                        <Line
                          type="monotone"
                          dataKey="fortschritt"
                          stroke="var(--color-fortschritt)"
                          strokeWidth={3}
                          dot={{ r: 4, strokeWidth: 0, fill: "var(--color-fortschritt)" }}
                          activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-fortschritt)" }}
                          name="Fortschritt"
                          isAnimationActive={true}
                        />
                        <ReferenceLine 
                          y={10000} 
                          stroke="var(--color-ziel)" 
                          strokeDasharray="3 3" 
                          name="Ziel"
                          label={{ 
                            value: '10.000€ Ziel', 
                            position: 'right', 
                            fill: 'var(--color-ziel)',
                            fontSize: 12
                          }}
                        />
                        <ChartTooltip
                          cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
                          content={
                            <ChartTooltipContent
                              indicator="dot"
                              formatter={(value, name) => [
                                name === "Fortschritt" ? `${value}€ (${Math.round(Number(value)/100)}%)` : `${value}€`, 
                                name
                              ]}
                            />
                          }
                        />
                        <ChartLegend
                          content={<ChartLegendContent />}
                          verticalAlign="bottom"
                          height={36}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </div>
              
              <div>
                <ol className="space-y-6">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                    <div>
                      <h3 className="font-semibold mb-1">Definiere dein Ziel</h3>
                      <p className="text-muted-foreground">Lege fest, wofür du sparen möchtest, wie viel Geld du benötigst und bis wann du es erreichen willst.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                    <div>
                      <h3 className="font-semibold mb-1">Erstelle einen Sparplan</h3>
                      <p className="text-muted-foreground">Berechne, wie viel du regelmäßig sparen musst, und richte automatische Überweisungen ein.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                    <div>
                      <h3 className="font-semibold mb-1">Verfolge deinen Fortschritt</h3>
                      <p className="text-muted-foreground">Behalte den Überblick über deine Sparbemühungen und feiere Meilensteine auf dem Weg zu deinem Ziel.</p>
                    </div>
                  </li>
                </ol>
                
                <div className="mt-8">
                  <Link href="/features/sparkonten">
                    <Button variant="outline" className="inline-flex items-center">
                      Sparkonten entdecken
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-muted p-8 rounded-xl">
              <h2 className="text-3xl font-bold mb-4">Bereit, deine finanziellen Träume zu verwirklichen?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Starte noch heute mit Budgify und mache den ersten Schritt zu deinen Zielen.
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