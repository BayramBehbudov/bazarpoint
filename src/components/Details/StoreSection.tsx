import { IOrderStore } from '@/interfaces/types'
import StoreHeader from './StoreHeader'
import ProductCard from './ProductCard'

const StoreSection = ({
   storeData,
   orderId,
   packId,
}: {
   storeData: IOrderStore
   orderId: string
   packId: string
}): JSX.Element => {
   const { store, status, products } = storeData

   return (
      <div className="flex w-full flex-col gap-4 rounded-lg border bg-white p-6 shadow-md">
         <StoreHeader store={store} status={status} />
         <div className="">
            <h3 className="mb-3 text-base font-semibold text-gray-700">Məhsullar</h3>
            {products.map((product, i) => (
               <ProductCard
                  packId={packId}
                  key={product._id + i}
                  orderProduct={product}
                  orderId={orderId}
                  orderStatus={status === 'takeOver'}
               />
            ))}
         </div>
      </div>
   )
}

export default StoreSection
