import { BarChart3, Wallet, Target, PiggyBank, Bell, TrendingUp } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Ausgabenanalyse",
      description: "Verfolge und analysiere deine Ausgaben nach Kategorien, um besser zu verstehen, wohin dein Geld fließt."
    },
    {
      icon: <Wallet className="h-6 w-6" />,
      title: "Budgetplanung",
      description: "Erstelle monatliche Budgets für verschiedene Kategorien und behalte den Überblick über deine Ausgaben."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Finanzielle Ziele",
      description: "Setze dir Sparziele und verfolge deinen Fortschritt, um deine finanziellen Träume zu verwirklichen."
    },
    {
      icon: <PiggyBank className="h-6 w-6" />,
      title: "Sparkonten",
      description: "Verwalte mehrere Sparkonten für verschiedene Ziele und optimiere deine Sparstrategie."
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Erinnerungen",
      description: "Erhalte Erinnerungen für anstehende Rechnungen und Zahlungen, um niemals eine Frist zu verpassen."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Finanzberichte",
      description: "Erhalte detaillierte Berichte und Einblicke in deine finanzielle Situation auf monatlicher oder jährlicher Basis."
    }
  ];

  return (
    <section className="py-16 bg-muted/50 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-[1400px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Funktionen, die deine Finanzen vereinfachen</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Budgify bietet dir alle Tools, die du benötigst, um deine Finanzen zu verwalten und deine finanziellen Ziele zu erreichen.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-background p-4 sm:p-6 rounded-lg border hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 