import type { Patient, RendezVous, Personnel ,Chambre, Paiement, Materiel, DossierMedical } from "@/types" 

// API Patients
export async function fetchPatients(): Promise<Patient[]> {
  const res = await fetch("http://localhost:9000/patients")  // URL statique
  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`)
  }
  return res.json()  // Retourne les données JSON
}

export async function fetchPatient(id: number): Promise<Patient> {
  const res = await fetch(`http://localhost:9000/patients/${id}`)
  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`)
  }
  return res.json()  // Retourne le patient avec cet ID
}

export async function createPatient(patient: Partial<Patient>): Promise<Patient> {
  const res = await fetch("http://localhost:9000/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patient),
  })
  
  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`)
  }

  return res.json()  // Retourne le patient créé
}

export async function updatePatient(id: number, patient: Partial<Patient>): Promise<Patient> {
  const res = await fetch(`http://localhost:9000/patients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patient),
  })

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`)
  }

  return res.json()  // Retourne le patient mis à jour
}

export async function deletePatient(id: number): Promise<void> {
  const res = await fetch(`http://localhost:9000/patients/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`)
  }

  return Promise.resolve()  // Aucune donnée retournée après la suppression
}

// API Rendez-vous
export async function fetchRendezVous(): Promise<RendezVous[]> {
  const res = await fetch("http://localhost:9000/rendezvous")
  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`)
  }
  return res.json()  // Retourne la liste des rendez-vous
}

export async function fetchRendezVousByPatient(patientId: number): Promise<RendezVous[]> {
  const res = await fetch(`http://localhost:9000/rendezvous/patient/${patientId}`)
  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`)
  }
  return res.json()  // Retourne la liste des rendez-vous d'un patient
}

export async function fetchRendezVousByMedecin(personnelId: number): Promise<RendezVous[]> {
  const res = await fetch(`http://localhost:9000/rendezvous/medecin/${personnelId}`)
  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`)
  }
  return res.json()  // Retourne la liste des rendez-vous d'un médecin
}

export async function deleteRendezVous(id: number): Promise<void> {
  const res = await fetch(`http://localhost:9000/rendezvous/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`)
  }

  return Promise.resolve()  // Aucune donnée retournée après la suppression
}

// API Personnel
export async function fetchPersonnels(): Promise<Personnel[]> {
  const res = await fetch("http://localhost:9000/personnel")
  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`)
  }
  return res.json()  // Retourne la liste du personnel
}

export async function fetchPersonnel(id: number): Promise<Personnel> {
  const res = await fetch(`http://localhost:9000/personnel/${id}`)
  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`)
  }
  return res.json()  // Retourne un personnel par son ID
}

export async function fetchPersonnelsByRole(role: string): Promise<Personnel[]> {
  const res = await fetch(`http://localhost:9000/personnel/role/${role}`)
  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`)
  }
  return res.json()  // Retourne la liste du personnel selon son rôle
}

// @/lib/api.ts
export async function createPersonnel(personnel: Partial<Personnel>): Promise<Personnel> {
  const res = await fetch("http://localhost:9000/personnel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(personnel),
  });

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`);
  }

  return res.json(); // Retourne le personnel créé
}


