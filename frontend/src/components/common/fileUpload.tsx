import { endPoints } from "@/data/env.data";
import { ILibraryData } from "@/interface/library.interface";
import { photo_url } from "@/service";
import { X } from "lucide-react";

interface UploadedFile {
  id: string;
  url: string;
  filename: string;
  size: number;
  mediaType: string;
}
export const uploadImage = async ({
  file,
  mediaType,
}: {
  file: File;
  mediaType?: string;
}): Promise<UploadedFile[]> => {
  const formData = new FormData();
  formData.append("files", file);
  if (mediaType) {
    formData.append("mediaType", mediaType);
  }

  const response = await photo_url.post(endPoints?.upload, formData);
  const uploaded = response.data.data;

  console.log("🚀 Uploaded files:", uploaded);

  // Return a single object or array of objects
  return uploaded.length === 1 ? uploaded[0] : uploaded;
};

interface ImagePreviewProps {
  library: ILibraryData | null;
  setFile: (file: File | null) => void;
  previewUrl: string | null;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  setFile,
  previewUrl,
  library,
}) => {
  const initial = library?.name?.[0]?.toUpperCase() ?? "L";
  const defaultImage = library?.profilepic?.path ?? null;

  const imageToShow = previewUrl || defaultImage;

  return (
    <div className="flex flex-col items-center space-y-2 relative">
      <input
        type="file"
        accept="image/*"
        id="image-upload"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          setFile(file);
        }}
      />

      <label
        htmlFor="image-upload"
        className="cursor-pointer w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 flex items-center justify-center bg-gray-300 dark:bg-gray-700 text-white text-4xl font-bold select-none"
        title="Click to select image"
      >
        {imageToShow ? (
          <img
            src={imageToShow}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initial}</span>
        )}
      </label>

      {(previewUrl || defaultImage) && (
        <div
          className="absolute top-0 right-0 cursor-pointer text-red-500 bg-white rounded-full p-0.5 shadow"
          onClick={() => setFile(null)}
        >
          <X size={16} />
        </div>
      )}
    </div>
  );
};
