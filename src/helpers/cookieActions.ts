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

export const removeCookie = async (name: string) => {
   ;(await cookies()).delete(name)
}
export const getCookie = async (name: string) => {
   return (await cookies()).get(name)?.value
}
