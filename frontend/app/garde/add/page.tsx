"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { addGarde } from "@/lib/api";

export default function AddGardePage() {
  const [personnelId, setPersonnelId] = useState<number | string>("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!personnelId || !dateDebut || !dateFin) {
      toast({
        title: "Erreur",
        description: "Tous les champs doivent être remplis.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addGarde({ personnelId: Number(personnelId), dateDebut, dateFin });
      toast({
        title: "Succès",
        description: "Garde ajoutée avec succès",
      });
      router.push("/gardes");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la garde",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Ajouter une Garde</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="personnelId">ID du personnel</Label>
          <Input
            id="personnelId"
            value={personnelId}
            onChange={(e) => setPersonnelId(e.target.value)}
            type="number"
            required
          />
        </div>

        <div>
          <Label htmlFor="dateDebut">Date de début</Label>
          <Input
            id="dateDebut"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            type="date"
            required
          />
        </div>

        <div>
          <Label htmlFor="dateFin">Date de fin</Label>
          <Input
            id="dateFin"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            type="date"
            required
          />
        </div>

        <Button type="submit">Ajouter</Button>
      </form>
    </div>
  );
}
