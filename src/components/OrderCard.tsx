import Link from 'next/link'
import { IOrder } from '@/interfaces/types'
import { translateStatus } from '@/helpers/translaters'
import { formatterDate, getSlicedID, getStatusColor, hoursSince } from '@/helpers/functions'

interface OrderCardProps {
   order: IOrder
}

export default function OrderCard({ order }: OrderCardProps) {
   const totalStores = order.packages.flatMap((p) => p.stores)
   const totalProducts = totalStores.reduce((sum, store) => sum + store.products.length, 0)
   const { status } = order.packages[0]
   return (
      <div className="rounded-lg border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
         <div className="flex flex-col gap-2 p-5">
            <div className="flex items-center justify-between">
               <h2 className="text-lg font-bold text-blue-600">{getSlicedID(order._id)}</h2>
               <span
                  style={{ backgroundColor: getStatusColor(status) }}
                  className={`rounded-lg px-3 py-1 text-xs font-medium text-white`}
               >
                  {translateStatus(status)}
               </span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
               <div className="flex gap-2">
                  <span className="font-bold">{totalStores.length}</span>
                  <span>Mağaza</span>
               </div>
               <div className="flex gap-2">
                  <span className="font-bold">{totalProducts}</span>
                  <span>Məhsul</span>
               </div>
            </div>
         </div>
         <div className="flex flex-row items-center justify-between bg-gray-50 p-4">
            <div className="flex flex-col">
               <p className="text-sm font-semibold text-gray-600">{formatterDate(order.createdAt)}</p>
               <span className="text-sm text-gray-600">({hoursSince(order.createdAt)} saat əvvəl)</span>
            </div>
            <Link
               href={`/orders/${order._id}`}
               className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
               Ətraflı Bax
               <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                     fillRule="evenodd"
                     d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                     clipRule="evenodd"
                  />
               </svg>
            </Link>
         </div>
      </div>
   )
}
