# Gestion d’Hôpital – Projet Scala
Ce projet est une application de gestion hospitalière développée avec Play Framework (backend Scala) et Next.js (frontend React).
Elle permet de gérer les patients, les personnels, les ressources matérielles.

##  Installation
### Prérequis
* Node.js >= 16.x
* npm ou yarn
* sbt
* Scala
* PostgreSQL (ou votre SGBD)
* Git

### 1. Cloner le projet
git clone https://github.com/RamatoulayeCamara/Projet_scala_gestion_Hopital.git
```
cd Projet_scala_gestion_Hopital
```

### 2. Base de données
+ Étape 1 : Créer la base de données
  Lancez PostgreSQL (ou votre système de gestion de base de données) et exécutez :
  ```
   CREATE DATABASE bdd_werral_ak_jamm;
  ```
+ Étape 2 : Importer le script SQL
  Dans le dossier database/, un fichier bdd_werral_ak_jamm contient toute la structure et les données :
 ```  psql -U postgres -d hopitaldb -f database/ bdd_werral_ak_jamm.sql ```
+  Étape 3 : Configuration dans le backend
  Dans backend/conf/application.conf :

```
db.default.driver=org.postgresql.Driver
db.default.url="jdbc:postgresql://localhost:5432/hopitaldb"
db.default.username="postgres"
db.default.password="votre_mot_de_passe"
```
### 3. Lancer le backend (Play Framework)
```
cd backend
sbt run
```

###  4. Lancer le frontend (React / Next.js)
```
cd ../frontend
npm install --legacy-peer-deps
npm run dev
```
##  Utilisation
+ Frontend : http://localhost:3000
+ Backend API : http://localhost:9000

## Commandes utiles
Frontend (Next.js)
```
npm run dev        # Démarrage en mode dev
npm run build      # Build production
npm run start      # Serveur en prod

```
## Backend (sbt)

```
sbt run
sbt compile
sbt test

```



