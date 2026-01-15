import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schema for creating groups
const createGroupSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  description: z.string().optional()
})

// Schema for updating groups
const updateGroupSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional()
})

// Verify admin session
async function verifyAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }
  return null
}

// GET - List all groups
export async function GET(request: NextRequest) {
  const authError = await verifyAdmin()
  if (authError) return authError

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    const [groups, total] = await Promise.all([
      prisma.group.findMany({
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            }
          },
          _count: {
            select: {
              members: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit
      }),
      prisma.group.count()
    ])

    return NextResponse.json({
      groups,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Groups GET error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST - Create new group
export async function POST(request: NextRequest) {
  const authError = await verifyAdmin()
  if (authError) return authError

  try {
    const body = await request.json()
    const validation = createGroupSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { name, description } = validation.data

    // Check if group already exists
    const existingGroup = await prisma.group.findUnique({
      where: { name }
    })

    if (existingGroup) {
      return NextResponse.json(
        { error: 'Un groupe avec ce nom existe déjà' },
        { status: 400 }
      )
    }

    // Create group
    const group = await prisma.group.create({
      data: {
        name,
        description: description || null
      },
      include: {
        members: true,
        _count: {
          select: {
            members: true
          }
        }
      }
    })

    return NextResponse.json({ group }, { status: 201 })
  } catch (error) {
    console.error('Groups POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
