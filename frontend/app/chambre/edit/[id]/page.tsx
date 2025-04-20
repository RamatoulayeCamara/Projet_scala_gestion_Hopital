"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { fetchChambres, updateChambre } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { useParams } from "next/navigation"
import { Chambre } from "@/types";  

export default function EditChambrePage() {
  const { id } = useParams()
  const [numero, setNumero] = useState("")
  const [capacite, setCapacite] = useState(0)
  const [litsOccupes, setLitsOccupes] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const getChambre = async () => {
      try {
        const chambres = await fetchChambres()
        const chambre = chambres.find((ch) => ch.id === Number(id))
        if (!chambre) throw new Error("Chambre introuvable")
        setNumero(chambre.numero)
        setCapacite(chambre.capacite)
        setLitsOccupes(chambre.lits_occupes)
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les informations de la chambre",
          variant: "destructive",
        })
      }
    }

    if (id) {
      getChambre()
    }
  }, [id, toast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const chambre = {
      numero,
      capacite,
      lits_occupes: litsOccupes,
    }

    setIsLoading(true)

    try {
      await updateChambre(Number(id), chambre)
      toast({
        title: "Succès",
        description: "Chambre mise à jour avec succès",
      })
      router.push(`/chambres`)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la chambre",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Modifier une chambre" description="Modifier les détails d'une chambre existante">
        <Link href="/chambre">
          <Button variant="outline">Retour</Button>
        </Link>
      </DashboardHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="numero">Numéro de la chambre</Label>
          <Input
            id="numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
            placeholder="Numéro de la chambre"
          />
        </div>

        <div>
          <Label htmlFor="capacite">Capacité</Label>
          <Input
            type="number"
            id="capacite"
            value={capacite}
            onChange={(e) => setCapacite(Number(e.target.value))}
            required
            placeholder="Capacité"
          />
        </div>

        <div>
          <Label htmlFor="lits_occupes">Lits occupés</Label>
          <Input
            type="number"
            id="lits_occupes"
            value={litsOccupes}
            onChange={(e) => setLitsOccupes(Number(e.target.value))}
            required
            placeholder="Lits occupés"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Mise à jour..." : "Mettre à jour la chambre"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  )
}
