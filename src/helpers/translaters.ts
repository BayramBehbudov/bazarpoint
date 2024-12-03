export const translateStatus = (text: string) => {
   switch (text) {
      case 'pending':
         return 'Gözləyir'
      case 'ready':
         return 'Satıcı hazır qeyd edib'
      case 'handOver':
         return 'Satıcı təhvil verdi'
      case 'accepted':
         return 'Təhvil alınıb'
      case 'delivered':
         return 'Kuryerə təhvil verilib'
      case 'fullfilled':
         return 'Tamamlanıb'
      default:
         return text
   }
}



export const translateAttributes = (filter: string) => {
   switch (filter) {
     case "size":
       return "Ölçü";
     case "color":
       return "Rəng";
     default:
       return filter;
   }
 };
 