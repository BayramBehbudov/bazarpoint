'use client'
import Filters from '@/components/Filters'
import TableSection from '@/components/TableSection'
import Loader from '@/components/ui/loader'
import { IOrder } from '@/interfaces/types'
import { usePointStore } from '@/stores/usePointStore'
import axios from 'axios'
import { useEffect, useState } from 'react'

const HomeDelivery: React.FC = (): JSX.Element => {
   const { loading, pointId, setLoading, setOrders } = usePointStore((state) => state)
   const [filteredOrders, setFilteredOrder] = useState<IOrder[]>([])

   useEffect(() => {
      ;(async () => {
         setLoading(true)
         const res = await axios.get(`https://express-bay-rho.vercel.app/api/point/${pointId}`)
         if (res && res.status === 200) {
            setOrders(res.data)
            setFilteredOrder(res.data)
         } else {
            console.log(res)
         }
         setLoading(false)
      })()
   }, [pointId])

   return (
      <main>
         <div className="container">
            <Filters setFilteredOrder={setFilteredOrder} />
            <TableSection filteredOrders={filteredOrders} />
            {loading && <Loader />}
         </div>
      </main>
   )
}

export default HomeDelivery
