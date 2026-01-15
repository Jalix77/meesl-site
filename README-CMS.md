# MEESL - Système de Gestion de Contenu (CMS)

## 🎯 Objectif

Un CMS complet pour l'église MEESL permettant aux administrateurs de gérer tout le contenu du site sans éditer de code.

## 🚀 Fonctionnalités

### ✅ Gestion du Contenu
- **Pages dynamiques** - Modifier le contenu de toutes les pages
- **Sections réorganisables** - Ajouter, modifier, supprimer, réorganiser
- **Markdown supporté** - Éditer avec Markdown et aperçu en temps réel
- **Activation/Désactivation** - Activer ou désactiver des sections

### ✅ Gestion des Fichiers
- **Upload drag & drop** - Télécharger images et PDF
- **Bibliothèque de fichiers** - Gérer tous les médias
- **Support formats** - JPG, PNG, WebP, PDF
- **Limite 10MB** - Protection contre les gros fichiers

### ✅ Paramètres du Site
- **Informations de contact** - Adresse, téléphone, email
- **Horaires** - Configurer tous les services
- **Méthodes de don** - Unibank, MonCash, Natcash
- **Équipe de direction** - Gérer les leaders
- **Fichiers du site** - Logo et constitution PDF

### 🔐 Sécurité
- **Rôle admin requis** - Protection des routes admin
- **Middleware NextAuth** - Vérification côté serveur
- **Validation Zod** - Validation des entrées API

## 📋 Prérequis

- Node.js 18+
- PostgreSQL (Neon recommandé)
- Compte Vercel (pour Blob Storage)

## 🛠️ Installation

### 1. Cloner et installer
```bash
git clone <repository>
cd MEESL_Site
npm install
```

### 2. Configurer la base de données Neon
1. Créer un compte sur https://neon.tech
2. Créer une nouvelle base de données
3. Copier la chaîne de connexion avec pooling
4. Ajouter `?sslmode=require&pgbouncer=true` à la fin

### 3. Configurer Vercel Blob
1. Installer Vercel CLI: `npm i -g vercel`
2. Se connecter: `vercel login`
3. Créer un blob store: `vercel blob add`
4. Copier le token généré

### 4. Variables d'environnement
Copier `.env.example` vers `.env.local`:
```bash
cp .env.example .env.local
```

Configurer les variables:
```env
DATABASE_URL="postgresql://username:password@host-pooler/dbname?sslmode=require&pgbouncer=true"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="votre-secret-ici"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

### 5. Initialiser la base de données
```bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed-cms.ts
```

### 6. Démarrer l'application
```bash
npm run dev
```

## 👤 Accès Admin

### Créer un compte admin
1. S'inscrire sur `/register`
2. Mettre à jour le rôle dans la base de données:
```sql
UPDATE users SET role = 'admin' WHERE email = 'votre-email@example.com';
```

### Accéder au panneau admin
- URL: `/admin`
- Identifiants: Votre email/mot de passe admin

## 📚 Utilisation

### Gérer le contenu
1. **Liste des pages** - `/admin/contenu`
2. **Éditer une page** - `/admin/contenu/[slug]`
3. **Ajouter une section** - Bouton "Ajouter une section"
4. **Aperçu** - Toggle "Aperçu/Édition"

### Gérer les fichiers
1. **Bibliothèque** - `/admin/fichiers`
2. **Uploader** - Glisser-déposer ou cliquer
3. **Copier URL** - Bouton 📋 pour copier l'URL
4. **Supprimer** - Bouton 🗑️ avec confirmation

### Configurer les paramètres
1. **Paramètres** - `/admin/parametres`
2. **Contact** - Adresse, téléphone, email
3. **Horaires** - Tous les services
4. **Dons** - Méthodes de paiement
5. **Leadership** - Équipe de direction
6. **Fichiers** - Logo et constitution

## 🏗️ Architecture

### Base de données
- **Pages** - Structure des pages
- **PageSections** - Contenu des sections
- **SiteSettings** - Paramètres globaux
- **FileAssets** - Métadonnées des fichiers

### API Routes
- `/api/admin/pages` - Gestion des pages
- `/api/admin/settings` - Paramètres du site
- `/api/admin/files` - Upload et gestion des fichiers

### Composants Admin
- **Dashboard** - Vue d'ensemble
- **Content Editor** - Éditeur de contenu
- **File Manager** - Gestion des fichiers
- **Settings** - Configuration

## 🔧 Développement

### Structure des dossiers
```
app/
├── admin/           # Pages admin
│   ├── contenu/     # Gestion contenu
│   ├── fichiers/    # Gestion fichiers
│   └── parametres/  # Paramètres
├── api/
│   └── admin/       # API routes admin
└── components/      # Composants partagés
```

### Ajouter une nouvelle page
1. Créer la page dans `app/[slug]/page.tsx`
2. Ajouter au seed script si nécessaire
3. Le contenu sera gérable via l'admin

## 🚀 Déploiement

### Vercel (recommandé)
1. Connecter le repo à Vercel
2. Configurer les variables d'environnement
3. Déployer automatiquement

### Build
```bash
npm run build
npm start
```

## 🐛 Dépannage

### Erreurs communes
- **Prisma client** - Exécuter `npx prisma generate`
- **Base de données** - Vérifier `DATABASE_URL`
- **Blob token** - Configurer `BLOB_READ_WRITE_TOKEN`

### Logs
- Développement: Console du terminal
- Production: Vercel logs

## 📝 Notes

- Le contenu existant est préservé
- Fallback sur le contenu par défaut si DB vide
- Support multilingue préparé (français actuel)
- Responsive design pour mobile

## 🤝 Support

Pour toute question ou problème:
1. Vérifier les logs
2. Consulter la documentation
3. Contacter le développeur

---

**MEESL CMS** - Gérez votre site web comme un pro! 🚀
