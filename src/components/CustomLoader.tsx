'use client'

interface CustomLoaderProps {
   visible: boolean
   message: string
   messageColor?: string
}

const CustomLoader = ({ visible, message, messageColor = '#fff' }: CustomLoaderProps) => {
   if (!visible) return null

   return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50">
         <div className="border-primary h-12 w-12 animate-spin rounded-full border-b-2 border-t-2"></div>
         <p className="mt-4 text-center font-medium" style={{ color: messageColor }}>
            {message}
         </p>
      </div>
   )
}

export default CustomLoader
