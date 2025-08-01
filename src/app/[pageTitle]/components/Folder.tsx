
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaFolder } from "react-icons/fa";

interface PlaylistFolderProps extends React.HTMLAttributes<HTMLDivElement> {
  folderName: string;
  count?: number;
  imageUrl?: string;
}

export function PlaylistFolder({
  folderName,
  count,
  className,
  imageUrl,
  ...props
}: PlaylistFolderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start relative justify-center rounded-lg p-1 cursor-pointer transition-colors duration-200",
        "bg-black hover:bg-gray-900",
        "w-32 md:w-48 md:h-64 h-48",
        className
      )}
      {...props}
    >
        
      {imageUrl ? (
        <div className="relative w-32 h-32 md:w-48 md:h-48 mb-2">
          <Image
            src={imageUrl}
            alt={`Image for ${folderName}`}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      ) : (
        <FaFolder className="w-12 h-12 mb-2 text-gray-400" />
      )}

      <p className="text-sm font-medium  truncate w-full px-1 text-gray-200">
        {folderName}
      </p>
      {count !== undefined && (
        <p className="text-xs text-gray-500">{count} items</p>
      )}
    </div>
  );
}