export default function LoadingState  () {
 return  <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 animate-pulse">
   
 <div className="w-48 h-48 rounded-md bg-zinc-800" />
    <div className="mt-4 w-60 h-8 rounded-md bg-zinc-800" />
    <div className="mt-2 w-40 h-6 rounded-md bg-zinc-800" />
    <div className="mt-8 w-full flex flex-col gap-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 bg-zinc-900 p-3 rounded-lg"
        >
          <div className="w-12 h-12 rounded-md bg-zinc-700" />
          <div className="flex-1">
            <div className="h-4 bg-zinc-700 rounded w-3/4 mb-1" />
            <div className="h-4 bg-zinc-700 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  </div>
};