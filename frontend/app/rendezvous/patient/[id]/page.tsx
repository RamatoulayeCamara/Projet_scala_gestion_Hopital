"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ArrowLeft, PlusCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { RendezVous, Patient } from "@/types"
import { fetchRendezVousByPatient, fetchPatient } from "@/lib/api"

interface PatientRendezVousPageProps {
  params: {
    id: string
  }
}

export default function PatientRendezVousPage({ params }: PatientRendezVousPageProps) {
  const [rendezVous, setRendezVous] = useState<RendezVous[]>([])
  const [patient, setPatient] = useState<Patient | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const getData = async () => {
      try {
        const [rdvData, patientData] = await Promise.all([
          fetchRendezVousByPatient(Number.parseInt(params.id)),
          fetchPatient(Number.parseInt(params.id)),
        ])
        setRendezVous(rdvData)
        setPatient(patientData)
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
        heading={`Rendez-vous de ${patient?.prenom} ${patient?.nom}`}
        description={`Code patient: ${patient?.codePatient}`}
      >
        <div className="flex space-x-2">
          <Link href={`/patients/${params.id}`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au patient
            </Button>
          </Link>
          <Link href={`/rendezvous/add?patientId=${params.id}`}>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouveau rendez-vous
            </Button>
          </Link>
        </div>
      </DashboardHeader>

      <Card>
        <CardHeader>
          <CardTitle>Historique des rendez-vous</CardTitle>
          <CardDescription>{rendezVous.length} rendez-vous trouvés</CardDescription>
        </CardHeader>
        <CardContent>
          {rendezVous.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">Aucun rendez-vous trouvé pour ce patient</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date et heure</TableHead>
                  <TableHead>Personnel</TableHead>
                  <TableHead>Motif</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rendezVous.map((rdv) => (
                  <TableRow key={rdv.id}>
                    <TableCell className="font-medium">{rdv.dateHeure}</TableCell>
                    <TableCell>Personnel #{rdv.personnelId}</TableCell>
                    <TableCell>{rdv.motif || "-"}</TableCell>
                    <TableCell className="text-right">
                      <Link href={`/rendezvous/${rdv.id}`}>
                        <Button variant="ghost" size="sm">
                          Voir
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
