"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ArrowLeft, Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { Patient } from "@/types"
import { fetchPatients } from "@/lib/api"

export default function PatientSearchPage() {
  const [searchParams, setSearchParams] = useState({
    nom: "",
    prenom: "",
    codePatient: "",
    tel: "",
    numeroAssurance: "",
  })
  const [results, setResults] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchParams((prev) => ({ ...prev, [name]: value }))
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setHasSearched(true)

    try {
      const data = await fetchPatients()
      setResults(data)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'effectuer la recherche",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Recherche avancée" description="Recherchez des patients selon différents critères">
        <Link href="/patients">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </Link>
      </DashboardHeader>

      <Card>
        <CardHeader>
          <CardTitle>Critères de recherche</CardTitle>
          <CardDescription>Remplissez un ou plusieurs champs pour effectuer votre recherche</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Input placeholder="Nom" name="nom" value={searchParams.nom} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Input placeholder="Prénom" name="prenom" value={searchParams.prenom} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Code patient"
                  name="codePatient"
                  value={searchParams.codePatient}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Input placeholder="Téléphone" name="tel" value={searchParams.tel} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Numéro d'assurance"
                  name="numeroAssurance"
                  value={searchParams.numeroAssurance}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSearch} disabled={isLoading}>
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? "Recherche en cours..." : "Rechercher"}
          </Button>
        </CardFooter>
      </Card>

      {hasSearched && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Résultats de recherche</CardTitle>
            <CardDescription>
              {results.length} patient{results.length !== 1 ? "s" : ""} trouvé{results.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {results.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">Aucun patient ne correspond à ces critères</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Prénom</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>N° Assurance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">{patient.codePatient}</TableCell>
                      <TableCell>{patient.nom}</TableCell>
                      <TableCell>{patient.prenom}</TableCell>
                      <TableCell>{patient.tel}</TableCell>
                      <TableCell>{patient.numeroAssurance || "-"}</TableCell>
                      <TableCell className="text-right">
                        <Link href={`/patients/${patient.id}`}>
                          <Button variant="ghost" size="sm">
                            Voir
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      )}
    </DashboardShell>
  )
}
