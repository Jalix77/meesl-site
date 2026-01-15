import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

// Schema for password reset
const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères')
})

// Verify admin session
async function verifyAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }
  return null
}

// POST - Reset user password
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const authError = await verifyAdmin()
  if (authError) return authError

  try {
    const { id } = params
    const body = await request.json()
    const validation = resetPasswordSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { password } = validation.data

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(password, 10)

    // Update password
    await prisma.user.update({
      where: { id },
      data: { passwordHash }
    })

    return NextResponse.json({ message: 'Mot de passe réinitialisé avec succès' })
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
