import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

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

// PATCH - Update donation
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const authError = await verifyAdmin()
  if (authError) return authError

  try {
    const { id } = params
    const body = await request.json()
    const validation = updateDonationSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      )
    }

    const updateData = validation.data

    // Check if donation exists
    const existingDonation = await prisma.donation.findUnique({
      where: { id }
    })

    if (!existingDonation) {
      return NextResponse.json(
        { error: 'Don non trouvé' },
        { status: 404 }
      )
    }

    // Update donation
    const donation = await prisma.donation.update({
      where: { id },
      data: updateData,
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

    return NextResponse.json({ donation })
  } catch (error) {
    console.error('Donation PATCH error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE - Delete donation
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const authError = await verifyAdmin()
  if (authError) return authError

  try {
    const { id } = params

    // Check if donation exists
    const existingDonation = await prisma.donation.findUnique({
      where: { id }
    })

    if (!existingDonation) {
      return NextResponse.json(
        { error: 'Don non trouvé' },
        { status: 404 }
      )
    }

    // Delete donation
    await prisma.donation.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Don supprimé avec succès' })
  } catch (error) {
    console.error('Donation DELETE error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
