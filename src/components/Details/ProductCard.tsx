import { translateAttributes } from '@/helpers/translaters'
import { IOrderProduct } from '@/interfaces/types'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { usePointStore } from '@/stores/usePointStore'
import { getSlicedID } from '@/helpers/functions'

const ProductCard = ({
   orderProduct,
   orderId,
   orderStatus,
}: {
   orderProduct: IOrderProduct
   orderId: string
   orderStatus: boolean
}): JSX.Element => {
   const { product, count, selectedAttributes, accepted, _id: fieldId } = orderProduct
   const { setOrders, loading, setLoading, orders } = usePointStore((state) => state)
   const storeId = product.store

   const uri = selectedAttributes.color
      ? product.variants.find((v) => v.attributes.color.includes(selectedAttributes.color))?.images[0].imageUrl ||
        product.image.imageUrl
      : product.image.imageUrl

   const renderProductVariants = () => {
      return (
         <div className="">
            {Object.entries(selectedAttributes).map(([key, value]) => (
               <p key={key} className="text-base text-gray-600">
                  {translateAttributes(key)}: {value}
               </p>
            ))}
            {accepted}
         </div>
      )
   }
   const handleAccept = async () => {
      setLoading(true)
      try {
         await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/points/product-accepted`, {
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
      <div className="relative mb-4 rounded-lg border border-gray-200 p-4 shadow-sm transition-shadow hover:shadow-md">
         <div className="flex flex-col sm:flex-row">
            <div className="mb-4 flex h-[200px] justify-center sm:mb-0 sm:mr-4 sm:w-1/4">
               <Image src={uri} alt={product.name} width={200} height={200} className="rounded-md" />
            </div>
            <div className="flex flex-1 flex-col justify-between">
               <div>
                  <h3 className="mb-2 line-clamp-2 w-[85%] font-semibold text-gray-800">{product.name}</h3>
                  <div className="absolute right-0 top-0 flex flex-col items-center">
                     <p className="mb-2 w-[90px] bg-[#f35757] px-2 py-2 text-sm font-semibold text-white">
                        {count} ədəd
                     </p>
                     <p className="mb-2 w-[90px] bg-[#d58428] px-2 py-2 text-sm font-semibold text-white">
                        {getSlicedID(product._id.toString())}
                     </p>
                  </div>
                  {renderProductVariants()}
               </div>
               {orderStatus && (
                  <button
                     onClick={handleAccept}
                     disabled={accepted || loading}
                     className="mt-5 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
                  >
                     {accepted ? 'Qəbul edildi' : 'Qəbul et'}
                  </button>
               )}
            </div>
         </div>
      </div>
   )
}

export default ProductCard
