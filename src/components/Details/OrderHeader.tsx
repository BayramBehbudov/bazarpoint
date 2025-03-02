import { getSlicedID, getStatusColor } from '@/helpers/functions'
import { translateStatus } from '@/helpers/translaters'
import { IOrder } from '@/interfaces/types'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Package, User, Phone, MapPin, ScrollText } from 'lucide-react'

interface IOrderHeader {
   order: IOrder
}

const OrderHeader: React.FC<IOrderHeader> = ({ order }) => {
   const router = useRouter()
   const {
      _id,
      status,
      customer: { phone, name, surname },
      deliveryAddress: { description },
      deliveryNote,
   } = order
   return (
      <div className="w-full overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
         <div className="p-6">
            <div className="mb-4 flex items-center justify-between">
               <button
                  onClick={() => router.back()}
                  className="inline-flex items-center rounded-md bg-blue-100 px-3 py-2 text-sm font-medium text-blue-700 transition-colors duration-200 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
               >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Geri
               </button>
               <h1 className="flex items-center text-xl font-bold text-gray-900">
                  <Package className="mr-2 h-6 w-6 text-blue-500" />
                  Sifariş {getSlicedID(_id)}
               </h1>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
               <div className="flex items-center rounded-md bg-gray-50 p-2">
                  <p
                     className="mr-2 rounded-full px-2 py-1 text-xs font-semibold text-white"
                     style={{
                        backgroundColor: `${getStatusColor(status)}`,
                     }}
                  >
                     {translateStatus(status)}
                  </p>
               </div>
               <div className="flex items-center rounded-md bg-gray-50 p-2">
                  <User className="mr-2 text-gray-500" size={20} color="blue" />
                  <span className="text-sm font-medium text-gray-700">
                     {name} {surname}
                  </span>
               </div>
               <div className="flex items-center rounded-md bg-gray-50 p-2">
                  <Phone className="mr-2 text-gray-500" size={20} color="blue" />
                  <span className="text-sm font-medium text-gray-700">{phone}</span>
               </div>
               <div className="flex items-center rounded-md bg-gray-50 p-2">
                  <MapPin className="mr-2 text-gray-500" size={20} color="blue" />
                  <span className="text-sm font-medium text-gray-700">{description}</span>
               </div>
               {deliveryNote && (
                  <div className="flex items-center rounded-md bg-gray-50 p-2">
                     <ScrollText className="mr-2 text-gray-500" size={20} color="blue" />
                     <span className="text-sm font-medium text-gray-700">{deliveryNote}</span>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default OrderHeader
