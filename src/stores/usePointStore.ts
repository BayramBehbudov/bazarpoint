import { IOrder } from '@/interfaces/types'
import axios from 'axios'
import { create } from 'zustand'

interface IPointStore {
   orders: IOrder[]
   setOrders: ([]: IOrder[]) => void
   pointId: string
   loading: boolean
   setLoading: (loading: boolean) => void
}

export const usePointStore = create<IPointStore>((set) => ({
   pointId: '672c6a0f58d54db7b5d9dbd4',
   orders: [],
   setOrders: (orders) => set({ orders }),
   loading: false,
   setLoading: (loading) => set({ loading }),
}))
