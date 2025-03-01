import { IOrder, IUser } from '@/interfaces/types'
import { create } from 'zustand'

interface IPointStore {
   orders: IOrder[]
   setOrders: ([]: IOrder[]) => void
   pointId: string
   setPointId: (pointId: string) => void
   loading: boolean
   setLoading: (loading: boolean) => void
   filteredOrders: IOrder[]
   setFilteredOrders: ([]: IOrder[]) => void
   couriers: IUser[]
   setCouriers: ([]: IUser[]) => void
}

export const usePointStore = create<IPointStore>((set) => ({
   pointId: '',
   setPointId: (pointId: string) => set({ pointId }),
   orders: [],
   setOrders: (orders) => set({ orders }),
   loading: false,
   setLoading: (loading) => set({ loading }),
   filteredOrders: [],
   setFilteredOrders: (filteredOrders) => set({ filteredOrders }),
   couriers: [],
   setCouriers: (couriers) => set({ couriers }),
}))
