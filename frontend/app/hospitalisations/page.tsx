"use client"; // Assurez-vous que la ligne "use client" est présente pour utiliser les hooks React

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchHospitalisations } from "@/lib/api";  // Importez votre fonction API pour récupérer les hospitalisations
import { useToast } from "@/components/ui/use-toast"; // Importez le toast pour gérer les notifications
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { PlusCircle } from "lucide-react";

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
    <DashboardShell>
      <DashboardHeader heading="Hospitalisations" description="Consultez et gérez les hospitalisations">
        <Button  onClick={() => {/* Ajoutez la logique pour ajouter une nouvelle hospitalisation */}}>
        <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter une hospitalisation
        </Button>
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
                    <TableCell className="text-right">
                      {/* Ajoutez des actions comme "Voir" ou "Modifier" */}
                      <Button variant="ghost" size="sm">Voir</Button>
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
