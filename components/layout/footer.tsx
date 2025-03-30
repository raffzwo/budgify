"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="py-8 w-full">
      <Separator />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1400px] pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Budgify</h3>
            <p className="text-sm text-muted-foreground">
              Die einfachste Art, deine Finanzen zu verwalten und deine Ausgaben zu tracken.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Produkt</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/preise" className="text-muted-foreground hover:text-foreground transition-colors">
                  Preise
                </Link>
              </li>
              <li>
                <Link href="/ressourcen/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Unternehmen</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/uber-uns" className="text-muted-foreground hover:text-foreground transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/ressourcen/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-muted-foreground hover:text-foreground transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Rechtliches</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/datenschutz" className="text-muted-foreground hover:text-foreground transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/nutzungsbedingungen" className="text-muted-foreground hover:text-foreground transition-colors">
                  Nutzungsbedingungen
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="text-muted-foreground hover:text-foreground transition-colors">
                  Impressum
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <Separator className="mb-6" />
          <p>&copy; {new Date().getFullYear()} Budgify. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
} 