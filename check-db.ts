import { PrismaClient } from '@prisma/client'

// Créer un client Prisma pour trouver la vraie chaîne de connexion
const prisma = new PrismaClient()

async function findDatabaseUrl() {
  try {
    // Tenter de se connecter pour voir si ça fonctionne
    await prisma.user.findFirst()
    console.log('✅ Base de données accessible')
    
    // La connexion fonctionne, donc le DATABASE_URL est correct
    console.log('🔗 DATABASE_URL est configuré correctement')
    
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('❌ Erreur de connexion à la base de données:', message)
    console.log('💡 Solution: Mettez à jour le DATABASE_URL dans .env.local avec la vraie chaîne de connexion Neon')
  } finally {
    await prisma.$disconnect()
  }
}

findDatabaseUrl()
