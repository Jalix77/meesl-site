import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

// Schema validation
const pageSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
})

const sectionSchema = z.object({
  key: z.string().min(1),
  title: z.string().optional(),
  body: z.string(),
  order: z.number().int(),
  isEnabled: z.boolean().default(true),
})

// GET /api/admin/pages
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const role = (session?.user as any)?.role
    if (!role || String(role).toLowerCase() !== 'admin') {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          hasSession: Boolean(session),
          role: role ?? null,
          userKeys: session?.user ? Object.keys(session.user as any) : [],
        },
        { status: 401 }
      )
    }

    const pages = await prisma.page.findMany({
      include: {
        sections: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { slug: 'asc' }
    })

    return NextResponse.json(pages)
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/admin/pages
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const role = (session?.user as any)?.role
    if (!role || String(role).toLowerCase() !== 'admin') {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          hasSession: Boolean(session),
          role: role ?? null,
          userKeys: session?.user ? Object.keys(session.user as any) : [],
        },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = pageSchema.parse(body)

    const page = await prisma.page.create({
      data: validatedData
    })

    return NextResponse.json(page, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    console.error('Error creating page:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
