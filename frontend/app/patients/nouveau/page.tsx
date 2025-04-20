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

export default function NouveauPatientPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simuler un appel API
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Patient créé avec succès",
        description: "Le nouveau patient a été ajouté au système",
      })
      router.push("/patients")
    }, 1500)
  }

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
              <div className="space-y-2">
                <Label htmlFor="nom">Nom complet</Label>
                <Input id="nom" placeholder="Nom et prénom" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date_naissance">Date de naissance</Label>
                <Input id="date_naissance" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="genre">Genre</Label>
                <Select defaultValue="homme">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="homme">Homme</SelectItem>
                    <SelectItem value="femme">Femme</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input id="telephone" placeholder="Numéro de téléphone" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Input id="adresse" placeholder="Adresse" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groupe_sanguin">Groupe sanguin</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assurance">Assurance</Label>
                <Input id="assurance" placeholder="Assurance médicale" />
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Input id="allergies" placeholder="Allergies connues" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="medecin">Médecin traitant</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-mbaye">Dr. Mbaye</SelectItem>
                    <SelectItem value="dr-diop">Dr. Diop</SelectItem>
                    <SelectItem value="dr-sow">Dr. Sow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label htmlFor="antecedents">Antécédents médicaux</Label>
                <Textarea id="antecedents" placeholder="Antécédents médicaux" rows={3} />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label htmlFor="notes">Notes supplémentaires</Label>
                <Textarea id="notes" placeholder="Notes supplémentaires" rows={3} />
              </div>
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
  )
}
