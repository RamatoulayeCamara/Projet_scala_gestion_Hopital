import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserCog, BedDouble, Calendar, CreditCard, TrendingUp, TrendingDown } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Overview } from "@/components/overview"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Tableau de bord" description="Vue d'ensemble de l'hôpital Werral ak Jamm" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients totaux</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500">+12%</span> depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Personnel médical</CardTitle>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500">+2</span> nouveaux ce mois
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux d'occupation</CardTitle>
            <BedDouble className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingDown className="mr-1 h-3 w-3 text-amber-500" />
              <span className="text-amber-500">-3%</span> depuis la semaine dernière
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rendez-vous aujourd'hui</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">8 en attente, 34 confirmés</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus mensuels</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4M FCFA</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500">+8%</span> depuis le mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Factures en attente</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Total: 3.2M FCFA</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Vue d'ensemble</CardTitle>
            <CardDescription>Activité hospitalière des 30 derniers jours</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>Dernières actions effectuées</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="patients" className="space-y-4">
              <TabsList>
                <TabsTrigger value="patients">Patients</TabsTrigger>
                <TabsTrigger value="personnel">Personnel</TabsTrigger>
                <TabsTrigger value="paiements">Paiements</TabsTrigger>
              </TabsList>
              <TabsContent value="patients" className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nouveau patient: Amadou Diop</p>
                    <p className="text-xs text-muted-foreground">Il y a 35 minutes</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Sortie: Fatou Ndiaye</p>
                    <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Transfert: Ousmane Sow</p>
                    <p className="text-xs text-muted-foreground">Il y a 4 heures</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="personnel" className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nouveau médecin: Dr. Mbaye</p>
                    <p className="text-xs text-muted-foreground">Il y a 2 jours</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Congé: Inf. Diallo</p>
                    <p className="text-xs text-muted-foreground">Il y a 1 jour</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="paiements" className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Paiement reçu: 450,000 FCFA</p>
                    <p className="text-xs text-muted-foreground">Il y a 1 heure</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nouvelle facture: 320,000 FCFA</p>
                    <p className="text-xs text-muted-foreground">Il y a 3 heures</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
