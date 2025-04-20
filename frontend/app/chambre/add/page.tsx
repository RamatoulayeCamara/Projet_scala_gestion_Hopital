"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createChambre } from "@/lib/api"; // Assure-toi que cette fonction existe dans /lib/api

export default function AddChambrePage() {
  const [numero, setNumero] = useState(""); // Numéro de la chambre
  const [capacite, setCapacite] = useState(0); // Capacité de la chambre
  const [litsOccupes, setLitsOccupes] = useState(0); // Lits occupés dans la chambre
  const [isLoading, setIsLoading] = useState(false); // Etat de chargement pour le bouton
  const { toast } = useToast(); // Gestion des toast
  const router = useRouter(); // Pour la redirection après soumission

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Activation du chargement

    // Validation des champs
    if (!numero || capacite <= 0 || litsOccupes < 0 || litsOccupes > capacite) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir correctement tous les champs.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Appel à la fonction pour créer une chambre
      const chambre = await createChambre({
        numero,
        capacite,
        litsOccupes: litsOccupes, // Utilisation de litsOccupes sans underscore
      });

      toast({
        title: "Succès",
        description: "Chambre ajoutée avec succès",
      });

      // Redirection vers la liste des chambres après l'ajout
      router.push("/chambre"); // Utilise la route qui affiche toutes les chambres
    } catch (error) {
      toast({
        title: "Erreur",
        description: `Impossible d'ajouter la chambre : ${
            error instanceof Error ? error.message : "Erreur inconnue"
        }`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  };


  return (
      <DashboardShell>
        <DashboardHeader
            heading="Ajouter une chambre"
            description="Ajoutez une nouvelle chambre à l'hôpital"
        >
          <Button variant="outline" onClick={() => router.push("/chambre")}>
            Retour
          </Button>
        </DashboardHeader>

        <div className="max-w-xl mx-auto py-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                  htmlFor="numero"
                  className="block text-sm font-medium text-gray-700"
              >
                Numéro de la chambre
              </label>
              <Input
                  id="numero"
                  type="text"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  required
              />
            </div>

            <div className="mb-4">
              <label
                  htmlFor="capacite"
                  className="block text-sm font-medium text-gray-700"
              >
                Capacité
              </label>
              <Input
                  id="capacite"
                  type="number"
                  value={capacite}
                  onChange={(e) => setCapacite(Number(e.target.value))}
                  required
              />
            </div>

            <div className="mb-4">
              <label
                  htmlFor="litsOccupes"
                  className="block text-sm font-medium text-gray-700"
              >
                Lits occupés
              </label>
              <Input
                  id="litsOccupes"
                  type="number"
                  value={litsOccupes}
                  onChange={(e) => setLitsOccupes(Number(e.target.value))}
                  required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Ajout en cours..." : "Ajouter la chambre"}
            </Button>
          </form>
        </div>
      </DashboardShell>
  );
}
