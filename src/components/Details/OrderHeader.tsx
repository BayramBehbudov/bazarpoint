import { getSlicedID, getStatusColor } from '@/helpers/functions'
import { translateStatus } from '@/helpers/translaters'
import { IOrder } from '@/interfaces/types'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Package, User, Phone, MapPin, Truck, ScrollText } from 'lucide-react'

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

// import { getSlicedID, getStatusColor } from '@/helpers/functions'
// import { translateStatus } from '@/helpers/translaters'
// import { IOrder } from '@/interfaces/types'
// import { useRouter } from 'next/navigation'
// import { ArrowLeft, Package, User, Phone, MapPin, Truck, Calendar } from 'lucide-react'

// interface IOrderHeader {
//   order: IOrder
// }

// const OrderHeader: React.FC<IOrderHeader> = ({ order }) => {
//   const router = useRouter()

//   return (
//     <div className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-blue-100">
//       <div className="p-6">
//         <div className="flex items-center justify-between mb-6">
//           <button
//             onClick={() => router.back()}
//             className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Geri
//           </button>
//           <h1 className="text-2xl font-bold text-gray-800 flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
//             <Package className="mr-2 h-6 w-6 text-blue-500" />
//             Sifariş #{getSlicedID(1._id)}
//           </h1>
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           <div className="flex items-center bg-white rounded-lg p-3 shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]">
//             <div className="bg-blue-100 rounded-full p-2 mr-3">
//               <Calendar className="h-5 w-5 text-blue-600" />
//             </div>
//             <div>
//               <span className="text-xs text-gray-500 block">Tarix</span>
//               <span className="text-sm font-medium text-gray-800">
//                 {new Date(1.createdAt).toLocaleDateString('az-AZ', { year: 'numeric', month: 'long', day: 'numeric' })}
//               </span>
//             </div>
//           </div>
//           <div className="flex items-center bg-white rounded-lg p-3 shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]">
//             <div
//               className="rounded-full p-2 mr-3"
//               style={{ backgroundColor: `${getStatusColor(1.status)}20` }}
//             >
//               <span
//                 className="px-2 py-1 rounded-full text-xs font-semibold"
//                 style={{ color: getStatusColor(1.status) }}
//               >
//                 {translateStatus(1.status)}
//               </span>
//             </div>
//           </div>
//           <div className="flex items-center bg-white rounded-lg p-3 shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]">
//             <div className="bg-green-100 rounded-full p-2 mr-3">
//               <User className="h-5 w-5 text-green-600" />
//             </div>
//             <div>
//               <span className="text-xs text-gray-500 block">Müştəri</span>
//               <span className="text-sm font-medium text-gray-800">
//                 {1.customer.name} {1.customer.surname}
//               </span>
//             </div>
//           </div>
//           <div className="flex items-center bg-white rounded-lg p-3 shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]">
//             <div className="bg-yellow-100 rounded-full p-2 mr-3">
//               <Phone className="h-5 w-5 text-yellow-600" />
//             </div>
//             <div>
//               <span className="text-xs text-gray-500 block">Telefon</span>
//               <span className="text-sm font-medium text-gray-800">{1.customer.phone}</span>
//             </div>
//           </div>
//           <div className="flex items-center bg-white rounded-lg p-3 shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]">
//             <div className="bg-purple-100 rounded-full p-2 mr-3">
//               <MapPin className="h-5 w-5 text-purple-600" />
//             </div>
//             <div>
//               <span className="text-xs text-gray-500 block">Ünvan</span>
//               <span className="text-sm font-medium text-gray-800">{1.deliveryAddress.description}</span>
//             </div>
//           </div>
//           {1.deliveryNote && (
//             <div className="flex items-center bg-white rounded-lg p-3 shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]">
//               <div className="bg-red-100 rounded-full p-2 mr-3">
//                 <Truck className="h-5 w-5 text-red-600" />
//               </div>
//               <div>
//                 <span className="text-xs text-gray-500 block">Çatdırılma qeydi</span>
//                 <span className="text-sm font-medium text-gray-800">{1.deliveryNote}</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default OrderHeader
