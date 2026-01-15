import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkAndUpdateUserRole() {
  try {
    // Récupérer tous les utilisateurs
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true
      }
    })

    console.log('📋 Utilisateurs trouvés:')
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Rôle: ${user.role} - Actif: ${user.isActive}`)
    })

    // Si vous voulez mettre à jour votre rôle en admin, décommentez et modifiez cette ligne:
    // await prisma.user.update({
    //   where: { email: 'votre-email@example.com' },
    //   data: { role: 'admin' }
    // })
    // console.log('✅ Rôle mis à jour en admin!')

  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAndUpdateUserRole()
