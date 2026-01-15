import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schema for creating donations
const createDonationSchema = z.object({
  userId: z.string(),
  amountHTG: z.number().optional(),
  amountUSD: z.number().optional(),
  method: z.string(),
  reference: z.string().optional(),
  donatedAt: z.string().datetime().optional(),
  note: z.string().optional()
}).refine(data => data.amountHTG || data.amountUSD, {
  message: "Au moins un montant (HTG ou USD) doit être spécifié"
})

// Schema for updating donations
const updateDonationSchema = z.object({
  amountHTG: z.number().optional(),
  amountUSD: z.number().optional(),
  method: z.string().optional(),
  reference: z.string().optional(),
  note: z.string().optional()
}).refine(data => data.amountHTG || data.amountUSD, {
  message: "Au moins un montant (HTG ou USD) doit être spécifié"
})

// Verify admin session
async function verifyAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }
  return null
}

// GET - List all donations
export async function GET(request: NextRequest) {
  const authError = await verifyAdmin()
  if (authError) return authError

  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    const where: any = {}

    if (userId) {
      where.userId = userId
    }

    if (startDate || endDate) {
      where.donatedAt = {}
      if (startDate) {
        where.donatedAt.gte = new Date(startDate)
      }
      if (endDate) {
        where.donatedAt.lte = new Date(endDate)
      }
    }

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: { donatedAt: 'desc' },
        skip: offset,
        take: limit
      }),
      prisma.donation.count({ where })
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
    console.error('Donations GET error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST - Create new donation
export async function POST(request: NextRequest) {
  const authError = await verifyAdmin()
  if (authError) return authError

  try {
    const body = await request.json()
    const validation = createDonationSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { userId, amountHTG, amountUSD, method, reference, donatedAt, note } = validation.data

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Utilisateur non trouvé' },
        { status: 404 }
      )
    }

    // Create donation
    const donation = await prisma.donation.create({
      data: {
        userId,
        amountHTG: amountHTG || null,
        amountUSD: amountUSD || null,
        method,
        reference: reference || null,
        donatedAt: donatedAt ? new Date(donatedAt) : new Date(),
        note: note || null
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json({ donation }, { status: 201 })
  } catch (error) {
    console.error('Donations POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
