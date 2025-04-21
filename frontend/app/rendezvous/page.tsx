"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PlusCircle, Search, Trash2, Edit, Calendar } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { RendezVous } from "@/types"
import { fetchRendezVous, deleteRendezVous ,createRendezVous} from "@/lib/api"

export default function RendezVousPage() {
  const [rendezVous, setRendezVous] = useState<RendezVous[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const getRendezVous = async () => {
      try {
        const data = await fetchRendezVous()
        setRendezVous(data)
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les rendez-vous",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    getRendezVous()
  }, [toast])

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) {
      try {
        await deleteRendezVous(id)
        setRendezVous(rendezVous.filter((rdv) => rdv.id !== id))
        toast({
          title: "Succès",
          description: "Rendez-vous supprimé avec succès",
        })
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le rendez-vous",
          variant: "destructive",
        })
      }
    }
  }
  const handleAdd = async (rendezVousData: RendezVous) => {
    try {
      const response = await createRendezVous(rendezVousData)
      setRendezVous([...rendezVous, response])
      toast({
        title: "Succès",
        description: "Rendez-vous ajouté avec succès",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le rendez-vous",
        variant: "destructive",
      })
    }
  }
  

  // Filtrer les rendez-vous par date ou motif
  const filteredRendezVous = rendezVous.filter(
    (rdv) =>
      rdv.dateHeure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (rdv.motif && rdv.motif.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <DashboardShell>
      <DashboardHeader heading="Gestion des rendez-vous" description="Consultez et gérez les rendez-vous">
        <Link href="/rendezvous/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau rendez-vous
          </Button>
        </Link>
      </DashboardHeader>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un rendez-vous..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link href="/rendezvous/calendar" className="ml-4">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Vue calendrier
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date et heure</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Personnel</TableHead>
                <TableHead>Motif</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRendezVous.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Aucun rendez-vous trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredRendezVous.map((rdv) => (
                  <TableRow key={rdv.id}>
                    <TableCell className="font-medium">{rdv.dateHeure}</TableCell>
                    <TableCell>Patient #{rdv.patientId}</TableCell>
                    <TableCell>Personnel #{rdv.personnelId}</TableCell>
                    <TableCell>{rdv.motif || "-"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/rendezvous/${rdv.id}`}>
                          <Button variant="ghost" size="sm">
                            Voir
                          </Button>
                        </Link>
                        <Link href={`/rendezvous/edit/${rdv.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={() => rdv.id && handleDelete(rdv.id)}>
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
