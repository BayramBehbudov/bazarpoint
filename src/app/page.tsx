'use client'
import Filters from '@/components/Filters'
import OrderCard from '@/components/OrderCard'
import Loader from '@/components/ui/loader'
import { usePointStore } from '@/stores/usePointStore'

const HomeDelivery: React.FC = (): JSX.Element => {
   const { loading, filteredOrders } = usePointStore((state) => state)

   return (
      <main>
         <div className="container">
            <Filters />
            <div className="grid gap-6 p-5 sm:grid-cols-2 lg:grid-cols-3">
               {filteredOrders.map((order) => (
                  <OrderCard key={order._id} order={order} />
               ))}
            </div>

            {loading && <Loader />}
         </div>
      </main>
   )
}

export default HomeDelivery
