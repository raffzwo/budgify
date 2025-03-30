import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-16 md:py-24 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1400px]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Starte noch heute mit Budgify</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Tausende von Menschen haben bereits die Kontrolle über ihre Finanzen übernommen. Werde auch du Teil der Budgify-Community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/signup">
              <Button size="lg">Kostenlos starten</Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg">Demo ansehen</Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Keine Kreditkarte erforderlich. Kostenloser Plan verfügbar.
          </p>
        </div>
      </div>
    </section>
  );
} 