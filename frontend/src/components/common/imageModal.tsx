
import { X } from "lucide-react";

function ImageModal({
  image,
  className,
  setShowImage,
}: {
  image: string;
  className?: string;
  setShowImage: (show: boolean) => void; // Fixed: Changed from () => void to (show: boolean) => void
}) {
  return (
    <>
      <div
        onClick={() => setShowImage(false)} // Fixed: Now properly calls setShowImage with false
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      >
        <div
          className="relative"
          onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking on image
        >
          <button
            onClick={() => setShowImage(false)} // Fixed: Now properly calls setShowImage with false
            className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>
          <img
            src={image}
            alt="Image"
            className={`max-w-screen max-h-screen object-contain ${className}`}
          />
        </div>
      </div>
    </>
  );
}

export default ImageModal;