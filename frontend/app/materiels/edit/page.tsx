"use client"; // Ajouter cette ligne en haut du fichier

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation"; // Pour la redirection après mise à jour
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { fetchMateriel, updateMateriel } from "@/lib/api";
import { Materiel } from "@/types";
import { useParams } from "next/navigation"; // Utilisation du hook useParams()

export default function EditMaterielPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Materiel | null>(null);

  // Utilisez useParams pour obtenir les paramètres de l'URL
  const params = useParams(); // Ceci retourne un objet contenant tous les paramètres de l'URL
  const materielId = params?.id; // Accédez à l'ID du matériel dans les params

  // Assurez-vous que materielId est valide et qu'il s'agit bien d'une chaîne de caractères
  useEffect(() => {
    if (materielId && typeof materielId === "string") {
      const getMateriel = async () => {
        try {
          const data = await fetchMateriel(Number.parseInt(materielId)); // Récupérer les informations du matériel avec l'ID
          setFormData(data);
        } catch (error) {
          toast({
            title: "Erreur",
            description: "Impossible de charger les informations du matériel",
            variant: "destructive",
          });
        }
      };

      getMateriel();
    }
  }, [materielId, toast]); // Re-exécuter l'effet lorsque materielId change

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsLoading(true);

    try {
      if (materielId && typeof materielId === "string") {
        await updateMateriel(Number.parseInt(materielId), formData); // Mise à jour des informations du matériel via l'API
      } else {
        throw new Error("ID du matériel invalide");
      }
      toast({
        title: "Succès",
        description: "Matériel mis à jour avec succès",
      });
      router.push(`/materiels/${materielId}`);  // Redirige vers la page du matériel après la mise à jour
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le matériel",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!formData) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Édition du matériel: {formData.nom}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nom */}
        <div>
          <Label htmlFor="nom">Nom du matériel</Label>
          <Input
            id="nom"
            name="nom"
            value={formData.nom}
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
            value={formData.quantite}
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
            value={formData.fournisseur}
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
            value={formData.dateEntree}
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
            value={formData.dateSortie || ""}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <Button type="submit" className="mt-4 w-full">
          {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
        </Button>
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
