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

// GET - Get current user's event registrations
export async function GET(request: NextRequest) {
  const authError = await verifyAuth()
  if (authError) return authError

  try {
    const session = await getServerSession(authOptions)
    
    const events = await prisma.event.findMany({
      where: {
        registrations: {
          some: {
            userId: session!.user.id
          }
        }
      },
      include: {
        _count: {
          select: {
            registrations: true
          }
        }
      },
      orderBy: { startAt: 'desc' }
    })

    return NextResponse.json({ events })
  } catch (error) {
    console.error('Me events GET error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
