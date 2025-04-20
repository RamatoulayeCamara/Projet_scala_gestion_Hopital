"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchGardes, deleteGarde } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

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
    <div className="space-y-8 max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Liste des Gardes</h1>
      <div className="flex justify-center">
        <Button className="bg-blue-500 text-white hover:bg-blue-600">Ajouter une garde</Button>
      </div>
      
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gardes.map((garde) => (
                <TableRow key={garde.id}>
                  <TableCell>{garde.id}</TableCell>
                  <TableCell>{garde.personnelId}</TableCell> {/* Remplacer par le nom du personnel si nécessaire */}
                  <TableCell>{garde.dateDebut}</TableCell>
                  <TableCell>{garde.dateFin}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(garde.id)}>Supprimer</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
