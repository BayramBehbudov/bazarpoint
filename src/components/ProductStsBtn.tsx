import { usePointStore } from '@/stores/usePointStore'
import axios from 'axios'
import { Types } from 'mongoose'

interface IProductStsBtn {
   orderId: string
   storeId: Types.ObjectId
   fieldId: string
}



const ProductStsBtn: React.FC<IProductStsBtn> = ({ orderId, storeId, fieldId }): JSX.Element => {
   const { orders, setLoading, loading, setOrders } = usePointStore((state) => state)

   const changeProductStatus = async () => {
      setLoading(true)
      try {
         await axios.post(`https://express-bay-rho.vercel.app/api/point`, {
            orderId,
            storeId,
            fieldId,
            accepted: true,
         })

         const updatedOrders = orders.map((o) =>
            o._id === orderId
               ? {
                    ...o,
                    stores: o.stores.map((s) =>
                       s.store._id === storeId
                          ? {
                               ...s,
                               products: s.products.map((p) => (p._id === fieldId ? { ...p, accepted: true } : p)),
                            }
                          : s,
                    ),
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
      <button disabled={loading} className="cursor-pointer text-green-700" onClick={changeProductStatus}>
         Qəbul et
      </button>
   )
}

export default ProductStsBtn
