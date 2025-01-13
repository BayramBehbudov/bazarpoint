import { IOrder, IUser } from '@/interfaces/types'
import axios from 'axios'
import { create } from 'zustand'

interface IPointStore {
   orders: IOrder[]
   setOrders: ([]: IOrder[]) => void
   pointId: string
   loading: boolean
   setLoading: (loading: boolean) => void
   filteredOrders: IOrder[]
   setFilteredOrders: ([]: IOrder[]) => void
   couriers: IUser[]
}

export const usePointStore = create<IPointStore>((set) => ({
   pointId: '672c6a0f58d54db7b5d9dbd4',
   orders: [],
   setOrders: (orders) => set({ orders }),
   loading: false,
   setLoading: (loading) => set({ loading }),
   filteredOrders: [],
   setFilteredOrders: (filteredOrders) => set({ filteredOrders }),
   couriers: [
      {
         _id: '677ecd2beff4864acf536602',
         name: 'Kuryer 1',
         surname: 'Behbudov',
         phone: '+994509876704',
         role: 'courier-delivery',
      },
      {
         _id: '677935f490c02508',
         name: 'Test kuryer',
         surname: 'bunu təyin etmə',
         phone: '+994509876703',
         role: 'courier-delivery',
      },
      {
         _id: '677ecd2bef4864acf53660b',
         name: 'Kuryer 1',
         surname: 'Behbudov',
         phone: '+994509876704',
         role: 'courier-collector',
      },
   ],
}))
