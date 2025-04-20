"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { createPatient } from "@/lib/api";

export default function AddPatientPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    codePatient: "",
    nom: "",
    prenom: "",
    tel: "",
    numeroAssurance: "",
    notesMedicales: "",
    traitements: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // Mise à jour de l'état du formulaire
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Démarre l'état de chargement
    
    try {
      await createPatient(formData); // Appel à la fonction API pour créer le patient
      toast({
        title: "Succès",
        description: "Patient créé avec succès",
      });
      router.push("/patients?updated=" + Date.now()); // Redirection après ajout
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le patient",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Fin de l'état de chargement
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader heading="Nouveau patient" description="Ajouter un nouveau patient au système">
        <Link href="/patients">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </Link>
      </DashboardHeader>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>Entrez les informations de base du patient</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Informations personnelles */}
              <div className="space-y-2">
                <Label htmlFor="codePatient">Code patient</Label>
                <Input
                  id="codePatient"
                  name="codePatient"
                  placeholder="Code unique du patient"
                  value={formData.codePatient}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  name="nom"
                  placeholder="Nom de famille"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  name="prenom"
                  placeholder="Prénom"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tel">Téléphone</Label>
                <Input
                  id="tel"
                  name="tel"
                  placeholder="Numéro de téléphone"
                  value={formData.tel}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numeroAssurance">Numéro d'assurance</Label>
                <Input
                  id="numeroAssurance"
                  name="numeroAssurance"
                  placeholder="Numéro d'assurance (optionnel)"
                  value={formData.numeroAssurance}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Informations médicales</CardTitle>
            <CardDescription>Entrez les informations médicales du patient</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Informations médicales */}
            <div className="space-y-2">
              <Label htmlFor="notesMedicales">Notes médicales</Label>
              <Textarea
                id="notesMedicales"
                name="notesMedicales"
                placeholder="Notes médicales (optionnel)"
                value={formData.notesMedicales}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="traitements">Traitements</Label>
              <Textarea
                id="traitements"
                name="traitements"
                placeholder="Traitements en cours (optionnel)"
                value={formData.traitements}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 border-t p-6">
            <Button variant="outline" onClick={() => router.push("/patients")}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Enregistrement..." : "Enregistrer le patient"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardShell>
  );
}
