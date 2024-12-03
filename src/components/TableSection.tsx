import DialogSection from './DialogSection'
import { IOrder } from '@/interfaces/types'
import Table from './ui/Table'
import { translateStatus } from '@/helpers/translaters'

interface ITableSection {
   filteredOrders: IOrder[]
}

const TableSection: React.FC<ITableSection> = ({ filteredOrders }): JSX.Element => {
   const header = ['ID', 'Status', 'Tarix', 'Müştəri', '']
   const body = filteredOrders.map((item: IOrder) => {
      const { _id, status, createdAt, customer } = item

      return {
         id: '#' + _id.toString().slice(-6),
         status: translateStatus(status),
         date: createdAt.toLocaleString().slice(0, 10),
         customer: customer.name + ' ' + customer.surname,
         action: <DialogSection order={item} />,
      }
   })
   return <Table className="p-4" headers={header} body={body} />
}

export default TableSection
