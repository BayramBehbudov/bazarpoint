import { getCookie, removeCookie } from '@/helpers/cookieActions'
import { IOrder, IUser } from '@/interfaces/types'
import axios from 'axios'
import { create } from 'zustand'

interface IPointStore {
   orders: IOrder[]
   setOrders: ([]: IOrder[]) => void
   loading: boolean
   setLoading: (loading: boolean) => void
   filteredOrders: IOrder[]
   setFilteredOrders: ([]: IOrder[]) => void
   couriers: IUser[]
   setCouriers: ([]: IUser[]) => void
   refetch: () => Promise<void>
}

export const usePointStore = create<IPointStore>((set) => ({
   orders: [],
   setOrders: (orders) => set({ orders }),
   loading: false,
   setLoading: (loading) => set({ loading }),
   filteredOrders: [],
   setFilteredOrders: (filteredOrders) => set({ filteredOrders }),
   couriers: [],
   setCouriers: (couriers) => set({ couriers }),
   refetch: async () => {
      try {
         set({ loading: true })
         const token = await getCookie('access_token')
         const {
            status,
            data: { orders, couriers },
         } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/points/auth?token=${token}`)
         if (status === 200) {
            if (orders && orders.length > 0) {
               set({ orders })
            }
            if (couriers && couriers.length > 0) {
               set({ couriers })
            }
         }
      } catch (error) {
         await removeCookie('access_token')
         console.log(error)
      } finally {
         set({ loading: false })
      }
   },
}))
