"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ArrowLeft, PlusCircle, Trash2, Edit, Calendar } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { Personnel } from "@/types"
import { fetchPersonnelsByRole, deletePersonnel } from "@/lib/api"

interface PersonnelRolePageProps {
  params: {
    role: string
  }
}

export default function PersonnelRolePage({ params }: PersonnelRolePageProps) {
  const [personnels, setPersonnels] = useState<Personnel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const role = params.role

  useEffect(() => {
    const getPersonnels = async () => {
      try {
        const data = await fetchPersonnelsByRole(role)
        setPersonnels(data)
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger le personnel",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    getPersonnels()
  }, [role, toast])

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce membre du personnel ?")) {
      try {
        await deletePersonnel(id)
        setPersonnels(personnels.filter((p) => p.id !== id))
        toast({
          title: "Succès",
          description: "Membre du personnel supprimé avec succès",
        })
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le membre du personnel",
          variant: "destructive",
        })
      }
    }
  }

  // Formater le rôle pour l'affichage
  const formatRole = (role: string) => {
    switch (role) {
      case "medecin":
        return "Médecins"
      case "infirmier":
        return "Infirmiers"
      default:
        return role.charAt(0).toUpperCase() + role.slice(1)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={formatRole(role)} description={`Liste des ${formatRole(role).toLowerCase()}`}>
        <div className="flex space-x-2">
          <Link href="/personnel">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </Link>
          <Link href="/personnel/add">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouveau membre
            </Button>
          </Link>
        </div>
      </DashboardHeader>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Spécialité</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {personnels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Aucun {formatRole(role).toLowerCase()} trouvé
                  </TableCell>
                </TableRow>
              ) : (
                personnels.map((personnel) => (
                  <TableRow key={personnel.id}>
                    <TableCell className="font-medium">{personnel.nom}</TableCell>
                    <TableCell>{personnel.prenom}</TableCell>
                    <TableCell>{personnel.specialite || "-"}</TableCell>
                    <TableCell>{personnel.telephone}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/personnel/${personnel.id}`}>
                          <Button variant="ghost" size="sm">
                            Voir
                          </Button>
                        </Link>
                        <Link href={`/rendezvous/medecin/${personnel.id}`}>
                          <Button variant="ghost" size="sm">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/personnel/edit/${personnel.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={() => personnel.id && handleDelete(personnel.id)}>
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
