"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchMateriels, deleteMateriel } from "@/lib/api";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Materiel } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "lucide-react";


export default function MaterielsPage() {
  const [materiels, setMateriels] = useState<Materiel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Liste des matériels</CardTitle>
          <Link href="/materiels/add">
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              Ajouter un matériel
            </Button>
          </Link>
        </CardHeader>
      </Card>

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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {materiels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Aucun matériel trouvé
                  </TableCell>
                </TableRow>
              ) : (
                materiels.map((materiel) => (
                  <TableRow key={materiel.id} className="even:bg-gray-100">
                    <TableCell>{materiel.id}</TableCell>
                    <TableCell>{materiel.nom}</TableCell>
                    <TableCell>{materiel.quantite}</TableCell>
                    <TableCell>{materiel.fournisseur}</TableCell>
                    <TableCell>{materiel.dateEntree}</TableCell>
                    <TableCell>{materiel.dateSortie || "Non défini"}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Link href={`/materiels/edit/${materiel.id}`}>
                          <Button variant="ghost" size="sm">
                            Modifier
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(materiel.id!)}
                          className="text-red-500"
                        >
                          Supprimer
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
    </div>
  );
}
