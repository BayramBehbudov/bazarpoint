import Table from './ui/Table'
import { IOrder, IOrderProduct } from '@/interfaces/types'
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog'
import { translateAttributes, translateStatus } from '@/helpers/translaters'
import StatusBtn from './StatusBtn'
import ProductStsBtn from './ProductStsBtn'

interface IDialogSection {
   order: IOrder
}

const DialogSection: React.FC<IDialogSection> = ({ order }): JSX.Element => {
   const productsInOrder = order.stores.flatMap((store) => store.products)
   const acceptedProducts = productsInOrder.every((p) => p.accepted)

   return (
      <Dialog>
         <DialogTrigger className="font-bold text-green-700">Ətraflı</DialogTrigger>

         <DialogContent className="max-h-[95vh] min-w-[80%] overflow-auto bg-gray-300">
            <DialogHeader>
               <DialogTitle></DialogTitle>
               <div className="flex flex-col gap-1 border border-black p-3">
                  <DialogDescription className="text-center">Sifarişin detalları</DialogDescription>
                  <div className="flex gap-5">
                     <p className="w-[110px] text-end text-sm text-black">ID:</p>
                     <p className="text-sm text-black"> #{order._id.slice(-6)}</p>
                  </div>

                  <div className="flex gap-5">
                     <p className="w-[110px] text-end text-sm text-black">Alıcının qeydləri:</p>
                     <p className="text-sm text-black">
                        {order.sellerNote} {order.deliveryNote}
                     </p>
                  </div>
               </div>

               <div className="flex flex-col gap-5 py-5">
                  {order.stores.map((store, index) => {
                     const body = store.products.map((p: IOrderProduct) => {
                        const { accepted, product, count, _id: fieldId, selectedAttributes } = p
                        const productId = product._id
                        return {
                           _id: `#${productId.toString().slice(-6)}`,
                           name: product.name,
                           count,
                           attributes: Object.entries(selectedAttributes).map(
                              ([key, attr]) => translateAttributes(key) + ': ' + attr + ',',
                           ),
                           accept: accepted ? (
                              'Qəbul edildi'
                           ) : (
                              <ProductStsBtn orderId={order._id} storeId={store.store._id} fieldId={fieldId} />
                           ),
                        }
                     })
                     return (
                        <div className="flex-col" key={store.store.name + index}>
                           <div className="flex flex-col gap-1">
                              <div className="flex gap-2">
                                 <p className="w-16 text-end text-sm text-black">Mağaza:</p>
                                 <p className="text-sm text-black"> {store.store.name}</p>
                              </div>
                              <div className="flex gap-2">
                                 <p className="w-16 text-end text-sm text-black">Nömrə:</p>
                                 <p className="text-sm text-black"> {store.store.phone}</p>
                              </div>
                              <div className="flex gap-2">
                                 <p className="w-16 text-end text-sm text-black">Status:</p>
                                 <p className="text-sm text-black">{translateStatus(store.status)}</p>
                              </div>
                           </div>
                           <Table headers={['ID', 'Ad', 'Seçimlər', 'Say', 'Status']} body={body} className="mt-2" />
                        </div>
                     )
                  })}
               </div>

               {acceptedProducts && (
                  <div className="flex justify-end">
                     <StatusBtn orderId={order._id} currentStatus={order.status} />
                  </div>
               )}
            </DialogHeader>
         </DialogContent>
      </Dialog>
   )
}

export default DialogSection
