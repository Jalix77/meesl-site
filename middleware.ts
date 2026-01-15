import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Public routes that don't require authentication
        const publicPaths = ['/login', '/register', '/api/auth', '/api/register']
        
        // Admin routes that require admin role
        const adminPaths = ['/admin']
        
        const { pathname } = req.nextUrl
        
        // Allow public paths
        if (publicPaths.some(path => pathname.startsWith(path))) {
          return true
        }
        
        // Check admin paths
        if (adminPaths.some(path => pathname.startsWith(path))) {
          return token?.role === 'admin'
        }
        
        // Protected member paths
        if (pathname.startsWith('/mon-compte')) {
          return !!token
        }
        
        // All other paths are public
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/mon-compte/:path*',
    '/api/admin/:path*',
    '/api/me/:path*',
  ]
}
