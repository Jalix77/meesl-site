import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function checkAndResetPassword() {
  try {
    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email: 'meesl1410@gmail.com' }
    })

    if (!user) {
      console.log('❌ Utilisateur non trouvé')
      return
    }

    console.log('✅ Utilisateur trouvé:', user.name)
    console.log('📧 Email:', user.email)
    console.log('🔐 Rôle:', user.role)
    console.log('🔑 Hash actuel:', user.passwordHash.substring(0, 20) + '...')

    // Test de mot de passe courant
    const testPasswords = ['admin123', 'password', '123456', 'meesl123']
    
    for (const testPwd of testPasswords) {
      const isValid = await bcrypt.compare(testPwd, user.passwordHash)
      if (isValid) {
        console.log(`✅ Mot de passe trouvé: "${testPwd}"`)
        return
      }
    }

    console.log('❌ Aucun mot de passe testé ne fonctionne')
    
    // Réinitialiser avec "admin123"
    const newPassword = 'admin123'
    const newHash = await bcrypt.hash(newPassword, 10)
    
    await prisma.user.update({
      where: { email: 'meesl1410@gmail.com' },
      data: { passwordHash: newHash }
    })
    
    console.log('🔄 Mot de passe réinitialisé à:', newPassword)
    console.log('🔑 Nouveau hash:', newHash.substring(0, 20) + '...')

  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAndResetPassword()
