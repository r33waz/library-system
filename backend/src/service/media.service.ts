import AppDataSource from "../config/db.config";
import { STATUS_CODE } from "../constant/enum";
import Media from "../entities/media.entity";
import { uploadResult } from "../middleware/multer";

const MediaService = {
  uploadMedia: async (files: any | any[], mediaType?: string) => {

    if (!files || (Array.isArray(files) && files.length === 0)) {
      throw new Error("No file(s) uploaded.");
    }

    try {
      // Upload files to Cloudinary (or storage)
      const uploadedFiles = Array.isArray(files)
        ? await Promise.all(files.map((file) => uploadResult(file)))
        : [await uploadResult(files)];

      // Save media in the database
      const mediaRecords = await AppDataSource.transaction(async (transactionalEntityManager) => {
        return Promise.all(
          uploadedFiles.map(async (file) => {
            const media = new Media();
            media.path = file?.url;
            media.name = file?.name;
            media.type = file?.type;
            media.mediaType = mediaType || "";
            await transactionalEntityManager.save(media);
            return {
              id: media.id,
              path: media.path,
              mediaType,
              type: media.type,
            };
          })
        );
      });


      return {
        statusCode: STATUS_CODE.CREATED,
        data: mediaRecords,
      };
    } catch (error) {
      console.error("Error in media upload:", error);
      throw new Error("Error uploading file(s) to Cloudinary.");
    }
  },
};

export default MediaService;
