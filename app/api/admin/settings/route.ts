import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const settingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
  type: z.enum(['text', 'longtext', 'json', 'url']),
})

// GET /api/admin/settings
export async function GET() {
  try {
    const session = await getServerSession()
    if (!session?.user?.role || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const settings = await prisma.siteSetting.findMany({
      orderBy: { key: 'asc' }
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/admin/settings
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.role || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    
    // Handle bulk update
    if (Array.isArray(body)) {
      const updates = body.map(setting => 
        prisma.siteSetting.update({
          where: { key: setting.key },
          data: { value: setting.value }
        })
      )
      
      await prisma.$transaction(updates)
      
      // Return updated settings
      const settings = await prisma.siteSetting.findMany({
        orderBy: { key: 'asc' }
      })
      
      return NextResponse.json(settings)
    }
    
    // Handle single update
    const validatedData = settingSchema.parse(body)
    const setting = await prisma.siteSetting.update({
      where: { key: validatedData.key },
      data: { value: validatedData.value }
    })

    return NextResponse.json(setting)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
