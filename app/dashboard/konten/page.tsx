"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, CreditCard, Trash2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

// Beispieldaten für Konten
const initialAccounts = [
  { id: 1, name: "Girokonto", balance: 1250.75, color: "#3B82F6" },
  { id: 2, name: "Sparkonto", balance: 4500.00, color: "#10B981" },
  { id: 3, name: "Bargeld", balance: 120.30, color: "#F59E0B" },
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [newAccount, setNewAccount] = useState({ name: "", balance: "", color: "#3B82F6" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Gesamtsaldo berechnen
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  
  // Neues Konto hinzufügen
  const handleAddAccount = () => {
    if (newAccount.name.trim() === "" || newAccount.balance === "") return;
    
    const parsedBalance = parseFloat(newAccount.balance);
    if (isNaN(parsedBalance)) return;
    
    const newAccountObj = {
      id: Date.now(),
      name: newAccount.name,
      balance: parsedBalance,
      color: newAccount.color
    };
    
    setAccounts([...accounts, newAccountObj]);
    setNewAccount({ name: "", balance: "", color: "#3B82F6" });
    setIsDialogOpen(false);
  };
  
  // Konto löschen
  const handleDeleteAccount = (id: number) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };
  
  return (
    <div className="container mx-auto max-w-7xl py-6 px-4">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Konten</h1>
            <p className="text-muted-foreground">Verwalte deine Finanzkonten und behalte den Überblick über dein Vermögen.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Konto hinzufügen
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Neues Konto erstellen</DialogTitle>
                <DialogDescription>
                  Gib die Details für dein neues Finanzkonto ein.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Kontoname</Label>
                  <Input 
                    id="name" 
                    value={newAccount.name} 
                    onChange={(e) => setNewAccount({...newAccount, name: e.target.value})} 
                    placeholder="z.B. Girokonto"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="balance">Kontostand (€)</Label>
                  <Input 
                    id="balance" 
                    type="number" 
                    step="0.01" 
                    value={newAccount.balance} 
                    onChange={(e) => setNewAccount({...newAccount, balance: e.target.value})} 
                    placeholder="0.00"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="color">Farbe</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="color" 
                      type="color" 
                      value={newAccount.color} 
                      onChange={(e) => setNewAccount({...newAccount, color: e.target.value})} 
                      className="w-16 h-8 p-1"
                    />
                    <span className="text-sm text-muted-foreground">Wähle eine Farbe für dein Konto</span>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Abbrechen</Button>
                <Button onClick={handleAddAccount}>Konto erstellen</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Gesamtsaldo</CardTitle>
            <CardDescription>Die Summe aller deiner Konten</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">
              {totalBalance.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </p>
          </CardContent>
        </Card>
        
        <h2 className="text-xl font-semibold mt-4">Deine Konten</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map(account => (
            <Card key={account.id} className="overflow-hidden">
              <div className="h-2" style={{ backgroundColor: account.color }}></div>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <CreditCard className="mr-2 h-5 w-5" style={{ color: account.color }} />
                  {account.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {account.balance.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                </p>
              </CardContent>
              <CardFooter className="pt-1 justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleDeleteAccount(account.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Konto löschen</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 