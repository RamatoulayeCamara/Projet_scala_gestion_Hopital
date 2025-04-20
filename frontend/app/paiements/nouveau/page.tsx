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

export default function NouvelleFacturePage() {
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
        title: "Facture créée avec succès",
        description: "La facture a été ajoutée au système",
      })
      router.push("/paiements")
    }, 1500)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Nouvelle facture" description="Créer une nouvelle facture">
        <Link href="/paiements">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </Link>
      </DashboardHeader>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informations de la facture</CardTitle>
            <CardDescription>Entrez les détails de la facture</CardDescription>
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
                <Label htmlFor="date">Date d'émission</Label>
                <Input id="date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="echeance">Date d'échéance</Label>
                <Input id="echeance" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type de facture</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="hospitalisation">Hospitalisation</SelectItem>
                    <SelectItem value="examen">Examens médicaux</SelectItem>
                    <SelectItem value="medicaments">Médicaments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label>Éléments de la facture</Label>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 text-sm font-medium">Description</th>
                      <th className="text-left p-2 text-sm font-medium">Quantité</th>
                      <th className="text-left p-2 text-sm font-medium">Prix unitaire</th>
                      <th className="text-left p-2 text-sm font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">
                        <Input placeholder="Description" />
                      </td>
                      <td className="p-2">
                        <Input type="number" min="1" defaultValue="1" />
                      </td>
                      <td className="p-2">
                        <Input type="number" min="0" placeholder="Prix" />
                      </td>
                      <td className="p-2">
                        <Input type="number" disabled placeholder="0" />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="p-2">
                        <Button variant="outline" type="button" className="w-full">
                          + Ajouter un élément
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t">
                      <td colSpan={3} className="p-2 text-right font-medium">
                        Total:
                      </td>
                      <td className="p-2">
                        <Input type="number" disabled placeholder="0" />
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Notes supplémentaires" rows={3} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 border-t p-6">
            <Button variant="outline" onClick={() => router.push("/paiements")}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Enregistrement..." : "Créer la facture"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </DashboardShell>
  )
}
