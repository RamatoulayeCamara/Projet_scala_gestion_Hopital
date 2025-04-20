// app/chambres/add/page.tsx
"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { createChambre } from "@/lib/api";

export default function AddChambrePage() {
  const [numero, setNumero] = useState("");
  const [capacite, setCapacite] = useState(0);
  const [litsOccupes, setLitsOccupes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const chambre = await createChambre({
        numero,
        capacite,
        lits_occupes: litsOccupes,
      });

      toast({
        title: "Succès",
        description: "Chambre ajoutée avec succès",
      });

      router.push("/chambres"); // Redirige vers la liste des chambres
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la chambre",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardShell>
      <DashboardHeader heading="Ajouter une chambre" description="Ajoutez une nouvelle chambre à l'hôpital">
        <Button variant="outline" onClick={() => router.push("/chambres")}>
          Retour
        </Button>
      </DashboardHeader>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            placeholder="Numéro de la chambre"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />
          <Input
            placeholder="Capacité"
            type="number"
            value={capacite}
            onChange={(e) => setCapacite(Number(e.target.value))}
            required
          />
          <Input
            placeholder="Lits occupés"
            type="number"
            value={litsOccupes}
            onChange={(e) => setLitsOccupes(Number(e.target.value))}
            required
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Ajout en cours..." : "Ajouter la chambre"}
          </Button>
        </div>
      </form>
    </DashboardShell>
  );
}
