import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Verify authenticated session
async function verifyAuth() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
  }
  return null
}

// GET - Get current user's groups
export async function GET(request: NextRequest) {
  const authError = await verifyAuth()
  if (authError) return authError

  try {
    const session = await getServerSession(authOptions)
    
    const groups = await prisma.group.findMany({
      where: {
        members: {
          some: {
            userId: session!.user.id
          }
        }
      },
      include: {
        _count: {
          select: {
            members: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ groups })
  } catch (error) {
    console.error('Me groups GET error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
