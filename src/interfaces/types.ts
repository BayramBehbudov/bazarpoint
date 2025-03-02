import { Types } from 'mongoose'
import { z } from 'zod'


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

export interface IPoint {
   name: string
   address: string
   phone: string
   location: {
      lat: number
      lon: number
   }
}

export interface IPointDB {
   _id: string
   createdAt: string
   updatedAt: string
   __v: number
   orders: (IOrder & { products: { product: IProduct; accepted: boolean }[] })[]
}

export interface IUserAddress {
   description: string
   city: string
   location: {
      lat: number
      lon: number
   }

   street?: string
   name?: string
   entry?: string
   floor?: string
   house?: string
   code?: string
   other?: string
}

export interface IUser {
   name: string
   surname: string
   phone: string
   _id: string
   role: 'user' | 'seller' | 'courier-collector' | 'courier-delivery'
}

export interface IStore {
   _id: string
   name: string
   address: string
   phone: string
   description: string
   isAvailable: boolean
   owner: IUser
   point: IPointDB
}

export interface IProduct {
   name: string
   _id: Types.ObjectId
   variants: IProductVariant[]
   image: {
      imageUrl: string
      _id: string
   }
   store: string
}

export interface IProductVariant {
   images: { _id: string; imageUrl: string }[]
   attributes: Record<string, string[]>
   _id: string
}

export interface ISelectedAttributes {
   [key: string]: string
}
export interface IOrderProduct {
   product: IProduct
   count: number
   selectedAttributes: ISelectedAttributes
   accepted: boolean
   _id: string
}

export interface IOrderStore {
   status: 'pending' | 'ready' | 'takeOver'
   store: IStore
   products: IOrderProduct[]
}
export interface IOrderCustomer {
   customer: string
   name: string
   phone: string
   surname: string
}

export interface IPackage {
   stores: IOrderStore[]
   status: 'pending' | 'accepted' | 'delivered' | 'fullfilled'
   courier: string | null
   _id: string
}
export interface IOrder {
   _id: string
   status: 'pending' | 'fullfilled'
   createdAt: string
   customer: IOrderCustomer
   deliveryAddress: IUserAddress
   deliveryNote: string
   sellerNote: string
   packages: IPackage[]
}
