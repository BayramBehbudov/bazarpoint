import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePointStore } from '@/stores/usePointStore'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

const Filters: React.FC = (): JSX.Element => {
   const { orders, setFilteredOrders } = usePointStore((state) => state)
   const [selectedFilters, setSelectedFilters] = useState<{ input: string | null; status: string | null }>({
      input: null,
      status: null,
   })

   useEffect(() => {
      const filteredOrders = orders.filter((order) => {
         return (
            (!selectedFilters.input ||
               order._id.toString().toLocaleLowerCase().includes(selectedFilters.input.toLocaleLowerCase())) &&
            (!selectedFilters.status || order.status === selectedFilters.status)
         )
      })
      setFilteredOrders(filteredOrders)
   }, [orders, selectedFilters])

   return (
      <div className="flex items-center gap-7 bg-slate-200 p-5">
         <Select onValueChange={(e) => setSelectedFilters({ ...selectedFilters, status: e !== 'all' ? e : null })}>
            <SelectTrigger className="w-[180px] border-none">
               <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="all">Hamısı</SelectItem>
               <SelectItem value="pending">Gözləyir</SelectItem>
               <SelectItem value="accepted">Təhvil alınıb</SelectItem>
               <SelectItem value="fullfilled">Tamamlanıb</SelectItem>
            </SelectContent>
         </Select>

         <div className="flex w-[300px] items-center rounded-md bg-white">
            <input
               type="text"
               onChange={(e) =>
                  setSelectedFilters({ ...selectedFilters, input: e.target.value ? e.target.value : null })
               }
               placeholder="ID daxil et"
               className="w-full rounded-md p-2 outline-none"
               value={selectedFilters.input || ''}
            />
            <X className="cursor-pointer" onClick={() => setSelectedFilters({ ...selectedFilters, input: null })} />
         </div>
      </div>
   )
}

export default Filters
