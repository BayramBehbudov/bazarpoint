import { IOrder } from '@/interfaces/types'
import { usePointStore } from '@/stores/usePointStore'
import axios from 'axios'

interface IStatusBtn {
   orderId: string
   currentStatus: IOrder['status']
}

const StatusBtn: React.FC<IStatusBtn> = ({ orderId, currentStatus }): JSX.Element => {
   const { orders, setLoading, loading, setOrders } = usePointStore((state) => state)
   const status: IOrder['status'] =
      currentStatus === 'pending' ? 'accepted' : currentStatus === 'accepted' ? 'delivered' : currentStatus

   return (
      <button
         disabled={(currentStatus !== 'pending' && currentStatus !== 'accepted') || loading}
         className="rounded-xl bg-orange-400 p-3"
         onClick={async () => {
            setLoading(true)

            try {
               await axios.patch(`https://express-bay-rho.vercel.app/api/order/${orderId}`, {
                  status,
               })
               const updatedOrders = orders.map((o) => (o._id === orderId ? { ...o, status } : o))
               setOrders(updatedOrders)
            } catch (error) {
               console.log(error)
            } finally {
               setLoading(false)
            }
         }}
      >
         {currentStatus === 'pending' && 'Sifariş təsdiqlə'}
         {currentStatus === 'accepted' && 'Sifarişi təhvil ver'}
         {currentStatus !== 'pending' && currentStatus !== 'accepted' && 'Sifariş təhvil verildi'}
      </button>
   )
}

export default StatusBtn
