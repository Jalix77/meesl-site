import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schema for adding registrations
const addRegistrationSchema = z.object({
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

// POST - Register user for event
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const authError = await verifyAdmin()
  if (authError) return authError

  try {
    const { id } = params
    const body = await request.json()
    const validation = addRegistrationSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const { userId } = validation.data

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id }
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Événement non trouvé' },
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

    // Check if user is already registered
    const existingRegistration = await prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId: id
        }
      }
    })

    if (existingRegistration) {
      return NextResponse.json(
        { error: 'L\'utilisateur est déjà inscrit à cet événement' },
        { status: 400 }
      )
    }

    // Register user for event
    const registration = await prisma.eventRegistration.create({
      data: {
        userId,
        eventId: id
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

    return NextResponse.json({ registration }, { status: 201 })
  } catch (error) {
    console.error('Event registration POST error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE - Unregister user from event
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

    // Check if registration exists
    const existingRegistration = await prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId: id
        }
      }
    })

    if (!existingRegistration) {
      return NextResponse.json(
        { error: 'L\'utilisateur n\'est pas inscrit à cet événement' },
        { status: 404 }
      )
    }

    // Remove user from event
    await prisma.eventRegistration.delete({
      where: {
        userId_eventId: {
          userId,
          eventId: id
        }
      }
    })

    return NextResponse.json({ message: 'Inscription annulée avec succès' })
  } catch (error) {
    console.error('Event registration DELETE error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
