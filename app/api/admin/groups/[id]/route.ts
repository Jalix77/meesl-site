import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

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

// PATCH - Update group
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const authError = await verifyAdmin()
  if (authError) return authError

  try {
    const { id } = params
    const body = await request.json()
    const validation = updateGroupSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const updateData = validation.data

    // Check if group exists
    const existingGroup = await prisma.group.findUnique({
      where: { id }
    })

    if (!existingGroup) {
      return NextResponse.json(
        { error: 'Groupe non trouvé' },
        { status: 404 }
      )
    }

    // If updating name, check for duplicates
    if (updateData.name) {
      const duplicateGroup = await prisma.group.findFirst({
        where: {
          name: updateData.name,
          id: { not: id }
        }
      })

      if (duplicateGroup) {
        return NextResponse.json(
          { error: 'Un groupe avec ce nom existe déjà' },
          { status: 400 }
        )
      }
    }

    // Update group
    const group = await prisma.group.update({
      where: { id },
      data: updateData,
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
      }
    })

    return NextResponse.json({ group })
  } catch (error) {
    console.error('Group PATCH error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE - Delete group
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const authError = await verifyAdmin()
  if (authError) return authError

  try {
    const { id } = params

    // Check if group exists
    const existingGroup = await prisma.group.findUnique({
      where: { id }
    })

    if (!existingGroup) {
      return NextResponse.json(
        { error: 'Groupe non trouvé' },
        { status: 404 }
      )
    }

    // Delete group (cascade will handle group members)
    await prisma.group.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Groupe supprimé avec succès' })
  } catch (error) {
    console.error('Group DELETE error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
