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
   const { orders, loading, setLoading, setOrders, pointId } = usePointStore((state) => state)
   const [openModal, setOpenModal] = useState(false)

   const getOrder = async () => {
      try {
         setLoading(true)
         const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/points/order`, {
            params: {
               orderId: id,
               pointId,
            },
         })
         if (res && res.status === 200 && res.data._id.toString() === id?.toString()) {
            setOrder(res.data)
         }
      } catch (error) {
         console.log(error)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => {
      if (id && orders.length > 0) {
         const order = orders.find((o) => o._id === id)
         order && setOrder(order)
      } else {
         getOrder()
      }
   }, [id, orders])

   if (loading) return <Loader />

   if (!order)
      return (
         <div className="flex h-screen items-center justify-center">
            <p className="text-xl text-gray-600">Sifariş tapılmadı</p>
         </div>
      )

   const handleAccept = async (status: 'accepted' | 'delivered', courier?: string) => {
      const orderId = order._id
      const packId = order.packages[0]._id
      try {
         setLoading(true)
         const body = courier
            ? {
                 orderId,
                 packId,
                 status,
                 courier,
              }
            : { status, packId, orderId }
         await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/points/package-status`, body)

         const updatedOrders = orders.map((o) =>
            o._id === orderId
               ? {
                    ...o,
                    packages: o.packages.map((p) => (p._id.toString() === packId.toString() ? { ...p, status } : p)),
                 }
               : o,
         )
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
            {order.packages.flatMap((p) =>
               p.stores.map((store) => (
                  <StoreSection packId={p._id} key={store.store._id} storeData={store} orderId={order._id} />
               )),
            )}
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