export async function deletePersonnel(id: number): Promise<void> {
  const res = await fetch(`http://localhost:9000/personnel/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error(`Erreur API: ${res.status}`)
  }

  return Promise.resolve()  // Aucune donnée retournée après la suppression
}

// API Chambres

// lib/api.ts

// Fonction pour récupérer toutes les chambres
export async function fetchChambres(): Promise<Chambre[]> {
  const res = await fetch('http://localhost:9000/chambres');
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json();  // Retourne les données JSON
}

// Fonction pour ajouter une chambre
export async function createChambre(chambre: { numero: string, capacite: number, lits_occupes: number }): Promise<Chambre> {
  const res = await fetch('http://localhost:9000/chambres', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(chambre),
  });
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json(); // Retourne la chambre créée
}

// Fonction pour supprimer une chambre
export async function deleteChambre(id: number): Promise<void> {
  const res = await fetch(`http://localhost:9000/chambres/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json();
}

// Fonction pour modifier une chambre
export async function updateChambre(id: number, chambre: { numero: string, capacite: number, lits_occupes: number }): Promise<Chambre> {
  const res = await fetch(`http://localhost:9000/chambres/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(chambre),
  });
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json();
}


// API Paiement
// Fonction pour récupérer tous les paiements
export async function fetchPaiements(): Promise<Paiement[]> {
  const res = await fetch('http://localhost:9000/paiements');
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json();  // Retourner les paiements au format JSON
}
// Fonction pour ajouter un paiement
export async function createPaiement(paiement: { montant: number, date: string, patientId: number }): Promise<Paiement> {
  const res = await fetch('http://localhost:9000/paiements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },    
    body: JSON.stringify(paiement),
  });
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json();  // Retourner le paiement créé au format JSON
}
// Fonction pour supprimer un paiement
export async function deletePaiement(id: number): Promise<void> {
  const res = await fetch(`http://localhost:9000/paiements/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json();  // Retourner le paiement supprimé au format JSON
}
// Fonction pour modifier un paiement
export async function updatePaiement(id: number, paiement: { montant: number, date: string, patientId: number }): Promise<Paiement> {
  const res = await fetch(`http://localhost:9000/paiements/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paiement),
  });
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json();  // Retourner le paiement modifié au format JSON
}

// API materiels
// Fonction pour récupérer tous les matériels
// API pour gérer les matériels

// Fonction pour récupérer tous les matériels
export async function fetchMateriels(): Promise<Materiel[]> {
  const res = await fetch('http://localhost:9000/materiels');
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json();  // Retourne les matériaux en JSON
}

// Fonction pour récupérer un matériel spécifique par ID
export async function fetchMateriel(id: number): Promise<Materiel> {
  const res = await fetch(`http://localhost:9000/materiels/${id}`);
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json();  // Retourne le matériel avec cet ID
}

// Fonction pour créer un nouveau matériel
export async function createMateriel(materiel: Partial<Materiel>): Promise<Materiel> {
  const res = await fetch('http://localhost:9000/materiels', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(materiel),
  });
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json();  // Retourne le matériel créé
}

// Fonction pour mettre à jour un matériel
export async function updateMateriel(id: number, materiel: Materiel): Promise<Materiel> {
  const res = await fetch(`http://localhost:9000/materiels/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(materiel),
  });
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json();  // Retourne le matériel mis à jour
}

// Fonction pour supprimer un matériel
export async function deleteMateriel(id: number): Promise<void> {
  const res = await fetch(`http://localhost:9000/materiels/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json();
}




// API Dossier Médical
// api.ts


// Fonction pour récupérer le dossier médical avec les informations du patient et du médecin
export async function fetchDossierMedical(patientId: number): Promise<DossierMedical> {
  const res = await fetch(`http://localhost:9000/dossier-medical/${patientId}`);
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);

  const data = await res.json();

  // Récupérer les informations supplémentaires du patient et du médecin
  const patient: Patient = await fetch(`http://localhost:9000/patients/${data.patientId}`).then(res => res.json());
  const medecin: Personnel = await fetch(`http://localhost:9000/medecins/${data.medecinId}`).then(res => res.json());

  return {
    ...data,
    patientNom: patient.nom,
    patientPrenom: patient.prenom,
    medecinNom: medecin.nom,
    medecinPrenom: medecin.prenom,
  };
}


// API hospitalisations

export async function fetchHospitalisations(): Promise<any[]> {
  const res = await fetch('http://localhost:9000/hospitalisations');  // Assurez-vous que cette URL correspond à votre API backend
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json();  // Retourne la liste des hospitalisations
}

// API gardes
import type { Garde } from "@/types";

// Fonction pour récupérer toutes les gardes
export async function fetchGardes(): Promise<Garde[]> {
  const res = await fetch('http://localhost:9000/gardes');
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json();
}

// Fonction pour récupérer les gardes d'un personnel par ID
export async function fetchGardesByPersonnel(personnelId: number): Promise<Garde[]> {
  const res = await fetch(`http://localhost:9000/gardes/personnel/${personnelId}`);
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json();
}

// Fonction pour ajouter une garde
export async function addGarde(garde: { personnelId: number, dateDebut: string, dateFin: string }): Promise<Garde> {
  const res = await fetch('http://localhost:9000/gardes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(garde),
  });
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
  return res.json();
}

// Fonction pour supprimer une garde
export async function deleteGarde(id: number): Promise<void> {
  const res = await fetch(`http://localhost:9000/gardes/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
}




// Fonction générique pour récupérer une API avec des requêtes personnalisées
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(endpoint, options)

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`)
  }

  return response.json()
}
