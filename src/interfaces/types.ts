import { Types } from 'mongoose'

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
   // city: string
   // district: string
   // street: string
   // building: string
   // apartment: string
   // location: {
   //    lat: number
   //    lon: number
   // }
}

export interface IUser {
   // name: string
   // email: string
   // password: string
   // surname: string
   // phone: string
   // gender: 'male' | 'female'
   // address: IUserAddress[]
   // role: 'user' | 'seller'
   // _id: string
   // createdAt: string
   // updatedAt: string
   // __v: number
}

export interface IStore {
   _id: Types.ObjectId
   name: string
   address: string
   phone: string
   description: string
   isAvailable: boolean
   owner: IUser
   point: IPointDB
}

export interface IProductImages {
   // main: {
   //    imageUrl: string
   //    imageId: string | null
   // }
   // subImages: {
   //    imageUrl: string
   //    imageTag: string | null
   //    imageId: string | null
   // }[]
}

export interface IProduct {
   name: string
   // description: string
   // price: string
   // category: {
   //    main: string
   //    sub: string
   //    child: string
   // }
   // attributes: {
   //    [key: string]: string[]
   // }
   // features: {
   //    [key: string]: string
   // }
   // images: IProductImages
   // store: IStore
   // viewed: number
   // isActive: boolean
   _id: Types.ObjectId
   // createdAt: string
   // updatedAt: string
   // __v: number
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

export interface IOrderCustomer {
   customer: string
   name: string
   phone: string
   surname: string
}
export interface IOrder {
   _id: string
   status: 'pending' | 'accepted' | 'delivered' | 'fullfilled' | 'cancelled'
   createdAt: string
   customer: IOrderCustomer
   stores: {
      status: 'pending' | 'ready' | 'handOver'
      store: IStore
      products: IOrderProduct[]
   }[]

   deliveryNote: string
   sellerNote: string
   deliveryAddress: IUserAddress
}
