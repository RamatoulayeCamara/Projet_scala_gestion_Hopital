"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { createChambre } from "@/lib/api"; // Importez la fonction de création de chambre

// Interface de la chambre pour la création
interface Chambre {
  numero: string;
  capacite: number;
  lits_occupes: number;
}

export default function AddChambrePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    numero: "",
    capacite: 0,
    litsOccupes: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));  // Mise à jour de l'état du formulaire
  };
    
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Démarre l'état de chargement

    // Vérification des données envoyées avant d'appeler l'API
    console.log("Données envoyées au backend :", formData);

    try {
      // Appel à l'API pour créer un personnel
      await createChambre(formData);
      toast({
        title: "Succès",
        description: "La chambre a été créé avec succès",
      });

      router.push("/chambre");  // Redirige vers la page des personnels après l'ajout
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur s'est produite lors de la création du membre du personnel",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Fin de l'état de chargement
    }
  }


  

  return (
    <DashboardShell>
      <DashboardHeader heading="Ajouter une chambre" description="Ajoutez une nouvelle chambre à l'hôpital">
        <Button variant="outline" onClick={() => router.push("/chambres")}>
          Retour
        </Button>
      </DashboardHeader>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
    
          {/* Label et champ pour le numéro de la chambre */}
          <div>
            <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
              Numéro de la chambre
            </label>
            <Input
              id="numero"
              placeholder="Numéro de la chambre"
              value={formData.numero}
              onChange={(e) =>  setFormData({ ...formData, numero: e.target.value })}
              required
            />
          </div>
          {/* L'id de la chambre sera généré automatiquement */}

          {/* Label et champ pour la capacité de la chambre */}
          <div>
            <label htmlFor="capacite" className="block text-sm font-medium text-gray-700">
              Capacité
            </label>
            <Input
              id="capacite"
              placeholder="Capacité"
              type="number"
              value={formData.capacite}
              onChange={(e) =>  setFormData({ ...formData, capacite: Number(e.target.value) })}
              required
            />
          </div>

          {/* Label et champ pour les lits occupés */}
          <div>
            <label htmlFor="litsOccupes" className="block text-sm font-medium text-gray-700">
              Lits occupés
            </label>
            <Input
              id="litsOccupes"
              placeholder="Lits occupés"
              type="number"
              value={formData.litsOccupes}
              onChange={(e) =>  setFormData({ ...formData, litsOccupes: Number(e.target.value) })}
              required
            />
          </div>

          {/* Bouton pour soumettre le formulaire */}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Ajout en cours..." : "Ajouter la chambre"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  );
}
