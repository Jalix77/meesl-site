import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schema for updating profile
const updateProfileSchema = z.object({
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  notes: z.string().optional()
})

// Verify authenticated session
async function verifyAuth() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }
  return null
}

// PATCH - Update user profile
export async function PATCH(request: NextRequest) {
  const authError = await verifyAuth()
  if (authError) return authError

  try {
    const session = await getServerSession(authOptions)
    const body = await request.json()
    const validation = updateProfileSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const updateData = validation.data

    // Update or create profile
    const profile = await prisma.profile.upsert({
      where: { userId: session!.user.id },
      update: updateData,
      create: {
        userId: session!.user.id,
        ...updateData
      }
    })

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Profile PATCH error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
