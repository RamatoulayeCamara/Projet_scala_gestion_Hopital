"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchMateriels, deleteMateriel } from "@/lib/api";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Materiel } from "@/types";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { PlusCircle, Search, Trash2, Edit } from "lucide-react";

export default function MaterielsPage() {
  const [materiels, setMateriels] = useState<Materiel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const getMateriels = async () => {
      try {
        const data = await fetchMateriels();
        setMateriels(data);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les matériels",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getMateriels();
  }, [toast]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce matériel ?")) {
      try {
        await deleteMateriel(id);
        setMateriels(materiels.filter((materiel) => materiel.id !== id));
        toast({
          title: "Succès",
          description: "Matériel supprimé avec succès",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le matériel",
          variant: "destructive",
        });
      }
    }
  };

  const filteredMateriels = materiels.filter((materiel) =>
    materiel.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardShell>
      <DashboardHeader heading="Gestion des matériels" description="Consultez et gérez les matériels de l'hôpital">
        <Link href="/materiels/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter un matériel
          </Button>
        </Link>
      </DashboardHeader>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Rechercher un matériel..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
                <TableHead>Id</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Fournisseur</TableHead>
                <TableHead>Date d'entrée</TableHead>
                <TableHead>Date de sortie</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMateriels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Aucun matériel trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredMateriels.map((materiel) => (
                  <TableRow key={materiel.id} className="even:bg-gray-100">
                    <TableCell>{materiel.id}</TableCell>
                    <TableCell>{materiel.nom}</TableCell>
                    <TableCell>{materiel.quantite}</TableCell>
                    <TableCell>{materiel.fournisseur}</TableCell>
                    <TableCell>{materiel.dateEntree}</TableCell>
                    <TableCell>{materiel.dateSortie || "Non défini"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/materiels/edit/${materiel.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(materiel.id!)}
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
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
  );
}
