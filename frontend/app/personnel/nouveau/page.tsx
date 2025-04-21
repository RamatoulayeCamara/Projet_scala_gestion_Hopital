"use client"

import type React from "react"

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

export default function NouveauPersonnelPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [fonction, setFonction] = useState("medecin")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler un appel API
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Personnel créé avec succès",
        description: "Le nouveau membre du personnel a été ajouté au système",
      })
      router.push("/personnel")
    }, 1500)
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
                <Label htmlFor="nom">Nom complet</Label>
                <Input id="nom" placeholder="Nom et prénom" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fonction">Fonction</Label>
                <Select defaultValue="medecin" onValueChange={(value) => setFonction(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une fonction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medecin">Médecin</SelectItem>
                    <SelectItem value="infirmier">Infirmier(ère)</SelectItem>
                    <SelectItem value="technicien">Technicien</SelectItem>
                    <SelectItem value="administratif">Personnel administratif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {fonction === "medecin" && (
                <div className="space-y-2">
                  <Label htmlFor="specialite">Spécialité</Label>
                  <Select>
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
                <Input id="telephone" placeholder="Numéro de téléphone" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Input id="adresse" placeholder="Adresse" required />
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
                <Input id="date_embauche" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service</Label>
                <Select>
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
                <Input id="matricule" placeholder="Matricule" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="statut">Statut</Label>
                <Select defaultValue="actif">
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
                <Textarea id="qualifications" placeholder="Qualifications et diplômes" rows={3} />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label htmlFor="notes">Notes supplémentaires</Label>
                <Textarea id="notes" placeholder="Notes supplémentaires" rows={3} />
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
  )
}
