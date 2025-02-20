import { usePointStore } from '@/stores/usePointStore'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Phone, X } from 'lucide-react'

interface CourierModalProps {
   isOpen: boolean
   setIsOpen: (isOpen: boolean) => void
   setSelectedCourier: (courierId: string) => void
}

const CourierModal: React.FC<CourierModalProps> = ({ setIsOpen, setSelectedCourier, isOpen }) => {
   const { couriers } = usePointStore((state) => state)
   const [animationState, setAnimationState] = useState(isOpen)

   useEffect(() => {
      if (isOpen) setAnimationState(true)
   }, [isOpen])

   const handleClose = () => {
      setAnimationState(false)
      setTimeout(() => setIsOpen(false), 300)
   }

   const handleCourierSelect = (courierId: string) => {
      setSelectedCourier(courierId)
      handleClose()
   }

   return (
      <AnimatePresence>
         {animationState && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.3 }}
               className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center"
            >
               <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 500 }}
                  className="w-full max-w-md overflow-hidden rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
               >
                  <div className="flex items-center  justify-between border-b border-gray-200 p-4">
                     <h2 className="text-xl font-semibold text-gray-800">Kuryer təyin et</h2>
                     <button
                        onClick={handleClose}
                        className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                     >
                        <X size={24} />
                     </button>
                  </div>
                  <div className="max-h-[60vh] overflow-y-auto p-4">
                     {couriers
                        .filter((courier) => courier.role === 'courier-delivery')
                        .map((courier, index) => (
                           <motion.div
                              key={courier._id + index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="group mb-3 cursor-pointer rounded-lg border border-gray-200 bg-white p-4 transition-all hover:bg-blue-50 hover:shadow-md"
                              onClick={() => handleCourierSelect(courier._id)}
                           >
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center space-x-3">
                                    <div className="rounded-full bg-blue-100 p-2 text-blue-600 group-hover:bg-blue-200">
                                       <User size={24} />
                                    </div>
                                    <div>
                                       <p className="font-medium text-gray-800 group-hover:text-blue-600">
                                          {courier.name} {courier.surname}
                                       </p>
                                       <div className="flex items-center text-sm text-gray-500">
                                          <Phone size={14} className="mr-1" />
                                          {courier.phone}
                                       </div>
                                    </div>
                                 </div>
                                 <motion.div
                                    initial={{ scale: 0 }}
                                    whileHover={{ scale: 1.1 }}
                                    className="rounded-full bg-blue-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                 >
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       className="h-4 w-4"
                                       viewBox="0 0 20 20"
                                       fill="currentColor"
                                    >
                                       <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                       />
                                    </svg>
                                 </motion.div>
                              </div>
                           </motion.div>
                        ))}
                  </div>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>
   )
}

export default CourierModal
