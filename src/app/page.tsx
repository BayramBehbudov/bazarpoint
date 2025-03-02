'use client'
import CustomLoader from '@/components/CustomLoader'
import Filters from '@/components/Filters'
import OrderCard from '@/components/OrderCard'
import { usePointStore } from '@/stores/usePointStore'
import { useEffect } from 'react'

const HomeDelivery: React.FC = (): JSX.Element => {
   const { loading, filteredOrders, refetch, orders } = usePointStore((state) => state)

   useEffect(() => {
      if (orders.length === 0) {
         refetch()
      }
   }, [orders.length, refetch])

   return (
      <main>
         <div className="container">
            <Filters />
            <div className="grid gap-6 p-5 sm:grid-cols-2 lg:grid-cols-3">
               {filteredOrders.map((order) => (
                  <OrderCard key={order._id} order={order} />
               ))}
            </div>

            {loading && <CustomLoader message="Sifarişlər axtarılır..." visible={loading} bgcolor="#00000050" />}
         </div>
      </main>
   )
}

export default HomeDelivery
