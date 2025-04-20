import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { StatsCards } from "@/components/stats-cards"

export default function Home() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Tableau de bord" description="Bienvenue sur Werral ak Jamm" />

      <StatsCards />

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
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
