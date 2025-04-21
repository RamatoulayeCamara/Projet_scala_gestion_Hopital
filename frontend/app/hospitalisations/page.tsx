"use client"; // Assurez-vous que la ligne "use client" est présente pour utiliser les hooks React

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchHospitalisations } from "@/lib/api";  // Importez votre fonction API pour récupérer les hospitalisations
import { useToast } from "@/components/ui/use-toast"; // Importez le toast pour gérer les notifications

export default function HospitalisationsPage() {
  const [hospitalisations, setHospitalisations] = useState<any[]>([]);  // État pour stocker la liste des hospitalisations
  const [isLoading, setIsLoading] = useState(true);  // Indicateur de chargement
  const { toast } = useToast();  // Pour afficher des notifications toast

  useEffect(() => {
    const getHospitalisations = async () => {
      try {
        const data = await fetchHospitalisations();  // Appeler la fonction pour récupérer les hospitalisations
        setHospitalisations(data);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les hospitalisations.",
          variant: "destructive",  // Afficher un toast d'erreur
        });
      } finally {
        setIsLoading(false);
      }
    };

    getHospitalisations();  // Récupérer les hospitalisations lors du chargement
  }, [toast]);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Hospitalisations</h1>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Motif</TableHead>
                <TableHead>Date d'entrée</TableHead>
                <TableHead>Date de sortie</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hospitalisations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Aucune hospitalisation trouvée
                  </TableCell>
                </TableRow>
              ) : (
                hospitalisations.map((hospitalisation) => (
                  <TableRow key={hospitalisation.id}>
                    <TableCell>{hospitalisation.id}</TableCell>
                    <TableCell>{hospitalisation.motif}</TableCell>
                    <TableCell>{hospitalisation.dateEntree}</TableCell>
                    <TableCell>{hospitalisation.dateSortie || "Non défini"}</TableCell>
                    <TableCell>
                      {/* Ajoutez des actions si nécessaire, comme "Voir" ou "Supprimer" */}
                      <Button variant="ghost" size="sm">Voir</Button>
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
