interface ITable {
   headers: string[]
   body: any[]
   className?: string
}

const Table: React.FC<ITable> = ({ headers, body, className }): JSX.Element => {
   return (
      <div className={`mmd:overflow-auto w-full ${className}`}>
         <table className="min-w-full overflow-y-auto bg-gray-100 text-gray-800">
            <thead className="rounded-2xl shadow-md">
               <tr>
                  {headers.map((header) => (
                     <th
                        key={header}
                        className="px-6 py-3 text-center text-sm font-medium uppercase tracking-wider text-gray-500"
                     >
                        {header}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody className="text-sm font-medium tracking-wider text-gray-500">
               {body?.map((row) => (
                  <tr key={Math.random() * 10000} className="border-b-2 text-center">
                     {Object.entries(row).map(([key, value]: any) => (
                        <td
                           key={Math.random() * 10000}
                           className={`px-4 py-3 ${key === 'accept' && 'flex items-center justify-center'}`}
                        >
                           {value}
                        </td>
                     ))}
                     {}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   )
}

export default Table
