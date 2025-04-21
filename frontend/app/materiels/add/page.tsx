"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { createMateriel } from "@/lib/api"; // Assurez-vous que la fonction `createMateriel` existe dans `api.ts`

interface Materiel {
  nom: string;
  quantite: number;
  fournisseur: string;
  dateEntree: string;
  dateSortie?: string | null;
}

export default function AddMaterielPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: "",
    quantite: 0,
    fournisseur: "",
    dateEntree: "",
    dateSortie: "",
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
      await createMateriel(formData);
      toast({
        title: "Succès",
        description: "La chambre a été créé avec succès",
      });

      router.push("/materiels");  // Redirige vers la page des personnels après l'ajout
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur s'est produite lors de la création du materiel",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Fin de l'état de chargement
    }
  }
  

  return (
    <DashboardShell>
      <DashboardHeader heading="Ajouter un matériel" description="Ajoutez un nouveau matériel à l'inventaire">
        <Button variant="outline" onClick={() => router.push("/materiels")}>
          Retour
        </Button>
      </DashboardHeader>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
              Nom du matériel
            </label>
            <Input
              id="nom"
              name="Nom du materiel"
              value={formData.nom}
              onChange={(e) =>  setFormData({ ...formData, nom: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="quantite" className="block text-sm font-medium text-gray-700">
              Quantité
            </label>
            <Input
              id="quantite"
              name="quantite"
              type="number"
              value={formData.quantite}
              onChange={(e) =>  setFormData({ ...formData, quantite: Number(e.target.value) })}
              required
            />
          </div>

          <div>
            <label htmlFor="fournisseur" className="block text-sm font-medium text-gray-700">
              Fournisseur
            </label>
            <Input
              id="fournisseur"
              name="fournisseur"
              value={formData.fournisseur}
              onChange={(e) =>  setFormData({ ...formData, fournisseur: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="dateEntree" className="block text-sm font-medium text-gray-700">
              Date d'entrée
            </label>
            <Input
              id="dateEntree"
              name="dateEntree"
              type="date"
              value={formData.dateEntree}
              onChange={(e) =>  setFormData({ ...formData, dateEntree: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="dateSortie" className="block text-sm font-medium text-gray-700">
              Date de sortie (optionnelle)
            </label>
            <Input
              id="dateSortie"
              name="dateSortie"
              type="date"
              value={formData.dateSortie || ""}
              onChange={(e) =>  setFormData({ ...formData, dateSortie: e.target.value })}
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Ajout en cours..." : "Ajouter le matériel"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  );
}
