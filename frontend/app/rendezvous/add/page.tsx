"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { PlusCircle } from "lucide-react"
import { createRendezVous } from "@/lib/api" // Assurez-vous que cette fonction existe dans votre code

export default function AddRendezVousPage() {
  const [dateHeure, setDateHeure] = useState("")
  const [patientId, setPatientId] = useState("")
  const [personnelId, setPersonnelId] = useState("")
  const [motif, setMotif] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const rendezVousData = {
      dateHeure,
      patientId: Number(patientId),
      personnelId: Number(personnelId),
      motif,
    }

    console.log("Données du rendez-vous à envoyer :", rendezVousData) // Vérification des données

    try {
      // Appel API pour ajouter le rendez-vous
      const response = await createRendezVous(rendezVousData)
      console.log("Réponse de l'API:", response) // Vérification de la réponse

      toast({
        title: "Succès",
        description: "Rendez-vous ajouté avec succès",
      })

      // Rediriger vers la page de gestion des rendez-vous après l'ajout
      router.push("/rendezvous")
    } catch (error) {
      console.error("Erreur lors de l'ajout du rendez-vous :", error) // Vérification de l'erreur
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le rendez-vous",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6">Ajouter un rendez-vous</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="dateHeure" className="block text-sm font-medium">Date et Heure</label>
          <Input
            id="dateHeure"
            type="datetime-local"
            required
            value={dateHeure}
            onChange={(e) => setDateHeure(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="patientId" className="block text-sm font-medium">Patient ID</label>
          <Input
            id="patientId"
            type="text"
            required
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="personnelId" className="block text-sm font-medium">Personnel ID</label>
          <Input
            id="personnelId"
            type="text"
            required
            value={personnelId}
            onChange={(e) => setPersonnelId(e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="motif" className="block text-sm font-medium">Motif</label>
          <Textarea
            id="motif"
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            placeholder="Entrez le motif du rendez-vous"
            className="mt-1"
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Ajout en cours..." : <><PlusCircle className="mr-2 h-4 w-4" /> Ajouter</>}
          </Button>
        </div>
      </form>
    </div>
  )
}
