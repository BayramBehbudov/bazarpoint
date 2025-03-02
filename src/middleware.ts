import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
   const currentPath = req.nextUrl.pathname.split('/')[1]
   const cookieStore = await cookies()
   const token = cookieStore.get('access_token')

   if (!token && currentPath !== 'auth') {
      return NextResponse.redirect(new URL('/auth', req.url))
   }

   if (token && currentPath === 'auth') {
      return NextResponse.redirect(new URL('/', req.url))
   }
   return NextResponse.next()
}

export const config = {
   matcher: ['/', '/orders/:path*', '/auth'],
}
