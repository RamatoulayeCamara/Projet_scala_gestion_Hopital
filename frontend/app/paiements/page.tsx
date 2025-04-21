"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchPaiements } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { Paiement } from "@/types";

export default function PaiementsPage() {
  const [paiements, setPaiements] = useState<Paiement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const getPaiements = async () => {
      try {
        const data = await fetchPaiements();
        setPaiements(data);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les paiements",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getPaiements();
  }, [toast]);

  const filteredPaiements = paiements.filter(
    (paiement) =>
      (paiement.id?.toString().includes(searchTerm) ?? false) || paiement.statut.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardShell>
      <DashboardHeader heading="Gestion des paiements" description="Consultez et gérez les paiements">
        <Button variant="outline">Nouvelle Facture</Button>
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
