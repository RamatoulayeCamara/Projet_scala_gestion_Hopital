"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { PlusCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchPaiements } from "@/lib/api"; // Fonction pour récupérer les paiements
import { useToast } from "@/components/ui/use-toast";
import { Paiement } from "@/types";
import Link from "next/link";

export default function PaiementsPage() {
  const [paiements, setPaiements] = useState<Paiement[]>([]);  // Initialiser l'état des paiements
  const [isLoading, setIsLoading] = useState(true);  // Gérer l'état de chargement
  const [searchTerm, setSearchTerm] = useState("");  // Gérer la recherche
  const { toast } = useToast();  // Utilisation du hook de toast pour afficher les messages

  // Utilisation de useEffect pour récupérer les paiements à chaque changement de la page
  useEffect(() => {
    const getPaiements = async () => {
      try {
        // Appel API pour récupérer les paiements
        const data = await fetchPaiements();
        setPaiements(data);  // Mettre à jour l'état avec les données reçues
      } catch (error) {
        // En cas d'erreur, afficher un message
        toast({
          title: "Erreur",
          description: "Impossible de charger les paiements",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);  // Mettre fin à l'état de chargement
      }
    };

    getPaiements();  // Appel de la fonction pour charger les paiements
  }, [toast]);

  // Filtrer les paiements en fonction de la recherche
  const filteredPaiements = paiements.filter(
    (paiement) =>
      (paiement.id?.toString().includes(searchTerm) ?? false) ||
      paiement.statut.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardShell>
      <DashboardHeader heading="Gestion des paiements" description="Consultez et gérez les paiements">
        <Link href="/paiements/nouveau">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle Facture
          </Button>
        </Link>
      </DashboardHeader>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un paiement..." className="w-full pl-8" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
                <TableHead>ID Paiement</TableHead>
                <TableHead>N° Facture</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPaiements.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Aucune donnée trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredPaiements.map((paiement) => (
                  <TableRow key={paiement.id}>
                    <TableCell>{paiement.id}</TableCell>
                    <TableCell>{`F-${paiement.id}`}</TableCell>
                    <TableCell>{paiement.patientId}</TableCell>
                    <TableCell>{paiement.datePaiement}</TableCell>
                    <TableCell>{paiement.montant} FCFA</TableCell>
                    <TableCell>{paiement.statut}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Voir Détails
                      </Button>
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
