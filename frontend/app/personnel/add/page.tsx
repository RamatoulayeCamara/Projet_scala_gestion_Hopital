"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { createPersonnel } from "@/lib/api"; // Remplacez par la fonction API appropriée

export default function AddPersonnelPage() {
    const router = useRouter()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        role: "",
        specialite: "",
        telephone: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await createPersonnel(formData)
            toast({
                title: "Succès",
                description: "Membre du personnel créé avec succès",
            })
            router.push("/personnel?updated=" + Date.now())
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Impossible de créer le membre du personnel",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <DashboardShell>
            <DashboardHeader
                heading="Nouveau membre du personnel"
                description="Ajouter un nouveau membre au système"
            >
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
                        <CardDescription>
                            Entrez les informations de base du membre du personnel
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="nom">Nom</Label>
                                <Input
                                    id="nom"
                                    name="nom"
                                    placeholder="Nom de famille"
                                    value={formData.nom}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="prenom">Prénom</Label>
                                <Input
                                    id="prenom"
                                    name="prenom"
                                    placeholder="Prénom"
                                    value={formData.prenom}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">Rôle</Label>
                                <Input
                                    id="role"
                                    name="role"
                                    placeholder="Ex: Enseignant, Technicien..."
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="specialite">Spécialité</Label>
                                <Input
                                    id="specialite"
                                    name="specialite"
                                    placeholder="Ex: Mathématiques, Réseaux..."
                                    value={formData.specialite}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="telephone">Téléphone</Label>
                                <Input
                                    id="telephone"
                                    name="telephone"
                                    placeholder="Numéro de téléphone"
                                    value={formData.telephone}
                                    onChange={handleChange}
                                    required
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
    )
}
