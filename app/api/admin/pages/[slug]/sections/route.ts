import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const sectionSchema = z.object({
  key: z.string().min(1),
  title: z.string().optional(),
  body: z.string(),
  order: z.number().int(),
  isEnabled: z.boolean().default(true),
})

// POST /api/admin/pages/[slug]/sections
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession()
    if (!session?.user?.role || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = sectionSchema.parse(body)

    // Get the page first
    const page = await prisma.page.findUnique({
      where: { slug: params.slug }
    })

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    const section = await prisma.pageSection.create({
      data: {
        ...validatedData,
        pageId: page.id
      }
    })

    return NextResponse.json(section, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating section:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
