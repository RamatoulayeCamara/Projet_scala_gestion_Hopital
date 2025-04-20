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

export default function NouveauRendezVousPage() {
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
        title: "Rendez-vous créé avec succès",
        description: "Le rendez-vous a été ajouté au planning",
      })
      router.push("/rendez-vous")
    }, 1500)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Nouveau rendez-vous" description="Planifier un nouveau rendez-vous">
        <Link href="/rendez-vous">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </Link>
      </DashboardHeader>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informations du rendez-vous</CardTitle>
            <CardDescription>Entrez les détails du rendez-vous</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="patient">Patient</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="p-1001">Amadou Diop</SelectItem>
                    <SelectItem value="p-1002">Fatou Ndiaye</SelectItem>
                    <SelectItem value="p-1003">Ousmane Sow</SelectItem>
                    <SelectItem value="p-1004">Aïda Fall</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="medecin">Médecin</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un médecin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-mbaye">Dr. Mbaye - Cardiologie</SelectItem>
                    <SelectItem value="dr-diop">Dr. Diop - Pédiatrie</SelectItem>
                    <SelectItem value="dr-sow">Dr. Sow - Médecine générale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heure">Heure</Label>
                <Input id="heure" type="time" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duree">Durée</Label>
                <Select defaultValue="30">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une durée" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 heure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type de rendez-vous</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="suivi">Suivi</SelectItem>
                    <SelectItem value="examen">Examen</SelectItem>
                    <SelectItem value="urgence">Urgence</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label htmlFor="motif">Motif du rendez-vous</Label>
                <Textarea id="motif" placeholder="Motif du rendez-vous" rows={3} />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <Label htmlFor="notes">Notes supplémentaires</Label>
                <Textarea id="notes" placeholder="Notes supplémentaires" rows={3} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 border-t p-6">
            <Button variant="outline" onClick={() => router.push("/rendez-vous")}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Enregistrement..." : "Planifier le rendez-vous"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardShell>
  )
}
