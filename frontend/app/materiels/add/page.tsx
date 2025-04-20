"use client"; // Ajouter cette ligne en haut du fichier

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation"; // Pour la redirection après ajout
import { createMateriel } from "@/lib/api"; // Assurez-vous que la fonction `createMateriel` existe dans `api.ts`
import Link from "next/link"; // Pour la redirection via Link
import { toast } from "sonner";

export default function MaterielForm() {
  const [materiel, setMateriel] = useState({
    id: "",          // Ajout de l'ID dans l'état
    nom: "",
    quantite: 0,
    fournisseur: "",
    dateEntree: "",
    dateSortie: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMateriel((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Vérification des données avant envoi
    if (!materiel.id || !materiel.nom || !materiel.quantite || !materiel.fournisseur || !materiel.dateEntree) {
      toast.error("Tous les champs obligatoires doivent être remplis.");
      return;
    }

    console.log("Données soumises :", materiel); // Log des données avant l'envoi à l'API

    try {
      const addedMateriel = await createMateriel({
        id: materiel.id ? parseInt(materiel.id, 10) : undefined, // Passer l'ID dans le backend
        nom: materiel.nom,
        quantite: materiel.quantite,
        fournisseur: materiel.fournisseur,
        dateEntree: materiel.dateEntree,
        dateSortie: materiel.dateSortie || null, // Utiliser `null` si la sortie est vide
      });

      console.log("Matériel ajouté :", addedMateriel); // Log après l'ajout du matériel

      // Rediriger vers la page des matériels après la création réussie
      router.push("/materiels");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erreur inconnue";
      toast.error(`Une erreur est survenue : ${errorMessage}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-2xl font-bold">Ajouter un matériel</h1>
        <p className="text-gray-600">Remplissez les informations ci-dessous pour ajouter un nouveau matériel.</p>

        {/* ID du matériel */}
        <div>
          <Label htmlFor="id">ID du matériel</Label>
          <Input
            id="id"
            name="id"
            value={materiel.id}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        {/* Nom du matériel */}
        <div>
          <Label htmlFor="nom">Nom du matériel</Label>
          <Input
            id="nom"
            name="nom"
            value={materiel.nom}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        {/* Quantité */}
        <div>
          <Label htmlFor="quantite">Quantité</Label>
          <Input
            id="quantite"
            name="quantite"
            type="number"
            value={materiel.quantite}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        {/* Fournisseur */}
        <div>
          <Label htmlFor="fournisseur">Fournisseur</Label>
          <Input
            id="fournisseur"
            name="fournisseur"
            value={materiel.fournisseur}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        {/* Date d'entrée */}
        <div>
          <Label htmlFor="dateEntree">Date d'entrée</Label>
          <Input
            id="dateEntree"
            name="dateEntree"
            type="date"
            value={materiel.dateEntree}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        {/* Date de sortie (optionnel) */}
        <div>
          <Label htmlFor="dateSortie">Date de sortie (optionnel)</Label>
          <Input
            id="dateSortie"
            name="dateSortie"
            type="date"
            value={materiel.dateSortie || ""}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <Button type="submit" className="mt-4 w-full">Ajouter</Button>
      </form>

      {/* Bouton Retour à la liste des matériels */}
      <div className="mt-6">
        <Link href="/materiels">
          <Button variant="outline" className="w-full">
            Retour à la liste des matériels
          </Button>
        </Link>
      </div>
    </div>
  );
}
