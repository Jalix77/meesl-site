import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schema for adding members
const addMemberSchema = z.object({
  userId: z.string()
})

// Verify admin session
async function verifyAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }
  return null
}

// POST - Add member to group
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const authError = await verifyAdmin()
  if (authError) return authError

  try {
    const { id } = params
    const body = await request.json()
    const validation = addMemberSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { userId } = validation.data

    // Check if group exists
    const group = await prisma.group.findUnique({
      where: { id }
    })

    if (!group) {
      return NextResponse.json(
        { error: 'Groupe non trouvé' },
        { status: 404 }
      )
    }

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

    // Check if user is already in group
    const existingMembership = await prisma.groupMember.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId: id
        }
      }
    })

    if (existingMembership) {
      return NextResponse.json(
        { error: 'L\'utilisateur est déjà membre de ce groupe' },
        { status: 400 }
      )
    }

    // Add user to group
    const groupMember = await prisma.groupMember.create({
      data: {
        userId,
        groupId: id
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

    return NextResponse.json({ groupMember }, { status: 201 })
  } catch (error) {
    console.error('Group member POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE - Remove member from group
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const authError = await verifyAdmin()
  if (authError) return authError

  try {
    const { id } = params
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { error: 'userId est requis' },
        { status: 400 }
      )
    }

    // Check if membership exists
    const existingMembership = await prisma.groupMember.findUnique({
      where: {
        userId_groupId: {
          userId,
          groupId: id
        }
      }
    })

    if (!existingMembership) {
      return NextResponse.json(
        { error: 'L\'utilisateur n\'est pas membre de ce groupe' },
        { status: 404 }
      )
    }

    // Remove user from group
    await prisma.groupMember.delete({
      where: {
        userId_groupId: {
          userId,
          groupId: id
        }
      }
    })

    return NextResponse.json({ message: 'Membre retiré du groupe avec succès' })
  } catch (error) {
    console.error('Group member DELETE error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
