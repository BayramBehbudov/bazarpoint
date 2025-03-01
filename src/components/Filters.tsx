import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePointStore } from '@/stores/usePointStore'
import axios from 'axios'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

const Filters = (): JSX.Element => {
   const { orders, setFilteredOrders, setOrders, setPointId, setCouriers } = usePointStore((state) => state)
   const [selectedFilters, setSelectedFilters] = useState<{ input: string | null; status: string | null }>({
      input: null,
      status: null,
   })

   const refetchOrders = async () => {
      const {
         status,
         data: { point, access_token, orders, couriers },
      } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/points/login`, {
         phone: '+994509876701',
         password: 'sederekPass1',
      })
      if (status === 201 && point && access_token) {
         if (orders.length > 0) {
            setPointId(point._id)
            setOrders(orders)
         }
         if (couriers.length > 0) setCouriers(couriers)
      }
   }

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
      <div className="flex flex-wrap items-center justify-center gap-3 bg-slate-200 p-5 sm:justify-start">
         <Select onValueChange={(e) => setSelectedFilters({ ...selectedFilters, status: e !== 'all' ? e : null })}>
            <SelectTrigger className="w-[90%] border-none sm:w-[180px]">
               <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="all">Hamısı</SelectItem>
               <SelectItem value="pending">Gözləyir</SelectItem>
               <SelectItem value="accepted">Təhvil alınıb</SelectItem>
               <SelectItem value="delivered">Kuryerə təhvil verilib</SelectItem>
               <SelectItem value="fullfilled">Tamamlanıb</SelectItem>
            </SelectContent>
         </Select>

         <div className="flex w-[90%] items-center rounded-md bg-white sm:w-[180px]">
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

         <button className="w-[90%] rounded-md bg-[#3e3e98] px-4 py-2 text-white sm:w-[180px]" onClick={refetchOrders}>
            Sifarişləri yenilə
         </button>
      </div>
   )
}

export default Filters
