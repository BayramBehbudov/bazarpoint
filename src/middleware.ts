import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
   const currentPath = req.nextUrl.pathname.split('/')[1]
   const cookieStore = await cookies()
   const token = cookieStore.get('access_token')
   console.log(token)
   if (!token && currentPath !== 'auth') {
      NextResponse.redirect(new URL('/auth', req.url))
      return
   }
   return NextResponse.next()
   //  if (token && pathname.startsWith('/auth')) {
   //     return NextResponse.redirect(new URL('/', req.url))
   //  }
}

export const config = {
   matcher: '/:path*',
}
