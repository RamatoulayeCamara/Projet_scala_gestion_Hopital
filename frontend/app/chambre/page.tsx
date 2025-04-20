"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { PlusCircle, Search, Trash2, Edit } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchChambres, deleteChambre } from "@/lib/api";
import Link from "next/link";
import { Chambre } from "@/types";

export default function ChambresPage() {
  const [chambres, setChambres] = useState<Chambre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const getChambres = async () => {
      try {
        const data = await fetchChambres();
        setChambres(data);  // Set the fetched data into state
      } catch (error) {
        toast({
          title: "Erreur",
          description: `Impossible de charger les chambres : ${error instanceof Error ? error.message : "Erreur inconnue"}`,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getChambres();
  }, [toast]);

  const handleDelete = async (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette chambre ?")) {
      try {
        await deleteChambre(id);
        setChambres(chambres.filter((ch) => ch.id !== id));
        toast({
          title: "Succès",
          description: "Chambre supprimée avec succès",
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: `Impossible de supprimer la chambre : ${
            error instanceof Error ? error.message : "Erreur inconnue"
          }`,
          variant: "destructive",
        });
      }
    }
  };

  const filteredChambres = chambres.filter((ch) =>
    ch.numero.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardShell>
      <DashboardHeader heading="Gestion des chambres" description="Consultez et gérez les chambres de l'hôpital">
        <Link href="/chambre/add">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle chambre
          </Button>
        </Link>
      </DashboardHeader>

      <div className="flex items-center py-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Rechercher une chambre..."
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
                <TableHead>Numéro</TableHead>
                <TableHead>Id</TableHead>
                <TableHead>Capacité</TableHead>
                <TableHead>Lits occupés</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChambres.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    Aucune chambre trouvée
                  </TableCell>
                </TableRow>
              ) : (
                filteredChambres.map((ch) => (
                  <TableRow key={ch.id}>
                    <TableCell className="font-medium">{ch.numero}</TableCell>
                    <TableCell>{ch.id}</TableCell>
                    <TableCell>{ch.capacite}</TableCell>
                    <TableCell>{ch.litsOccupes}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/chambres/edit/${ch.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={() => ch.id && handleDelete(ch.id)}>
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
  );
}
