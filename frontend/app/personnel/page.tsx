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
import type { Personnel } from "@/types"

const API_BASE_URL = "http://localhost:9000"

export default function PersonnelPage() {
  const [personnels, setPersonnels] = useState<Personnel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const getPersonnels = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/personnel`)
        if (!res.ok) throw new Error("Erreur lors de la récupération")
        const data = await res.json()
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
  }, [toast])

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce membre du personnel ?")) {
      try {
        const res = await fetch(`${API_BASE_URL}/personnel/${id}`, {
          method: "DELETE",
        })
        if (!res.ok) throw new Error("Erreur lors de la suppression")

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

  const filteredPersonnels = personnels.filter(
    (p) =>
      `${p.nom} ${p.prenom}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.specialite && p.specialite.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <DashboardShell>
      <DashboardHeader heading="Gestion du personnel" description="Consultez et gérez le personnel médical">
        <Link href="/personnel/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouveau membre
          </Button>
        </Link>
      </DashboardHeader>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un membre du personnel..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="ml-4 space-x-2">
          <Link href="/personnel/role/medecin">
            <Button variant="outline" size="sm">
              Médecins
            </Button>
          </Link>
          <Link href="/personnel/role/infirmier">
            <Button variant="outline" size="sm">
              Infirmiers
            </Button>
          </Link>
        </div>
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
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Spécialité</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPersonnels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Aucun membre du personnel trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredPersonnels.map((personnel) => (
                  <TableRow key={personnel.id}>
                    <TableCell className="font-medium">{personnel.nom}</TableCell>
                    <TableCell>{personnel.prenom}</TableCell>
                    <TableCell>{personnel.role}</TableCell>
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => personnel.id && handleDelete(personnel.id)}
                        >
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
