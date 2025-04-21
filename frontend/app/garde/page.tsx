"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchGardes, deleteGarde } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { DashboardShell } from "@/components/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard-header";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import Link from "next/link";

export default function GardesPage() {
  const [gardes, setGardes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getGardes = async () => {
      try {
        const data = await fetchGardes();
        setGardes(data);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les gardes",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getGardes();
  }, [toast]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette garde ?")) {
      try {
        await deleteGarde(id);
        setGardes(gardes.filter((garde) => garde.id !== id));
        toast({
          title: "Succès",
          description: "Garde supprimée avec succès",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de supprimer la garde",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader heading="Gestion des gardes" description="Consultez et gérez les gardes des personnels médicaux">
        <Link href="/gardes/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter une garde
          </Button>
        </Link>
      </DashboardHeader>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="rounded-md border mx-auto max-w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Personnel</TableHead>
                <TableHead>Date de début</TableHead>
                <TableHead>Date de fin</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gardes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Aucune garde trouvée
                  </TableCell>
                </TableRow>
              ) : (
                gardes.map((garde) => (
                  <TableRow key={garde.id} className="even:bg-gray-100">
                    <TableCell>{garde.id}</TableCell>
                    <TableCell>{garde.personnelId}</TableCell> {/* Remplacez par le nom du personnel si nécessaire */}
                    <TableCell>{garde.dateDebut}</TableCell>
                    <TableCell>{garde.dateFin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/gardes/edit/${garde.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(garde.id)}
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
