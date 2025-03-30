"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Home, PieChart, CreditCard, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, signOut, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Wenn der Benutzer nicht eingeloggt ist und das Laden abgeschlossen ist, zur Login-Seite umleiten
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Ausloggen-Funktion
  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  // Wenn noch geladen wird oder kein Benutzer vorhanden ist, zeige Ladebildschirm
  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-muted rounded w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-muted rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/ausgaben", icon: PieChart, label: "Ausgaben" },
    { href: "/dashboard/konten", icon: CreditCard, label: "Konten" },
    { href: "/dashboard/einstellungen", icon: Settings, label: "Einstellungen" },
  ];

  return (
    <div className="flex min-h-screen bg-muted/10">
      {/* Seitenleiste */}
      <div className="hidden md:flex flex-col w-64 bg-card border-r min-h-screen">
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center">
            <span className="font-bold text-xl">Budgify</span>
          </Link>
        </div>
        <div className="flex flex-col justify-between flex-1">
          <nav className="space-y-1 p-4">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href && "bg-accent text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="p-4">
            <div className="border-t pt-4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2">
                  <span className="text-xs font-semibold">
                    {user.user_metadata?.name?.[0].toUpperCase() || user.email?.[0].toUpperCase() || "U"}
                  </span>
                </div>
                <div className="text-sm">
                  <p className="font-medium truncate max-w-[140px]">{user.user_metadata?.name || user.email}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[140px]">{user.email}</p>
                </div>
              </div>
              <button 
                onClick={handleSignOut}
                className="flex items-center w-full px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <LogOut className="h-4 w-4 mr-3" />
                Abmelden
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (oben) */}
      <div className="md:hidden w-full fixed top-0 left-0 z-10 bg-background border-b">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="font-bold text-lg">
            Budgify
          </Link>
          <button className="p-2 rounded-md hover:bg-accent">
            <span className="sr-only">Menu öffnen</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hauptinhalt */}
      <div className="flex-1 md:ml-0 pt-[65px] md:pt-0">
        {children}
      </div>
    </div>
  );
} 