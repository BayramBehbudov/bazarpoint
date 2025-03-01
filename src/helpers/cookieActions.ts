'use server'

import { cookies } from 'next/headers'

export const addCookie = async (name: string, value: string) => {
   ;(await cookies()).set({
      name,
      value,
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
   })
}
