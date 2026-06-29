# Exigences surlignées en bleu (cyan) dans le sujet — correspondance avec le backend

Ce dossier répertorie les 4 points du sujet `Examen_Final_NestJS_API_REST.pdf` qui sont
surlignés en **bleu cyan** (page 1), et montre précisément où et comment chacun est
implémenté dans le projet `movia-backend`. Chaque point a été vérifié à la fois dans le
code du backend et en croisant les DTO avec les vraies interfaces TypeScript du frontend
Movia Automobile (`VehiculesSection.tsx`, `AdminDashboard.tsx`, `ClientProfile.tsx`).

Capture de la page 1 du sujet avec les surlignages : voir `sujet-page-1-surlignages.png`
dans ce même dossier.

> Rappel des couleurs du sujet (pour situer le bleu par rapport au reste) :
> - **Jaune** : NestJS, base de données, entités TypeORM, CRUD
> - **Vert** : JWT, RBAC, routes protégées par rôle
> - **Bleu (cyan)** : les 4 points ci-dessous
> - **Rouge** : consommation de l'API par le frontend + intégration API externe

---

## 1. "Valider les données avec les DTO et class-validator"

**Statut : fait.**

Chaque ressource a ses propres DTO d'entrée, tous basés sur `class-validator` :

| DTO | Fichier |
|---|---|
| `RegisterDto`, `LoginDto` | `src/auth/dto/register.dto.ts`, `src/auth/dto/login.dto.ts` |
| `UpdateProfileDto` | `src/users/dto/update-profile.dto.ts` |
| `CreateVehiculeDto`, `UpdateVehiculeDto` | `src/vehicules/dto/create-vehicule.dto.ts`, `update-vehicule.dto.ts` |
| `CreateReservationDto`, `UpdateReservationStatutDto` | `src/reservations/dto/*.ts` |

Décorateurs utilisés : `@IsEmail`, `@IsNotEmpty`, `@MinLength`, `@IsInt`, `@Min`,
`@IsEnum`, `@IsArray`, `@IsOptional`, `@IsBoolean`, `@IsString`.

