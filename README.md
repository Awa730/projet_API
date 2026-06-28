# Movia Automobile - Backend API REST (NestJS)

Backend de l'application **Movia Automobile** (location et vente de véhicules), réalisé pour l'examen final API REST de M. Soumaré (Licence 2 GI - UNIPRO).

## Stack technique

- **NestJS 11** + TypeScript
- **TypeORM** + **MySQL**
- **JWT** (authentification) + **RBAC** (autorisation par rôle : `admin` / `client`)
- **class-validator** / **class-transformer** (validation des DTO)
- **API externe** : [REST Countries](https://restcountries.com) — affiche le pays d'origine de la marque de chaque véhicule

## Architecture des modules

```
src/
├── auth/             # inscription, connexion, JWT, guards, decorators
├── users/            # entité User, profil client/admin
├── vehicules/        # entité Vehicule, CRUD, intégration Countries
├── reservations/     # entité Reservation, logique location/achat
├── notifications/    # entité Notification, alertes admin
├── countries/        # appel API externe REST Countries
├── common/enums/     # Role, TypeReservation, StatutReservation, StatutVehicule
└── database/seed.ts  # script d'initialisation des données
```

Chaque entité et chaque champ a été repris directement des interfaces TypeScript du frontend (`VehiculesSection.tsx`, `AdminDashboard.tsx`, `ClientProfile.tsx`, `SignUp.tsx`) pour garantir une compatibilité directe.

## Installation

### 1. Prérequis
- Node.js ≥ 18
- MySQL installé et démarré (WAMP, XAMPP, MySQL Workbench, ou service Windows)

### 2. Installer les dépendances

```bash
cd movia-backend
npm install
```

### 3. Configurer la base de données

Crée une base vide dans MySQL :

```sql
CREATE DATABASE movia_db;
```

Copie le fichier `.env.example` en `.env` et adapte les valeurs à ta configuration MySQL locale :

```bash
cp .env.example .env
```

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=ton_mot_de_passe
DB_NAME=movia_db

JWT_SECRET=une_phrase_secrete_a_toi
JWT_EXPIRES_IN=1d

PORT=3000
NODE_ENV=development
```

### 4. Démarrer le serveur

```bash
npm run start:dev
```

Au premier démarrage, `synchronize: true` crée automatiquement toutes les tables dans `movia_db` à partir des entités TypeORM. L'API est alors disponible sur :

```
http://localhost:3000/api
```

### 5. Insérer les données de test (recommandé)

Une fois le serveur démarré (les tables sont créées), lance dans un **autre terminal** :

```bash
npm run seed
```

Cela insère :
- Les **9 véhicules** déjà présents dans `VehiculesSection.tsx` (BMW X3, Haval H6, Mercedes GLE Coupé, etc.) avec leur pays d'origine
- Un compte **admin** de test :
  - Email : `admin@movia.sn`
  - Mot de passe : `Admin123!`

## Endpoints principaux

Toutes les routes sont préfixées par `/api`.

> 📘 **Documentation interactive Swagger** : une fois le serveur démarré, ouvre
> **http://localhost:3000/api/docs** pour voir et tester tous les endpoints directement
> depuis le navigateur (avec bouton "Authorize" pour coller ton token JWT).

### Auth (publiques)
| Méthode | Route | Description |
|---|---|---|
| POST | `/auth/register` | Inscription client (correspond à `SignUp.tsx`) |
| POST | `/auth/login` | Connexion client ou admin (correspond à `LoginForm.tsx`) |

### Utilisateurs
| Méthode | Route | Accès | Description |
|---|---|---|---|
| GET | `/users/me` | Connecté | Profil de l'utilisateur connecté |
| PATCH | `/users/me` | Connecté | Mise à jour du profil (`ClientProfile.tsx`) |
| GET | `/users` | Admin | Liste de tous les utilisateurs |
| GET | `/users/:id` | Admin | Détail d'un utilisateur |
| DELETE | `/users/:id` | Admin | Suppression d'un compte |

### Véhicules
| Méthode | Route | Accès | Description |
|---|---|---|---|
| GET | `/vehicules` | Public | Liste des véhicules (`VehiculesSection.tsx`) |
| GET | `/vehicules/:id` | Public | Détail d'un véhicule |
| GET | `/vehicules/:id/origine` | Public | Détail du véhicule + infos pays d'origine (API REST Countries) |
| POST | `/vehicules` | Admin | Création d'un véhicule |
| PATCH | `/vehicules/:id` | Admin | Mise à jour |
| DELETE | `/vehicules/:id` | Admin | Suppression |

### Réservations
| Méthode | Route | Accès | Description |
|---|---|---|---|
| POST | `/reservations` | Connecté | Création (location ou achat) |
| GET | `/reservations/me` | Connecté | Mes réservations (`UserDashboard.tsx`) |
| GET | `/reservations` | Admin | Toutes les réservations (`AdminDashboard.tsx`) |
| GET | `/reservations/:id` | Connecté | Détail (client = ses réservations, admin = toutes) |
| PATCH | `/reservations/:id` | Admin | Mise à jour statut / validation paiement |
| DELETE | `/reservations/:id` | Admin | Suppression |

### Notifications (admin uniquement)
| Méthode | Route | Description |
|---|---|---|
| GET | `/notifications` | Notifications de l'admin connecté |
| PATCH | `/notifications/:id/lu` | Marquer comme lue |

### Pays (API externe)
| Méthode | Route | Description |
|---|---|---|
| GET | `/countries/:code` | Infos pays via REST Countries (ex: `/countries/DE`) |

## Authentification

Toutes les routes sont protégées par défaut par un guard JWT global, sauf celles marquées `@Public()`.

Pour appeler une route protégée, ajoute le header :

```
Authorization: Bearer <token reçu lors du login>
```

## Exemple de flux complet (avec curl)

```bash
# 1. Connexion admin
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@movia.sn","password":"Admin123!"}'

# 2. Récupérer la liste des véhicules (public, pas besoin de token)
curl http://localhost:3000/api/vehicules

# 3. Voir le pays d'origine d'un véhicule (ex: id=1, BMW X3 -> Allemagne)
curl http://localhost:3000/api/vehicules/1/origine
```

## Connexion avec le frontend Movia Automobile

Le frontend (`mc-react` / Vite) doit appeler `http://localhost:3000/api` au lieu de lire les données depuis `localStorage`. Concrètement :

- `SignUp.tsx` → `POST /api/auth/register`
- `LoginForm.tsx` → `POST /api/auth/login`
- `VehiculesSection.tsx` → `GET /api/vehicules` (remplace le tableau statique `vehicules`)
- `ClientProfile.tsx` → `GET /api/users/me` et `PATCH /api/users/me`
- `UserDashboard.tsx` → `GET /api/reservations/me`
- `AdminDashboard.tsx` → `GET /api/reservations`, `PATCH /api/reservations/:id`, `GET /api/notifications`

Le token JWT renvoyé par `/auth/login` doit être stocké (par exemple dans `localStorage` côté frontend) puis renvoyé dans le header `Authorization` de chaque requête protégée.

## Suivi des exigences du sujet (points surlignés en bleu)

Le dossier `docs-examen/exigences-surlignees-bleu/` contient le détail de
correspondance entre les 4 points surlignés en bleu cyan dans le sujet
(DTO/class-validator, architecture modulaire, gestion des erreurs/codes HTTP,
documentation des endpoints) et leur implémentation précise dans ce projet
(fichiers, extraits de code, capture du sujet).

## Notes pour la soutenance

- **RBAC** : implémenté via `RolesGuard` + decorator `@Roles(Role.ADMIN)`, appliqué globalement en complément du `JwtAuthGuard`.
- **Validation** : chaque DTO utilise `class-validator` ; le `ValidationPipe` global est configuré avec `whitelist` et `forbidNonWhitelisted` pour rejeter les champs non prévus.
- **Architecture modulaire** : un module NestJS par ressource métier (`users`, `vehicules`, `reservations`, `notifications`, `countries`, `auth`), avec séparation entité / DTO / service / contrôleur.
- **Gestion des erreurs** : `NotFoundException` (404), `ConflictException` (409 — email déjà utilisé), `ForbiddenException` (403 — accès refusé), `BadRequestException` (400 — données incohérentes, ex. dates manquantes pour une location).
- **API externe** : `CountriesService` encapsule l'appel HTTP vers REST Countries via `HttpModule` (axios), avec gestion d'erreur dédiée (`BadGatewayException` si l'API externe est indisponible).
