// Types pour les modèles de données

export interface Patient {
  id?: number
  codePatient: string
  nom: string
  prenom: string
  tel: string
  numeroAssurance: string | null
  notesMedicales: string | null
  traitements: string | null
  hospitalisations: string | null
  dossierMedicalId: number;  // Référence vers le dossier médical

}

export interface RendezVous {
  id?: number
  patientId: number
  personnelId: number
  dateHeure: string
  motif: string | null
}

export interface Personnel {
  id?: number
  nom: string
  prenom: string
  role: string
  specialite: string | null
  telephone: string
}

export interface Chambre {
  type: any
  id?: number
  numero: string
  capacite: number
  litsOccupes: number
}

export interface Materiel {
  id?: number
  nom: string
  quantite: number
  fournisseur: string
  dateEntree: string
  dateSortie: string | null
}

export interface Paiement {
  id?: number
  patientId: number
  chambreId: number
  montant: number
  datePaiement: string
  statut: string
}

export interface Assurance {
  id?: number
  nom: string
  typeAssurance: string
  couverture: string
}

export interface Hospitalisation {
  id?: number
  patientId: number
  chambreId: number
  motif: string | null
  dateEntree: string
  dateSortie: string | null
}


export interface Chambre {
  id?: number
  numero: string
  capacite: number
  lits_occupes: number
}


// Types pour le dossier médical

export interface DossierMedical {
  id: number;
  patientId: number;  // Lien vers le patient
  patientNom: string;  // Nom du patient
  patientPrenom: string;  // Prénom du patient
  medecinId: number;  // Lien vers le médecin traitant
  medecinNom: string;  // Nom du médecin traitant
  medecinPrenom: string;  // Prénom du médecin traitant
  antécédents: string;  // Antécédents médicaux
  allergies: string;    // Allergies
  diagnostics: string; // Diagnostics
  traitements: string; // Traitements
  dateCreation: string; // Date de création du dossier médical
}

export interface Garde {
  id?: number;            // ID de la garde (peut être optionnel lors de la création)
  personnelId: number;    // ID du personnel affecté à la garde
  dateDebut: string;      // Date de début de la garde (au format 'YYYY-MM-DD')
  dateFin: string;        // Date de fin de la garde (au format 'YYYY-MM-DD')
}
