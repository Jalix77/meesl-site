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

// GET - Get current user's donations
export async function GET(request: NextRequest) {
  const authError = await verifyAuth()
  if (authError) return authError

  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where: { userId: session!.user.id },
        orderBy: { donatedAt: 'desc' },
        skip: offset,
        take: limit
      }),
      prisma.donation.count({
        where: { userId: session!.user.id }
      })
    ])

    return NextResponse.json({
      donations,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Me donations GET error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
