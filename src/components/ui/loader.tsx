const Loader = () => {
   return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-500/20 z-50">
         <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex h-20 w-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-blue-400">
               <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-red-400"></div>
            </div>
         </div>
      </div>
   );
};

export default Loader;
