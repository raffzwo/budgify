"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const ListItem = ({ className, title, href, children }: { 
  className?: string;
  title: string;
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground hover:scale-105 hover:shadow-md",
            className
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-full relative z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1400px] flex items-center justify-between py-4">
        <Link href="/" className="font-bold text-xl relative group">
          <span className="relative z-10">Budgify</span>
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>
        
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="transition-all duration-200 data-[state=open]:bg-accent/60 hover:bg-accent/40 data-[state=open]:text-accent-foreground hover:text-accent-foreground">
                Features
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] animate-in fade-in duration-200 slide-in-from-top-5">
                  <ListItem
                    href="/features/ausgabenanalyse"
                    title="Ausgabenanalyse"
                  >
                    Verfolge und analysiere deine Ausgaben nach Kategorien, um besser zu verstehen, wohin dein Geld fließt.
                  </ListItem>
                  <ListItem
                    href="/features/budgetplanung"
                    title="Budgetplanung"
                  >
                    Erstelle monatliche Budgets für verschiedene Kategorien und behalte den Überblick über deine Ausgaben.
                  </ListItem>
                  <ListItem
                    href="/features/finanzielle-ziele"
                    title="Finanzielle Ziele"
                  >
                    Setze dir Sparziele und verfolge deinen Fortschritt, um deine finanziellen Träume zu verwirklichen.
                  </ListItem>
                  <ListItem
                    href="/features/sparkonten"
                    title="Sparkonten"
                  >
                    Verwalte mehrere Sparkonten für verschiedene Ziele und optimiere deine Sparstrategie.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="transition-all duration-200 data-[state=open]:bg-accent/60 hover:bg-accent/40 data-[state=open]:text-accent-foreground hover:text-accent-foreground">
                Preise
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] animate-in fade-in duration-200 slide-in-from-top-5">
                  <ListItem
                    href="/preise/kostenlos"
                    title="Kostenloser Plan"
                  >
                    Starte kostenlos mit der Verwaltung deiner Finanzen und entdecke die Grundfunktionen.
                  </ListItem>
                  <ListItem
                    href="/preise/premium"
                    title="Premium Plan"
                  >
                    Erhalte Zugriff auf erweiterte Features wie Finanzberichte, unbegrenzte Kategorien und mehr.
                  </ListItem>
                  <ListItem
                    href="/preise/familie"
                    title="Familienplan"
                  >
                    Verwalte die Finanzen für die ganze Familie mit gemeinsamen Konten und Budgets.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="transition-all duration-200 data-[state=open]:bg-accent/60 hover:bg-accent/40 data-[state=open]:text-accent-foreground hover:text-accent-foreground">
                Ressourcen
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] animate-in fade-in duration-200 slide-in-from-top-5">
                  <ListItem
                    href="/ressourcen/blog"
                    title="Blog"
                  >
                    Tipps und Strategien für erfolgreiches persönliches Finanzmanagement.
                  </ListItem>
                  <ListItem
                    href="/ressourcen/faq"
                    title="FAQ"
                  >
                    Antworten auf häufig gestellte Fragen zur Nutzung von Budgify.
                  </ListItem>
                  <ListItem
                    href="/ressourcen/tutorials"
                    title="Tutorials"
                  >
                    Lerne, wie du Budgify effektiv nutzen kannst, um deine Finanzen zu verwalten.
                  </ListItem>
                  <ListItem
                    href="/ressourcen/hilfe"
                    title="Hilfe & Support"
                  >
                    Kontaktiere unser Support-Team oder durchsuche unsere Wissensdatenbank.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/kontakt" legacyBehavior passHref>
                <NavigationMenuLink className="inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/40 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 relative hover:after:scale-x-100 after:absolute after:bottom-1 after:left-2 after:right-2 after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300">
                  <span>Kontakt</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="outline" className="transition-all duration-300 hover:shadow-md">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="transition-all duration-300 hover:scale-105 hover:shadow-md">
              Registrieren
            </Button>
          </Link>
        </div>
      </div>
      <Separator />

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background md:hidden z-50 pt-16 animate-in slide-in-from-top-5 duration-300" key="mobile-menu">
          <div className="container mx-auto px-4 sm:px-6 py-6 h-full overflow-y-auto">
            <div className="flex flex-col space-y-6">
              <div className="pb-4">
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/features/ausgabenanalyse" 
                      className="block py-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1"
                      onClick={toggleMobileMenu}
                    >
                      Ausgabenanalyse
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/features/budgetplanung" 
                      className="block py-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1"
                      onClick={toggleMobileMenu}
                    >
                      Budgetplanung
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/features/finanzielle-ziele" 
                      className="block py-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1"
                      onClick={toggleMobileMenu}
                    >
                      Finanzielle Ziele
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/features/sparkonten" 
                      className="block py-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1"
                      onClick={toggleMobileMenu}
                    >
                      Sparkonten
                    </Link>
                  </li>
                </ul>
                <Separator className="mt-4" />
              </div>

              <div className="pb-4">
                <h3 className="text-lg font-semibold mb-3">Preise</h3>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/preise/kostenlos" 
                      className="block py-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1"
                      onClick={toggleMobileMenu}
                    >
                      Kostenloser Plan
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/preise/premium" 
                      className="block py-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1"
                      onClick={toggleMobileMenu}
                    >
                      Premium Plan
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/preise/familie" 
                      className="block py-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1"
                      onClick={toggleMobileMenu}
                    >
                      Familienplan
                    </Link>
                  </li>
                </ul>
                <Separator className="mt-4" />
              </div>

              <div className="pb-4">
                <h3 className="text-lg font-semibold mb-3">Ressourcen</h3>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/ressourcen/blog" 
                      className="block py-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1"
                      onClick={toggleMobileMenu}
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/ressourcen/faq" 
                      className="block py-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1"
                      onClick={toggleMobileMenu}
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/ressourcen/tutorials" 
                      className="block py-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1"
                      onClick={toggleMobileMenu}
                    >
                      Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/ressourcen/hilfe" 
                      className="block py-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1"
                      onClick={toggleMobileMenu}
                    >
                      Hilfe & Support
                    </Link>
                  </li>
                </ul>
                <Separator className="mt-4" />
              </div>

              <div className="pb-4">
                <Link 
                  href="/kontakt" 
                  className="block py-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:translate-x-1"
                  onClick={toggleMobileMenu}
                >
                  Kontakt
                </Link>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Link href="/login">
                  <Button variant="outline" className="w-full transition-all duration-300 hover:shadow-md">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full transition-all duration-300 hover:shadow-md">
                    Registrieren
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 