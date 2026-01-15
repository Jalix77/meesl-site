import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = 
  globalForPrisma.prisma ?? 
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Helper function to test database connection
export async function testDatabaseConnection() {
  try {
    await prisma.$connect()
    return { success: true }
  } catch (error) {
    console.error('Database connection error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
