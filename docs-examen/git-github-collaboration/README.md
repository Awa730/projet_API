# Git, GitHub et Collaboration — Commandes Git Flow

Cette section du sujet (texte noir, non surligné, mais distincte des points en bleu)
demande :
- Utiliser Git pour le versionnement
- Héberger le projet sur GitHub
- Respecter les principes de Git Flow
- Produire des commits clairs et significatifs

Ce document donne **toutes les commandes prêtes à copier-coller**, dans l'ordre
d'exécution, pour le repo `movia-backend`.

---

## 0. Convention de commits utilisée

Tous les commits suivent le format **Conventional Commits** :

```
<type>(<portée>): <description courte au présent>
```

| Type | Usage |
|---|---|
| `feat` | nouvelle fonctionnalité |
| `fix` | correction de bug |
| `docs` | documentation uniquement |
| `chore` | tâche technique (config, dépendances, nettoyage) |
| `refactor` | changement de code sans nouvelle fonctionnalité ni correction |
| `test` | ajout/modification de tests |

C'est ce format qui rend les commits "clairs et significatifs" : on sait en une ligne
**quoi** a changé et **où**, sans avoir à ouvrir le diff.

---

## 1. Initialisation du repo local

```bash
cd movia-backend
git init
git branch -M main
```

## 2. Créer le repo distant sur GitHub

Sur [github.com](https://github.com) :
1. **New repository** → nom : `movia-backend`
2. Visibilité : **Public** (exigé par le sujet : "Lien GitHub (public)")
3. Ne **pas** cocher "Add README" (on a déjà le nôtre)
4. Créer le repo, puis relier le dépôt local :

```bash
git remote add origin https://github.com/TON-COMPTE/movia-backend.git
```

## 3. Premier commit sur `main` (socle du projet)

```bash
git add package.json package-lock.json tsconfig.json tsconfig.build.json nest-cli.json eslint.config.mjs .gitignore .env.example README.md
git commit -m "chore: initialisation du projet NestJS avec configuration de base"
git push -u origin main
```

## 4. Créer la branche `develop`

Principe Git Flow : `main` ne contient que des versions stables/releases,
tout le développement se fait sur `develop` et ses branches `feature/*`.

```bash
git checkout -b develop
git push -u origin develop
```

> Pense à passer `develop` en branche par défaut sur GitHub
> (**Settings → Branches → Default branch**), pour que la version la plus à jour
> soit ce que voit le correcteur en arrivant sur le repo.

## 5. Une branche `feature/*` par module, avec commits clairs

Chaque commande `git merge` utilise `--no-ff` pour **forcer un vrai commit de merge**
visible dans le graphe (sans `--no-ff`, Git ferait un simple "fast-forward" et
l'historique aurait l'air d'une seule ligne droite, sans embranchements Git Flow).

```bash
# --- Module Auth (JWT + RBAC) ---
git checkout develop
git checkout -b feature/auth-jwt
git add src/auth src/common/enums/role.enum.ts
git commit -m "feat(auth): inscription et connexion avec JWT"
git commit -m "feat(auth): guards JwtAuthGuard et RolesGuard pour le RBAC" --allow-empty
git checkout develop
git merge --no-ff feature/auth-jwt -m "Merge branch 'feature/auth-jwt' into develop"
git push origin develop
git push origin feature/auth-jwt

# --- Module Users ---
git checkout -b feature/users
git add src/users
git commit -m "feat(users): CRUD utilisateurs et gestion du profil client"
git checkout develop
git merge --no-ff feature/users -m "Merge branch 'feature/users' into develop"
git push origin develop

# --- Module Vehicules ---
git checkout -b feature/vehicules-crud
git add src/vehicules src/common/enums/statut-vehicule.enum.ts
git commit -m "feat(vehicules): CRUD vehicules avec validation des DTO"
git checkout develop
git merge --no-ff feature/vehicules-crud -m "Merge branch 'feature/vehicules-crud' into develop"
git push origin develop

# --- Module Reservations ---
git checkout -b feature/reservations
git add src/reservations src/common/enums/type-reservation.enum.ts src/common/enums/statut-reservation.enum.ts
git commit -m "feat(reservations): creation de reservations location et achat"
git commit -m "feat(reservations): calcul automatique du prix selon le type" --allow-empty
git checkout develop
git merge --no-ff feature/reservations -m "Merge branch 'feature/reservations' into develop"
git push origin develop

# --- Module Notifications ---
git checkout -b feature/notifications
git add src/notifications
git commit -m "feat(notifications): alertes admin lors d'une nouvelle reservation"
git checkout develop
git merge --no-ff feature/notifications -m "Merge branch 'feature/notifications' into develop"
git push origin develop

# --- Documentation Swagger ---
git checkout -b feature/swagger-docs
git add .
git commit -m "docs(api): documentation interactive Swagger sur /api/docs"
git checkout develop
git merge --no-ff feature/swagger-docs -m "Merge branch 'feature/swagger-docs' into develop"
git push origin develop

# --- Script de seed ---
git checkout -b feature/seed-data
git add src/database
git commit -m "feat(seed): script d'insertion des vehicules et du compte admin de test"
git checkout develop
git merge --no-ff feature/seed-data -m "Merge branch 'feature/seed-data' into develop"
git push origin develop
```

Pour rattraper tout fichier oublié en cours de route :

```bash
git add .
git status   # verifier ce qui reste avant de committer
git commit -m "chore: finalisation et nettoyage du projet"
git push origin develop
```

## 6. Corriger un bug découvert sur `develop` (exemple de `fix`)

Si tu corriges un souci après coup, même logique avec une branche dédiée :

```bash
git checkout develop
git checkout -b fix/validation-reservation-dates
# ... correction du code ...
git add src/reservations/reservations.service.ts
git commit -m "fix(reservations): corrige la validation des dates de location manquantes"
git checkout develop
git merge --no-ff fix/validation-reservation-dates -m "Merge branch 'fix/validation-reservation-dates' into develop"
git push origin develop
```

## 7. Release vers `main`

Une fois que `develop` est testé et stable, on livre une version :

```bash
git checkout main
git merge --no-ff develop -m "Merge branch 'develop' into main — version 1.0.0"
git push origin main

git tag -a v1.0.0 -m "Version 1.0.0 - API REST Movia Automobile (examen final)"
git push origin --tags
```

## 8. Vérifier que l'historique respecte bien Git Flow

```bash
git log --oneline --graph --all
```

Tu dois voir des branches qui partent de `develop`, repartent en `feature/*`,
et se re-mergent (embranchements visibles), **pas** une seule ligne droite.
Si c'est une ligne droite, relance les merges avec `--no-ff`.

---

## Récapitulatif des branches attendues sur GitHub

| Branche | Rôle |
|---|---|
| `main` | versions stables, prêtes à présenter (avec tags `vX.Y.Z`) |
| `develop` | branche d'intégration, code le plus à jour |
| `feature/auth-jwt` | authentification JWT + RBAC |
| `feature/users` | gestion utilisateurs/profil |
| `feature/vehicules-crud` | catalogue véhicules |
| `feature/reservations` | location/achat |
| `feature/notifications` | alertes admin |
| `feature/swagger-docs` | documentation Swagger |
| `feature/seed-data` | script de seed |

Conserver ces branches sur GitHub (ne pas les supprimer après merge) permet au
correcteur de voir directement, dans l'onglet **Branches** du repo, que le
découpage Git Flow a bien été respecté.
