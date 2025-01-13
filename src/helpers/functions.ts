export const getSlicedID = (id: string) => {
   return '#' + id.slice(id.length - 6).toUpperCase()
}

export const getStatusColor = (status: string) => {
   switch (status) {
      case 'pending':
         return '#F5A623'
      case 'accepted':
         return '#00c853'
      case 'delivered':
         return '#311b92'
      case 'fullfilled':
         return '#7ED321'
      case 'cancelled':
         return '#D32F2F'
      case 'takeOver':
         return '#00A321'
      case 'ready':
         return '#4A90E2'
      default:
         return '#787878'
   }
}


export function hoursSince(dateString: string): number {
   const now = new Date()
   const past = new Date(dateString)
   const diffInMs = now.getTime() - past.getTime()
   const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))

   return diffInHours
}

export function formatterDate(dateString: string) {
   return dateString.slice(0, 10) + '  /  ' + dateString.slice(11, 16)
}
