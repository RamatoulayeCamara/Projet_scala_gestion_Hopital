"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ArrowLeft, PlusCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { RendezVous, Personnel } from "@/types"
import { fetchRendezVousByMedecin, fetchPersonnel } from "@/lib/api"

interface MedecinRendezVousPageProps {
  params: {
    id: string
  }
}

export default function MedecinRendezVousPage({ params }: MedecinRendezVousPageProps) {
  const [rendezVous, setRendezVous] = useState<RendezVous[]>([])
  const [medecin, setMedecin] = useState<Personnel | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const getData = async () => {
      try {
        const [rdvData, medecinData] = await Promise.all([
          fetchRendezVousByMedecin(Number.parseInt(params.id)),
          fetchPersonnel(Number.parseInt(params.id)),
        ])
        setRendezVous(rdvData)
        setMedecin(medecinData)
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les données",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    getData()
  }, [params.id, toast])

  // Grouper les rendez-vous par date
  const rendezVousByDate: Record<string, RendezVous[]> = {}
  rendezVous.forEach((rdv) => {
    const date = rdv.dateHeure.split(" ")[0] // Extraire la date (sans l'heure)
    if (!rendezVousByDate[date]) {
      rendezVousByDate[date] = []
    }
    rendezVousByDate[date].push(rdv)
  })

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Planning de ${medecin?.prenom} ${medecin?.nom}`}
        description={`${medecin?.role}${medecin?.specialite ? ` - ${medecin.specialite}` : ""}`}
      >
        <div className="flex space-x-2">
          <Link href="/personnel">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </Link>
          <Link href={`/rendezvous/add?personnelId=${params.id}`}>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouveau rendez-vous
            </Button>
          </Link>
        </div>
      </DashboardHeader>

      {Object.keys(rendezVousByDate).length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">Aucun rendez-vous programmé pour ce médecin</div>
      ) : (
        <div className="space-y-6">
          {Object.entries(rendezVousByDate).map(([date, rdvs]) => (
            <Card key={date}>
              <CardHeader>
                <CardTitle>{date}</CardTitle>
                <CardDescription>{rdvs.length} rendez-vous</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rdvs.map((rdv) => (
                    <div key={rdv.id} className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="font-medium">
                          {rdv.dateHeure.split(" ")[1]} - Patient #{rdv.patientId}
                        </p>
                        <p className="text-sm text-muted-foreground">{rdv.motif || "Aucun motif spécifié"}</p>
                      </div>
                      <Link href={`/rendezvous/${rdv.id}`}>
                        <Button variant="outline" size="sm">
                          Détails
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardShell>
  )
}
