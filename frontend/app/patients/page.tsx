"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PlusCircle, Search, Trash2, Edit } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { Patient } from "@/types"
import { fetchPatients, deletePatient } from "@/lib/api"
import { useRouter } from "next/router" // Importer useRouter pour gérer l'URL

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const [isClient, setIsClient] = useState(false)  // Pour vérifier que le code est côté client
  
  useEffect(() => {
    setIsClient(true)  // Le composant a été monté côté client
  }, [])

  useEffect(() => {
    const getPatients = async () => {
      try {
        const data = await fetchPatients()
        setPatients(data)
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les patients",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    // Ne charger les patients que si on est côté client
    if (isClient) {
      getPatients()
    }
  }, [toast, isClient])

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce patient ?")) {
      try {
        await deletePatient(id)
        setPatients(patients.filter((patient) => patient.id !== id))
        toast({
          title: "Succès",
          description: "Patient supprimé avec succès",
        })
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le patient",
          variant: "destructive",
        })
      }
    }
  }

  const filteredPatients = patients.filter(
    (patient) =>
      `${patient.nom} ${patient.prenom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.codePatient.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardShell>
      <DashboardHeader heading="Gestion des patients" description="Consultez et gérez les dossiers des patients">
        <Link href="/patients/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau patient
          </Button>
        </Link>
      </DashboardHeader>

      <div className="flex items-center justify-between py-4">
        <div className="relative w-full max-w-sm mx-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un patient..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link href="/patients/search" className="ml-4">
          <Button variant="outline">Recherche avancée</Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="rounded-md border mx-auto max-w-7xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>N° Assurance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Aucun patient trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.codePatient}</TableCell>
                    <TableCell>{patient.nom}</TableCell>
                    <TableCell>{patient.prenom}</TableCell>
                    <TableCell>{patient.tel}</TableCell>
                    <TableCell>{patient.numeroAssurance || "-"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/patients/${patient.id}`}>
                          <Button variant="ghost" size="sm">
                            Voir
                          </Button>
                        </Link>
                        <Link href={`/patients/edit/${patient.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={() => patient.id && handleDelete(patient.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </DashboardShell>
  )
}
