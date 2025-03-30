"use client";

import Link from "next/link";
import { BarChart3, Wallet, Target, PiggyBank, Bell, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Ausgabenanalyse",
      description: "Verfolge und analysiere deine Ausgaben nach Kategorien, um besser zu verstehen, wohin dein Geld fließt.",
      link: "/features/ausgabenanalyse"
    },
    {
      icon: <Wallet className="h-8 w-8" />,
      title: "Budgetplanung",
      description: "Erstelle monatliche Budgets für verschiedene Kategorien und behalte den Überblick über deine Ausgaben.",
      link: "/features/budgetplanung"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Finanzielle Ziele",
      description: "Setze dir Sparziele und verfolge deinen Fortschritt, um deine finanziellen Träume zu verwirklichen.",
      link: "/features/finanzielle-ziele"
    },
    {
      icon: <PiggyBank className="h-8 w-8" />,
      title: "Sparkonten",
      description: "Verwalte mehrere Sparkonten für verschiedene Ziele und optimiere deine Sparstrategie.",
      link: "/features/sparkonten"
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Erinnerungen",
      description: "Erhalte Erinnerungen für anstehende Rechnungen und Zahlungen, um niemals eine Frist zu verpassen.",
      link: "/features/erinnerungen"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Finanzberichte",
      description: "Erhalte detaillierte Berichte und Einblicke in deine finanzielle Situation auf monatlicher oder jährlicher Basis.",
      link: "/features/finanzberichte"
    }
  ];

  return (
    <div className="w-full">
      <div className="bg-muted py-16 md:py-24 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1400px]">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Alle Funktionen von Budgify</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Entdecke alle Tools und Funktionen, die dir helfen, deine Finanzen zu verwalten und finanzielle Ziele zu erreichen.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-background p-6 rounded-xl border hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 p-4 rounded-full w-fit mb-6 text-primary">
                  {feature.icon}
                </div>
                <h2 className="text-2xl font-semibold mb-3">{feature.title}</h2>
                <p className="text-muted-foreground mb-6">{feature.description}</p>
                <Link href={feature.link}>
                  <Button variant="outline" className="w-full">Mehr erfahren</Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 md:mt-24 text-center">
            <h2 className="text-3xl font-bold mb-6">Bereit, deine Finanzen zu verwalten?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Starte noch heute mit Budgify und nimm die Kontrolle über deine Finanzen in die Hand.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup">
                <Button size="lg">Kostenlos starten</Button>
              </Link>
              <Link href="/preise">
                <Button variant="outline" size="lg">Preise ansehen</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 