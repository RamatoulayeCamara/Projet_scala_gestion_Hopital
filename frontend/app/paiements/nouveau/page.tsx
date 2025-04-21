"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { useRouter } from "next/navigation"; // Pour la redirection après ajout
import { useToast } from "@/components/ui/use-toast";
import { createPaiement } from "@/lib/api"; // Assurez-vous que cette fonction existe et est correcte
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Pour la sélection du patient et de la chambre
import { Label } from "@/components/ui/label";
import { fetchPatients, fetchChambres } from "@/lib/api"; // Importez les fonctions pour récupérer les patients et chambres
import { Paiement } from "@/types";

export default function NouvelleFacturePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [patients, setPatients] = useState<any[]>([]); // Utilisation de l'état pour les patients
  const [chambres, setChambres] = useState<any[]>([]); // Utilisation de l'état pour les chambres
  const [formData, setFormData] = useState({
    patientId: "",  // ID du patient
    chambreId: "",  // ID de la chambre
    montant: 0,     // Montant du paiement
    datePaiement: "", // Date du paiement
    statut: "Payé", // Statut du paiement
  });

  useEffect(() => {
    // Fonction pour récupérer les patients depuis l'API
    const getPatients = async () => {
      try {
        const data = await fetchPatients(); // Récupération des patients depuis l'API
        setPatients(data); // Mise à jour de l'état avec les données des patients
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les patients.",
          variant: "destructive",
        });
      }
    };

    // Fonction pour récupérer les chambres depuis l'API
    const getChambres = async () => {
      try {
        const data = await fetchChambres(); // Récupération des chambres depuis l'API
        setChambres(data); // Mise à jour de l'état avec les données des chambres
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les chambres.",
          variant: "destructive",
        });
      }
    };

    getPatients(); // Appel de la fonction lors du montage du composant
    getChambres(); // Appel pour récupérer les chambres
  }, [toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // Mise à jour de l'état du formulaire
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Démarre l'état de chargement

    // Vérification des données envoyées avant d'appeler l'API
    console.log("Données envoyées au backend :", formData);

    try {
      // Appel à l'API pour créer un paiement
      await createPaiement({
        patientId: Number(formData.patientId), // Convertir en nombre
        chambreId: Number(formData.chambreId), // Convertir en nombre
        montant: formData.montant,
        datePaiement: formData.datePaiement,
        statut: formData.statut,
      });

      toast({
        title: "Succès",
        description: "Le paiement a été enregistré avec succès.",
      });

      router.push("/paiements");  // Redirige vers la page des paiements après l'ajout
    } catch (error) {
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Une erreur s'est produite lors de la création.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Fin de l'état de chargement
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader heading="Nouvelle facture" description="Créer une nouvelle facture">
        <Button variant="outline" onClick={() => router.push("/paiements")}>
          Retour
        </Button>
      </DashboardHeader>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Sélectionner le patient */}
          <div>
            <Label htmlFor="patientId">Patient</Label>
            <Select
              name="patientId"
              value={formData.patientId}
              onValueChange={(value) => setFormData({ ...formData, patientId: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un patient" />
              </SelectTrigger>
              <SelectContent>
                {patients.length > 0 ? (
                  patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id.toString()}>
                      {patient.nom} {patient.prenom}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="disabled">Aucun patient trouvé</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Sélectionner la chambre */}
          <div>
            <Label htmlFor="chambreId">Chambre</Label>
            <Select
              name="chambreId"
              value={formData.chambreId}
              onValueChange={(value) => setFormData({ ...formData, chambreId: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une chambre" />
              </SelectTrigger>
              <SelectContent>
                {chambres.length > 0 ? (
                  chambres.map((chambre) => (
                    <SelectItem key={chambre.id} value={chambre.id.toString()}>
                      {chambre.numero}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="disabled">Aucune chambre trouvée</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Date du paiement */}
          <div>
            <Label htmlFor="datePaiement">Date du paiement</Label>
            <Input
              id="datePaiement"
              name="datePaiement"
              type="date"
              value={formData.datePaiement}
              onChange={handleChange}
              required
            />
          </div>

          {/* Montant */}
          <div>
            <Label htmlFor="montant">Montant</Label>
            <Input
              id="montant"
              name="montant"
              type="number"
              value={formData.montant}
              onChange={handleChange}
              required
            />
          </div>

          {/* Statut */}
          <div>
            <Label htmlFor="statut">Statut</Label>
            <Input
              id="statut"
              name="statut"
              type="text"
              value={formData.statut}
              onChange={handleChange}
              required
            />
          </div>

          {/* Soumettre */}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Enregistrement..." : "Créer la facture"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  );
}
