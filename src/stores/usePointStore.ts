import { IOrder, IUser } from '@/interfaces/types'
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
         _id: '67b0c320194e1b0008a5cd45',
         name: 'Delivery',
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
         _id: '67b0c309194e1b0008a5cd41',
         name: 'Collector',
         surname: 'Behbudov',
         phone: '+994509876704',
         role: 'courier-collector',
      },
   ],
}))