La validation est activée **globalement** dans `src/main.ts` via :

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,            // retire les champs non déclarés dans le DTO
    forbidNonWhitelisted: true, // rejette la requête si un champ inconnu est envoyé
    transform: true,            // convertit automatiquement les types (ex: string -> number)
  }),
);
```

Concrètement : si on envoie un email invalide à `/auth/register`, ou un champ
supplémentaire non prévu, l'API répond automatiquement avec un code `400 Bad Request`
et le détail de l'erreur, sans qu'on ait à coder cette vérification manuellement
dans chaque contrôleur.

### Vérification croisée : DTO vs interfaces réelles du frontend

Pour s'assurer que les DTO ne sont pas de simples validateurs génériques mais collent
réellement aux besoins du projet, chaque DTO a été comparé champ par champ avec
l'interface TypeScript correspondante côté frontend.

| Interface frontend | Fichier source | DTO backend correspondant | Résultat |
|---|---|---|---|
| `Vehicule` | `src/landing/VehiculesSection.tsx` | `CreateVehiculeDto` | ✅ Tous les champs (`nom`, `categorie`, `places`, `carburant`, `boite`, `annee`, `moteur`, `vitesseMax`, `puissance`, `acceleration`, `usageIdeal`, `pointsForts`, `statut`, `prixLocation`, `prixAchat`, `image`) sont présents et validés |
| `Reservation` | `src/pages/AdminDashboard.tsx` | `CreateReservationDto` / `UpdateReservationStatutDto` | ✅ Tous les champs métier (`type`, `nom`, `telephone`, `email`, `dateDebut`, `dateFin`, `adresse`, `statut`, `modePaiement`, `numeroTransaction`, `paiementValide`, `whatsappEnvoye`) sont couverts |
| `ClientProfileData` | `src/pages/ClientProfile.tsx` | `UpdateProfileDto` | ✅ `nom`, `email`, `telephone` présents |

**Différence volontaire constatée** : le frontend stocke chaque réservation avec les
champs `vehicule` (string) et `image`/`categorie` dupliqués directement dans l'objet
(puisqu'il n'utilisait que `localStorage`, sans relation entre tables). Le backend, lui,
utilise une vraie relation `ManyToOne` vers l'entité `Vehicule` (`reservation.vehicule.id`)
plutôt que de dupliquer ces informations. Cette différence est volontaire et va dans le
sens du point bleu n°2 (architecture propre) : elle évite la duplication de données et
les incohérences si un véhicule est modifié après une réservation.

**Petite note de nommage à garder en tête** : le frontend écrit `numerotransaction`
(tout en minuscule) alors que le backend utilise `numeroTransaction` (camelCase,
cohérent avec le reste du projet). Cette différence est sans impact sur la qualité du
backend lui-même, mais devra être prise en compte lors de la connexion du frontend à
l'API (mapping du nom de champ).

---

## 2. "Respecter une architecture propre et modulaire"

**Statut : fait.**

Le projet est découpé en **6 modules NestJS indépendants**, un par ressource métier,
chacun avec la même structure interne (entité / DTO / service / contrôleur) :

```
src/
├── auth/             -> inscription, connexion, JWT, guards, decorators
├── users/             -> profil utilisateur, gestion des comptes
├── vehicules/         -> catalogue de véhicules
├── reservations/      -> location / achat
├── notifications/     -> alertes admin
├── exchange-rate/     -> appel API externe ExchangeRate
└── common/enums/      -> enums partagés (Role, StatutVehicule, etc.)
```

Principes respectés :
- **Séparation des responsabilités** : un `Service` ne contient que la logique métier
  (accès aux données, règles), un `Controller` ne fait que router la requête HTTP vers
  le service et appliquer les guards. Aucune logique métier n'est dans un contrôleur.
- **Modules autonomes et réutilisables** : chaque module exporte son service
  (`exports: [...]`) pour être réutilisé par un autre module sans dépendance circulaire
  (ex : `ReservationsModule` importe `VehiculesModule`, `UsersModule` et
  `NotificationsModule` pour orchestrer la création d'une réservation).
- **Un seul point d'entrée global** : `AppModule` (`src/app.module.ts`) assemble tous
  les modules et configure TypeORM une seule fois.

---

## 3. "Gérer correctement les erreurs et les codes HTTP"

**Statut : fait.**

Chaque service lève une exception NestJS adaptée à la situation, ce qui produit
automatiquement le bon code HTTP :

| Exception | Code HTTP | Exemple dans le code |
|---|---|---|
| `BadRequestException` | 400 | `reservations.service.ts` : dates manquantes pour une location, adresse manquante pour un achat |
| `UnauthorizedException` | 401 | `auth.service.ts` : email ou mot de passe incorrect |
| `ForbiddenException` | 403 | `roles.guard.ts` : rôle insuffisant ; `reservations.service.ts` : un client tente de consulter la réservation d'un autre client |
| `NotFoundException` | 404 | `users.service.ts`, `vehicules.service.ts`, `reservations.service.ts`, `notifications.service.ts` : ressource introuvable par id |
| `ConflictException` | 409 | `users.service.ts` : inscription avec un email déjà utilisé |
| `BadGatewayException` | 502 | `exchange-rate.service.ts` : l'API externe ExchangeRate est inaccessible |

Tous les messages d'erreur sont rédigés en français pour rester cohérents avec le
reste de l'application.

---

## 4. "Documenter les endpoints principaux"

**Statut : fait (mis à jour).**

Deux niveaux de documentation sont fournis :

1. **README.md** (racine du projet) : tableau complet de tous les endpoints avec
   méthode, route, niveau d'accès et description, plus des exemples `curl`.

2. **Documentation interactive Swagger** (ajoutée pour renforcer ce point) :
   - Configurée dans `src/main.ts` via `@nestjs/swagger`.
   - Accessible une fois le serveur démarré sur :
     **`http://localhost:3000/api/docs`**
   - Chaque contrôleur est annoté avec `@ApiTags`, `@ApiOperation`, `@ApiResponse`.
   - Chaque DTO est annoté avec `@ApiProperty` / `@ApiPropertyOptional` (exemples de
     valeurs inclus), donc Swagger affiche directement un exemple de corps de requête
     prêt à tester.
   - Le bouton **"Authorize"** de Swagger permet de coller le token JWT reçu via
     `/auth/login` et de tester directement les routes protégées (clic sur "Try it out").

Pour l'examen, ouvrir `http://localhost:3000/api/docs` permet de montrer
**en direct** tous les endpoints, leurs paramètres, et de les exécuter devant le
correcteur sans avoir besoin de Postman.

---

## Récapitulatif rapide

| # | Exigence (bleu) | Fichier(s) clé(s) | Statut |
|---|---|---|---|
| 1 | DTO + class-validator (vérifié contre les interfaces frontend) | `*/dto/*.dto.ts`, `main.ts` (ValidationPipe) | ✅ |
| 2 | Architecture propre et modulaire | `src/*/` (6 modules), `app.module.ts` | ✅ |
| 3 | Gestion des erreurs et codes HTTP | `*.service.ts` (exceptions NestJS) | ✅ |
| 4 | Documentation des endpoints | `README.md` + Swagger (`/api/docs`) | ✅ |
