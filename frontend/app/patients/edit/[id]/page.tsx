"use client";

import { useState, useEffect } from "react";
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
import { fetchPatient, updatePatient } from "@/lib/api";
import type { Patient } from "@/types";
import { useParams } from "next/navigation";  // Utilisation du hook useParams()

export default function EditPatientPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Patient | null>(null);

  // Utilisez useParams pour obtenir les paramètres
  const params = useParams(); // Ceci retourne un objet contenant tous les paramètres de l'URL
  const patientId = params?.id; // Accédez à l'ID du patient dans les params

  // Assurez-vous que patientId est valide et qu'il s'agit bien d'une chaîne de caractères
  useEffect(() => {
    if (patientId && typeof patientId === "string") {
      const getPatient = async () => {
        try {
          const data = await fetchPatient(Number.parseInt(patientId)); // Récupérer les informations du patient avec l'ID
          setFormData(data);
        } catch (error) {
          toast({
            title: "Erreur",
            description: "Impossible de charger les informations du patient",
            variant: "destructive",
          });
        }
      };

      getPatient();
    }
  }, [patientId, toast]); // Re-exécuter l'effet lorsque patientId change

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsLoading(true);

    try {
      if (patientId && typeof patientId === "string") {
        await updatePatient(Number.parseInt(patientId), formData); // Mise à jour des informations du patient via l'API
      } else {
        throw new Error("Invalid patient ID");
      }
      toast({
        title: "Succès",
        description: "Patient mis à jour avec succès",
      });
      router.push(`/patients/${patientId}`);  // Redirige vers la page du patient après la mise à jour
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le patient",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!formData) {
    return (
      <DashboardShell>
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={`Édition de ${formData.prenom} ${formData.nom}`} description={`Code patient: ${formData.codePatient}`}>
        <Link href={`/patients/edit/${patientId}`}>
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
            <CardDescription>Modifiez les informations de base du patient</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="codePatient">Code patient</Label>
                <Input
                  id="codePatient"
                  name="codePatient"
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
                  value={formData.numeroAssurance || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Informations médicales</CardTitle>
            <CardDescription>Modifiez les informations médicales du patient</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notesMedicales">Notes médicales</Label>
              <Textarea
                id="notesMedicales"
                name="notesMedicales"
                value={formData.notesMedicales || ""}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="traitements">Traitements</Label>
              <Textarea
                id="traitements"
                name="traitements"
                value={formData.traitements || ""}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 border-t p-6">
            <Button variant="outline" onClick={() => router.push(`/patients/${patientId}`)}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardShell>
  );
}
