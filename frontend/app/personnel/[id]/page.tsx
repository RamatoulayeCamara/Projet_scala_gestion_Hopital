import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Edit, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PersonnelPageProps {
  params: {
    id: string
  }
}

export default function PersonnelPage({ params }: PersonnelPageProps) {
  const personnelId = params.id

  // Dans un cas réel, vous feriez un appel API pour récupérer les données du personnel
  const personnel = {
    id: personnelId,
    nom: "Dr. Mbaye",
    fonction: "Médecin",
    specialite: "Cardiologie",
    telephone: "77 111 22 33",
    email: "dr.mbaye@werralakjamm.sn",
    adresse: "456 Avenue Principale, Dakar",
    date_embauche: "10/01/2020",
    service: "Cardiologie",
    matricule: "M-1001",
    statut: "Actif",
    qualifications: "Doctorat en médecine (Université de Dakar), Spécialisation en cardiologie (Paris)",
    horaires: "Lundi-Vendredi: 08:00-16:00",
    patients_actuels: 12,
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={`${personnel.nom}`} description={`${personnel.fonction} en ${personnel.specialite}`}>
        <div className="flex space-x-2">
          <Link href="/personnel">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </Link>
          <Link href={`/personnel/${personnelId}/modifier`}>
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
            <CardDescription>Détails du membre du personnel</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nom</p>
                <p>{personnel.nom}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fonction</p>
                <p>{personnel.fonction}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Spécialité</p>
                <p>{personnel.specialite}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                <p>{personnel.telephone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{personnel.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Adresse</p>
                <p>{personnel.adresse}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations professionnelles</CardTitle>
            <CardDescription>Détails professionnels</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Statut</p>
                <div className="flex items-center mt-1">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                  <p>{personnel.statut}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Date d'embauche</p>
                <p>{personnel.date_embauche}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Service</p>
                <p>{personnel.service}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Matricule</p>
                <p>{personnel.matricule}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Horaires</p>
                <p>{personnel.horaires}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-muted-foreground">Qualifications</p>
                <p>{personnel.qualifications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="patients">
          <TabsList>
            <TabsTrigger value="patients">Patients actuels</TabsTrigger>
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="historique">Historique</TabsTrigger>
          </TabsList>
          <TabsContent value="patients" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Patients actuels</CardTitle>
                <CardDescription>Patients actuellement suivis par {personnel.nom}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Amadou Diop</h4>
                        <p className="text-sm text-muted-foreground">ID: P-1001 - Chambre: C-105</p>
                      </div>
                      <Link href="/patients/P-1001">
                        <Button variant="outline" size="sm">
                          Voir le dossier
                        </Button>
                      </Link>
                    </div>
                    <p className="mt-2 text-sm">Diagnostic: Hypertension, Diabète de type 2</p>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">Fatou Ndiaye</h4>
                        <p className="text-sm text-muted-foreground">ID: P-1002 - Consultation externe</p>
                      </div>
                      <Link href="/patients/P-1002">
                        <Button variant="outline" size="sm">
                          Voir le dossier
                        </Button>
                      </Link>
                    </div>
                    <p className="mt-2 text-sm">Diagnostic: Arythmie cardiaque</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="planning" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Planning hebdomadaire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h4 className="font-medium">Lundi</h4>
                    <p className="text-sm text-muted-foreground">08:00 - 12:00: Consultations</p>
                    <p className="text-sm text-muted-foreground">14:00 - 16:00: Visites patients</p>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="font-medium">Mardi</h4>
                    <p className="text-sm text-muted-foreground">08:00 - 12:00: Consultations</p>
                    <p className="text-sm text-muted-foreground">14:00 - 16:00: Réunion de service</p>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="font-medium">Mercredi</h4>
                    <p className="text-sm text-muted-foreground">08:00 - 12:00: Bloc opératoire</p>
                    <p className="text-sm text-muted-foreground">14:00 - 16:00: Visites patients</p>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="font-medium">Jeudi</h4>
                    <p className="text-sm text-muted-foreground">08:00 - 12:00: Consultations</p>
                    <p className="text-sm text-muted-foreground">14:00 - 16:00: Formation</p>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="font-medium">Vendredi</h4>
                    <p className="text-sm text-muted-foreground">08:00 - 12:00: Consultations</p>
                    <p className="text-sm text-muted-foreground">14:00 - 16:00: Visites patients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="historique" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Historique professionnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h4 className="font-medium">Formation continue</h4>
                    <p className="text-sm text-muted-foreground">Mars 2022 - Nouvelles techniques en cardiologie</p>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="font-medium">Congés</h4>
                    <p className="text-sm text-muted-foreground">Août 2022 - 3 semaines</p>
                    <p className="text-sm text-muted-foreground">Décembre 2021 - 2 semaines</p>
                  </div>
                  <div className="border-b pb-4">
                    <h4 className="font-medium">Évaluations</h4>
                    <p className="text-sm text-muted-foreground">Janvier 2023 - Évaluation annuelle: Excellent</p>
                    <p className="text-sm text-muted-foreground">Janvier 2022 - Évaluation annuelle: Très bien</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
