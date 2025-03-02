'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import CustomInput from '@/components/CustomInput'
import CustomLoader from '@/components/CustomLoader'
import { z } from 'zod'
import { usePointStore } from '@/stores/usePointStore'
import { useRouter } from 'next/navigation'
import { addCookie } from '@/helpers/cookieActions'

export const LoginSchema = z.object({
   password: z
      .string({
         required_error: 'Şifrəni daxil edin',
      })
      .trim()
      .min(8, { message: 'Şifrə minimum 8 simvoldan ibarət olmalıdır' })
      .regex(/[A-Z]/, { message: 'Şifrədə ən az bir böyük hərf olmalıdır' })
      .regex(/[a-z]/, { message: 'Şifrədə ən az bir kiçik hərf olmalıdır' })
      .regex(/[0-9]/, { message: 'Şifrədə ən az bir rəqəm olmalıdır' }),
   phone: z
      .string({
         required_error: 'Nömrəni daxil edin',
      })
      .trim()
      .regex(/^\+994\d{9}$/, {
         message: 'Nömrəni düzgün daxil edin. məs. +994501234567',
      }),
})

export type ILogin = z.infer<typeof LoginSchema>

const LoginPage = () => {
   const { loading, setLoading, setOrders, setFilteredOrders, setCouriers } = usePointStore((state) => state)
   const {
      handleSubmit,
      register,
      formState: { errors },
   } = useForm<ILogin>({
      resolver: zodResolver(LoginSchema),
   })

   const router = useRouter()
   const onSubmit = async (formValue: ILogin) => {
      setLoading(true)
      try {
         const {
            status,
            data: { access_token, orders, couriers },
         } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/points/login`, formValue)
         if (status === 201 && access_token) {
            addCookie('access_token', access_token)
            if (orders.length > 0) {
               setFilteredOrders(orders)
               setOrders(orders)
            }
            if (couriers.length > 0) setCouriers(couriers)
            router.push(`/`)
         }
      } catch (error) {
         console.log(error)
      } finally {
         setLoading(false)
      }
   }

   return (
      <div
         style={{
            display: 'flex',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#edf2f7',
            padding: '24px',
         }}
      >
         <div
            style={{
               width: '100%',
               maxWidth: '400px',
               backgroundColor: 'white',
               padding: '24px',
               borderRadius: '12px',
               boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
               display: 'flex',
               flexDirection: 'column',
               gap: '24px',
            }}
         >
            <h2
               style={{
                  marginBottom: '24px',
                  textAlign: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#3182ce',
               }}
            >
               Xoş Gəlmişsiniz
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
               <CustomInput name="phone" placeholder="Mobil nömrə" error={errors.phone?.message} register={register} />
               <CustomInput name="password" placeholder="Şifrə" error={errors.password?.message} register={register} />

               <button
                  type="submit"
                  style={{
                     marginTop: '24px',
                     width: '100%',
                     backgroundColor: '#3182ce',
                     padding: '12px',
                     fontWeight: 'bold',
                     color: 'white',
                     borderRadius: '8px',
                  }}
               >
                  Giriş
               </button>
            </form>

            {loading && <CustomLoader messageColor="#fff" visible={loading} message="Sistemə giriş edilir" />}
         </div>
      </div>
   )
}

export default LoginPage
