import { getStatusColor } from '@/helpers/functions'
import { translateStatus } from '@/helpers/translaters'
import { IStore } from '@/interfaces/types'

const StoreHeader = ({ store, status }: { store: IStore; status: string }): JSX.Element => {
   const { name, address, phone } = store
   return (
      <div className="flex flex-col items-center gap-2 border-b border-gray-200 pb-3">
         <div className="flex w-full flex-col">
            <h2 className="text-lg font-bold text-gray-800">{name}</h2>
            <p className="text-sm text-gray-600">{address}</p>
         </div>
         <div className="flex w-full items-start justify-start gap-2">
            <p className={`w-fit rounded-md bg-[#3e3e98] px-4 py-2 text-center text-sm font-semibold text-white`}>
               {phone}
            </p>
            <p
               style={{ backgroundColor: getStatusColor(status) }}
               className={`w-fit rounded-md px-4 py-2 text-center text-sm font-semibold text-white`}
            >
               {translateStatus(status)}
            </p>
         </div>
      </div>
   )
}

export default StoreHeader
