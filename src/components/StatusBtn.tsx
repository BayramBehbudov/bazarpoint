import { translateStatus } from '@/helpers/translaters'
import { IOrder } from '@/interfaces/types'
import { usePointStore } from '@/stores/usePointStore'

interface IStatusBtn {
   order: IOrder
   setOpenModal: (open: boolean) => void
   handleAccept: (status: IOrder['status'], courier: string | null) => Promise<void>
}

const StatusBtn: React.FC<IStatusBtn> = ({ order, setOpenModal, handleAccept }): JSX.Element => {
   const { loading } = usePointStore((state) => state)
   const { status } = order

   const acceptedProducts = order.stores.every((store) => store.products.every((p) => p.accepted))
   const disabled = (status !== 'pending' && status !== 'accepted') || !acceptedProducts || loading

   return acceptedProducts ? (
      <button
         disabled={disabled}
         className={`w-[90%] rounded-xl p-3 ${disabled ? 'bg-[#d3922a]' : 'bg-blue-600'}`}
         onClick={async () => {
            if (status === 'pending') {
               setOpenModal(true)
            }

            if (status === 'accepted') {
               await handleAccept('delivered', null)
            }
         }}
      >
         <p className="text-white">
            {status === 'pending' && 'Sifariş təsdiqlə'}
            {status === 'accepted' && 'Sifarişi təhvil ver'}
            {status !== 'pending' && status !== 'accepted' && translateStatus(status)}
         </p>
      </button>
   ) : (
      <div className={`w-[90%] rounded-xl bg-[#d3922a] p-3`}>
         <p className="text-center text-white">Məhsullar qəbul edilməyib</p>
      </div>
   )
}

export default StatusBtn
