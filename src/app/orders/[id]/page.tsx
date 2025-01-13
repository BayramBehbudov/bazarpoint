'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { IOrder } from '@/interfaces/types'
import { usePointStore } from '@/stores/usePointStore'
import OrderHeader from '@/components/Details/OrderHeader'
import StoreSection from '@/components/Details/StoreSection'
import Loader from '@/components/ui/loader'
import StatusBtn from '@/components/StatusBtn'
import CourierModal from '@/components/CourierSelector'

export default function OrderDetailPage() {
   const { id } = useParams()
   const [order, setOrder] = useState<IOrder | null>(null)
   const { orders, loading, setLoading, setOrders } = usePointStore((state) => state)
   const [openModal, setOpenModal] = useState(false)

   useEffect(() => {
      if (id && orders.length > 0) {
         const order = orders.find((o) => o._id === id)
         order && setOrder(order)
      }
   }, [id, orders])

   if (!order) {
      return (
         <div className="flex h-screen items-center justify-center">
            <p className="text-xl text-gray-600">Sifariş tapılmadı</p>
         </div>
      )
   }

   const handleAccept = async (status: IOrder['status'], courier: string | null) => {
      const orderId = order._id
      try {
         setLoading(true)
         await axios.patch(`https://express-bay-rho.vercel.app/api/order/${orderId}`, {
            status,
            courier,
         })
         const updatedOrders = orders.map((o) => (o._id === orderId ? { ...o, status } : o))
         setOrders(updatedOrders)
      } catch (error) {
         console.log(error)
      } finally {
         setLoading(false)
      }
   }

   return (
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-2 bg-slate-100 px-5 py-3">
         <OrderHeader order={order} />
         <div className="flex w-full flex-col gap-2">
            {order.stores.map((store) => (
               <StoreSection storeData={store} orderId={order._id} />
            ))}
         </div>
         <StatusBtn order={order} setOpenModal={setOpenModal} handleAccept={handleAccept} />

         <CourierModal
            isOpen={openModal}
            setIsOpen={setOpenModal}
            setSelectedCourier={(v) => {
               if (v && v.length === 24) {
                  handleAccept('accepted', v)
               }
            }}
         />
         {loading && <Loader />}
      </div>
   )
}
