import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PlusCircle, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function RendezVousPage() {
  // Données fictives pour les rendez-vous
  const appointments = [
    {
      id: "RDV-1001",
      patient: "Amadou Diop",
      time: "09:00",
      duration: "30 min",
      type: "Consultation",
      status: "confirmé",
    },
    {
      id: "RDV-1002",
      patient: "Fatou Ndiaye",
      time: "10:00",
      duration: "45 min",
      type: "Suivi",
      status: "confirmé",
    },
    {
      id: "RDV-1003",
      patient: "Ousmane Sow",
      time: "11:30",
      duration: "30 min",
      type: "Consultation",
      status: "en attente",
    },
    {
      id: "RDV-1004",
      patient: "Aïda Fall",
      time: "14:00",
      duration: "60 min",
      type: "Examen",
      status: "confirmé",
    },
  ]

  // Jours de la semaine
  const weekDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
  const currentDate = new Date()
  const currentDay = currentDate.getDate()
  const currentMonth = currentDate.toLocaleString("fr-FR", { month: "long" })
  const currentYear = currentDate.getFullYear()

  return (
    <DashboardShell>
      <DashboardHeader heading="Gestion des rendez-vous" description="Planifiez et gérez les rendez-vous des patients">
        <Link href="/rendez-vous/nouveau">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau rendez-vous
          </Button>
        </Link>
      </DashboardHeader>

      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Médecins</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="dr-mbaye">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un médecin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dr-mbaye">Dr. Mbaye - Cardiologie</SelectItem>
                  <SelectItem value="dr-diop">Dr. Diop - Pédiatrie</SelectItem>
                  <SelectItem value="dr-sow">Dr. Sow - Médecine générale</SelectItem>
                </SelectContent>
              </Select>

              <div className="mt-4">
                <h3 className="font-medium text-sm mb-2">Disponibilité</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Lundi</span>
                    <span>08:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mardi</span>
                    <span>08:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mercredi</span>
                    <span>08:00 - 12:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jeudi</span>
                    <span>08:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vendredi</span>
                    <span>08:00 - 16:00</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-3/4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">
                Planning - {currentDay} {currentMonth} {currentYear}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map((day, index) => (
                  <div key={index} className="text-center text-xs font-medium text-muted-foreground p-1">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className={`text-center p-2 text-sm rounded-md ${
                      day === currentDay
                        ? "bg-emerald-100 text-emerald-700 font-medium"
                        : "hover:bg-slate-100 cursor-pointer"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-sm mb-2">Rendez-vous du jour - Dr. Mbaye</h3>
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center p-2 rounded-md border hover:bg-slate-50">
                    <div className="w-16 text-sm font-medium">{appointment.time}</div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{appointment.patient}</div>
                      <div className="text-xs text-muted-foreground">
                        {appointment.type} - {appointment.duration}
                      </div>
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        appointment.status === "confirmé"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {appointment.status}
                    </div>
                    <Button variant="ghost" size="sm" className="ml-2">
                      Détails
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
