'use client'
import Filters from '@/components/Filters'
import OrderCard from '@/components/OrderCard'
import Loader from '@/components/ui/loader'
import { usePointStore } from '@/stores/usePointStore'
import axios from 'axios'
import { useEffect } from 'react'

const HomeDelivery: React.FC = (): JSX.Element => {
   const { loading, pointId, setLoading, setOrders, filteredOrders, setFilteredOrders } = usePointStore(
      (state) => state,
   )

   useEffect(() => {
      ;(async () => {
         setLoading(true)
         const res = await axios.get(`https://express-bay-rho.vercel.app/api/point/${pointId}`)
         if (res && res.status === 200) {
            setOrders(res.data)
            setFilteredOrders(res.data)
         } else {
            console.log(res)
         }
         setLoading(false)
      })()
   }, [pointId])

   return (
      <main>
         <div className="container">
            <Filters />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
