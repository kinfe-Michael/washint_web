import {
  Music,
  Eye,
} from 'lucide-react';
function SongRow({ song, isHeader = false }:{song?:any,isHeader?:boolean}) {
  return (
    <div
      className={`
        grid grid-cols-5 items-center gap-4 py-3
        ${isHeader ? 'text-zinc-400 font-semibold text-xs uppercase' : 'text-zinc-200 border-t border-zinc-800'}
      `}
    >
      <div className="col-span-2 flex items-center gap-4">
        <Music className="w-4 h-4 text-zinc-500" />
        <span>{isHeader ? 'Title' : song.title}</span>
      </div>
      <div className="text-xs">{isHeader ? 'Album' : song.album}</div>
      <div className="text-xs flex items-center gap-1">
        <Eye className="w-3 h-3 md:w-4 md:h-4 text-zinc-500" />
        <span>{isHeader ? 'Streams' : song.streams}</span>
      </div>
      <div className="text-xs hidden md:block">{isHeader ? 'Release Date' : song.releaseDate}</div>
    </div>
  )
}

export default SongRow