"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Edit, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { fetchPatient } from "@/lib/api";
import { useRouter, useParams } from 'next/navigation';  // Importez useParams de Next.js
import { Patient } from "@/types";

export default function PatientPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Utilisez useParams pour récupérer les paramètres de l'URL
  const params = useParams();  // Cela renverra une Promise contenant les paramètres de l'URL
  const patientId = params?.id;  // Assurez-vous que params.id est bien défini

  useEffect(() => {
    if (!patientId) return;  // Si patientId est undefined, ne faites rien

    async function getPatient() {
      try {
        const data = await fetchPatient(Number.parseInt(Array.isArray(patientId) ? patientId[0] : patientId || "0"));  // Appel API pour récupérer les informations du patient
        setPatient(data);
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails du patient",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    getPatient();  // Appel à la fonction pour récupérer les données du patient
  }, [patientId, toast]);

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardShell>
    );
  }

  if (!patient) {
    return (
      <DashboardShell>
        <div className="flex flex-col items-center justify-center p-8">
          <p className="text-lg font-medium">Patient non trouvé</p>
          <Link href="/patients">
            <Button variant="link" className="mt-4">
              Retour à la liste des patients
            </Button>
          </Link>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`${patient.prenom} ${patient.nom}`}
        description={`Code patient: ${patient.codePatient}`}
      >
        <div className="flex space-x-2">
          <Link href="/patients">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </Link>
          <Link href={`/patients/edit/${patientId}`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          </Link>
        </div>
      </DashboardHeader>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>Détails du patient</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nom</p>
                <p>{patient.nom}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Prénom</p>
                <p>{patient.prenom}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                <p>{patient.tel}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">N° Assurance</p>
                <p>{patient.numeroAssurance || "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations médicales</CardTitle>
            <CardDescription>Détails médicaux</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Notes médicales</p>
                <p className="whitespace-pre-wrap">{patient.notesMedicales || "Aucune note médicale"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Traitements</p>
                <p className="whitespace-pre-wrap">{patient.traitements || "Aucun traitement"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="hospitalisations">
          <TabsList>
            <TabsTrigger value="hospitalisations">Hospitalisations</TabsTrigger>
            <TabsTrigger value="rendezvous">Rendez-vous</TabsTrigger>
            <TabsTrigger value="paiements">Paiements</TabsTrigger>
          </TabsList>
          <TabsContent value="hospitalisations" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Historique des hospitalisations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patient.hospitalisations ? (
                    <div className="whitespace-pre-wrap">{patient.hospitalisations}</div>
                  ) : (
                    <p className="text-muted-foreground">Aucune hospitalisation enregistrée</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="rendezvous" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Rendez-vous</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href={`/rendezvous/patient/${patientId}`}>
                  <Button>Voir tous les rendez-vous</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="paiements" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Paiements</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href={`/paiements?patientId=${patientId}`}>
                  <Button>Voir tous les paiements</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}
