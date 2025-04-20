"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function RecentActivity() {
  return (
    <Tabs defaultValue="patients" className="space-y-4">
      <TabsList>
        <TabsTrigger value="patients">Patients</TabsTrigger>
        <TabsTrigger value="personnel">Personnel</TabsTrigger>
        <TabsTrigger value="paiements">Paiements</TabsTrigger>
      </TabsList>
      <TabsContent value="patients" className="space-y-4">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <div className="flex-1">
            <p className="text-sm font-medium">Nouveau patient: Amadou Diop</p>
            <p className="text-xs text-muted-foreground">Il y a 35 minutes</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
          <div className="flex-1">
            <p className="text-sm font-medium">Sortie: Fatou Ndiaye</p>
            <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
          <div className="flex-1">
            <p className="text-sm font-medium">Transfert: Ousmane Sow</p>
            <p className="text-xs text-muted-foreground">Il y a 4 heures</p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="personnel" className="space-y-4">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <div className="flex-1">
            <p className="text-sm font-medium">Nouveau médecin: Dr. Mbaye</p>
            <p className="text-xs text-muted-foreground">Il y a 2 jours</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
          <div className="flex-1">
            <p className="text-sm font-medium">Congé: Inf. Diallo</p>
            <p className="text-xs text-muted-foreground">Il y a 1 jour</p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="paiements" className="space-y-4">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <div className="flex-1">
            <p className="text-sm font-medium">Paiement reçu: 450,000 FCFA</p>
            <p className="text-xs text-muted-foreground">Il y a 1 heure</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
          <div className="flex-1">
            <p className="text-sm font-medium">Nouvelle facture: 320,000 FCFA</p>
            <p className="text-xs text-muted-foreground">Il y a 3 heures</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
