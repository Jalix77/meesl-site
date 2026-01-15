import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schema for updating events
const updateEventSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional(),
  startAt: z.string().datetime().optional(),
  endAt: z.string().datetime().optional(),
  location: z.string().optional(),
  isPublic: z.boolean().optional()
})

// Verify admin session
async function verifyAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 })
  }
  return null
}

// PATCH - Update event
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const authError = await verifyAdmin()
  if (authError) return authError

  try {
    const { id } = params
    const body = await request.json()
    const validation = updateEventSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const updateData = validation.data

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id }
    })

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Événement non trouvé' },
        { status: 404 }
      )
    }

    // Update event
    const event = await prisma.event.update({
      where: { id },
      data: {
        ...updateData,
        startAt: updateData.startAt ? new Date(updateData.startAt) : undefined,
        endAt: updateData.endAt ? new Date(updateData.endAt) : undefined
      },
      include: {
        registrations: {
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
            registrations: true
          }
        }
      }
    })

    return NextResponse.json({ event })
  } catch (error) {
    console.error('Event PATCH error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE - Delete event
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const authError = await verifyAdmin()
  if (authError) return authError

  try {
    const { id } = params

    // Check if event exists
    const existingEvent = await prisma.event.findUnique({
      where: { id }
    })

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Événement non trouvé' },
        { status: 404 }
      )
    }

    // Delete event (cascade will handle registrations)
    await prisma.event.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Événement supprimé avec succès' })
  } catch (error) {
    console.error('Event DELETE error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
