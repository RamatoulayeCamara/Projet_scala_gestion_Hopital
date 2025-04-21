"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { createPersonnel } from "@/lib/api"  // Assurez-vous d'importer cette fonction

export default function NouveauPersonnelPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState("medecin")  // Utilisez "role" au lieu de "fonction"
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    role: "medecin",  // Assurez-vous que le rôle est bien défini
    telephone: "",
    email: "",
    adresse: "",
    specialite: "",
    dateEmbauche: "",
    service: "",
    matricule: "",
    statut: "actif",
    qualifications: "",
    notes: "",
  })  

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
      await createPersonnel(formData);
      toast({
        title: "Succès",
        description: "Le membre du personnel a été créé avec succès",
      });

      router.push("/personnel");  // Redirige vers la page des personnels après l'ajout
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
      <DashboardHeader heading="Nouveau membre du personnel" description="Ajouter un nouveau membre du personnel">
        <Link href="/personnel">
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
            <CardDescription>Entrez les informations de base du membre du personnel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom </Label>
                <Input
                  id="nom"
                  placeholder="Nom "
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prénom"> Prénom </Label>
                <Input
                  id="nom"
                  placeholder="prénom"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Select
                  value={role}  // Utiliser "role" ici
                  onValueChange={(value) => setRole(value)}  // Mise à jour de "role" au lieu de "fonction"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medecin">Médecin</SelectItem>
                    <SelectItem value="infirmier">Infirmier(ère)</SelectItem>
                    <SelectItem value="technicien">Technicien</SelectItem>
                    <SelectItem value="administratif">Personnel administratif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {role === "medecin" && (
                <div className="space-y-2">
                  <Label htmlFor="specialite">Spécialité</Label>
                  <Select
                    onValueChange={(value) => setFormData({ ...formData, specialite: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une spécialité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiologie">Cardiologie</SelectItem>
                      <SelectItem value="pediatrie">Pédiatrie</SelectItem>
                      <SelectItem value="generaliste">Médecine générale</SelectItem>
                      <SelectItem value="chirurgie">Chirurgie</SelectItem>
                      <SelectItem value="gynecologie">Gynécologie</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  placeholder="Numéro de téléphone"
                  value={formData.telephone}
                  onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Input
                  id="adresse"
                  placeholder="Adresse"
                  value={formData.adresse}
                  onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Informations professionnelles</CardTitle>
            <CardDescription>Entrez les informations professionnelles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date_embauche">Date d'embauche</Label>
                <Input
                  id="date_embauche"
                  type="date"
                  value={formData.dateEmbauche}
                  onChange={(e) => setFormData({ ...formData, dateEmbauche: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiologie">Cardiologie</SelectItem>
                    <SelectItem value="pediatrie">Pédiatrie</SelectItem>
                    <SelectItem value="urgences">Urgences</SelectItem>
                    <SelectItem value="chirurgie">Chirurgie</SelectItem>
                    <SelectItem value="maternite">Maternité</SelectItem>
                    <SelectItem value="administration">Administration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="matricule">Matricule</Label>
                <Input
                  id="matricule"
                  placeholder="Matricule"
                  value={formData.matricule}
                  onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="statut">Statut</Label>
                <Select
                  value={formData.statut}
                  onValueChange={(value) => setFormData({ ...formData, statut: value })}
                  defaultValue="actif"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="conge">En congé</SelectItem>
                    <SelectItem value="formation">En formation</SelectItem>
                    <SelectItem value="suspendu">Suspendu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label htmlFor="qualifications">Qualifications et diplômes</Label>
                <Textarea
                  id="qualifications"
                  placeholder="Qualifications et diplômes"
                  rows={3}
                  value={formData.qualifications}
                  onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label htmlFor="notes">Notes supplémentaires</Label>
                <Textarea
                  id="notes"
                  placeholder="Notes supplémentaires"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end space-x-2 border-t p-6">
            <Button variant="outline" onClick={() => router.push("/personnel")}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Enregistrement..." : "Enregistrer le membre"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardShell>
  );
}
