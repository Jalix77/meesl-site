# Mission Église Évangélique Sel et Lumière (MEESL) Website

Une application Next.js complète pour la gestion de l'église avec site public et système d'administration.

## 🚀 Setup Instructions

### 1. Configuration de la base de données

1. Créez un compte sur [Neon](https://neon.tech)
2. Créez une nouvelle base de données PostgreSQL
3. Copiez la chaîne de connexion POOLED (contient "-pooler")
4. Mettez à jour le fichier `.env`:

```env
DATABASE_URL="postgresql://username:password@host-pooler/dbname?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="meesl-secret-key-change-in-production"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 2. Installation

```bash
npm install
```

### 3. Base de données

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Démarrage

```bash
npm run dev
```

L'application sera disponible sur http://localhost:3000

## 📋 Fonctionnalités

### Site Public
- 🏠 Page d'accueil avec présentation de l'église
- 📅 Planification de visites
- 📺 Regarder les cultes (placeholder)
- 💝 Instructions pour les dons
- ℹ️ Vision, mission, valeurs
- 📞 Contact et informations
- 📚 Ressources (logo, constitution)

### Portail Membres
- 🔐 Authentification sécurisée
- 👤 Gestion du profil
- 📅 Événements et inscriptions
- 👥 Groupes de participation
- 💰 Historique des dons
- 📊 Relevés de contribution
- 📖 Annuaire des membres

### Administration (Strong Admin v1)
- 👥 **Gestion des membres**: CRUD complet, recherche, réinitialisation mot de passe
- 💝 **Gestion des dons**: Suivi, création, modification, suppression
- 🎯 **Gestion des groupes**: Création, gestion des membres
- 📅 **Gestion des événements**: Organisation, inscriptions

## 🛠 Stack Technique

- **Frontend**: Next.js 14 (App Router), TypeScript
- **Authentification**: NextAuth.js (Credentials)
- **Base de données**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Validation**: Zod
- **Sécurité**: bcryptjs

## 🎨 Design

- **Couleurs**: Orange (#EF7F1D), Noir (#030101), Offwhite (#EDE1D3), Brown (#4E3624)
- **Responsive**: Mobile-first
- **Langue**: Français (FR)

## 📁 Structure du Projet

```
├── app/
│   ├── (public pages)/
│   ├── mon-compte/          # Portail membres
│   ├── admin/               # Administration
│   ├── api/                 # API routes
│   └── login/               # Authentification
├── lib/
│   ├── auth.ts              # NextAuth config
│   └── prisma.ts            # Prisma client
├── prisma/
│   └── schema.prisma        # Base de données
└── public/                  # Assets statiques
```

## 🔐 Rôles et Permissions

- **member**: Accès au portail membre
- **leader**: Accès étendu (future)
- **admin**: Accès complet à l'administration

## 📞 Contact

- **Adresse**: 4, Delmas 48, Haïti
- **WhatsApp**: +509 37 97 1717
- **Email**: contact@meesl.org

## 🙏 Horaires des Cultes

- **Lundi**: 5h–7h PM (Prière)
- **Mercredi**: 5h–7h PM (Étude Biblique)
- **Dimanche**: 7h–8h AM (Leçon dominicale)
- **Dimanche**: 8h30–10h30 AM (Culte dominical)

---

Développé avec ❤️ pour Mission Église Évangélique Sel et Lumière
