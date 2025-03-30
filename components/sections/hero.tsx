import Link from "next/link";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="py-16 md:py-24 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Behalte den Überblick über deine Finanzen
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Budgify hilft dir, deine Ausgaben zu tracken, Budgets zu erstellen und finanzielle Ziele zu erreichen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg">Kostenlos starten</Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg">Demo ansehen</Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg border" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-md rounded-md bg-background/95 backdrop-blur p-4 sm:p-6 shadow-lg border">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Monatsübersicht</h3>
                  <span className="text-sm text-muted-foreground">April 2024</span>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Einkommen</span>
                      <span className="text-sm font-medium text-green-600">3.500 €</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-green-500 w-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Ausgaben</span>
                      <span className="text-sm font-medium text-red-600">2.800 €</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-red-500 w-4/5" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Sparziel</span>
                      <span className="text-sm font-medium text-blue-600">500 €</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-blue-500 w-3/5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 