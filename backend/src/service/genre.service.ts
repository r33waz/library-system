import { Request } from "express";
import AppDataSource from "../config/db.config";
import { MEDIA_TYPE, STATUS_CODE } from "../constant/enum";
import Genre from "../entitys/genre.entity";
import messages from "../utils/message";
import { getFromCache, setToCache } from "../utils/redisClient";
import { Slug } from "../utils/slugify";

const genreRepository = AppDataSource.getRepository(Genre);

const GenreService = {
  create: async (req: Request) => {
    try {
      const { name, media } = req.body;
      const existedGenre = await genreRepository.findOneBy({ name });
      if (existedGenre) {
        return {
          code: STATUS_CODE.BAD_REQUEST,
          status: false,
          message: messages.errorMessages?.alreadyExists,
        };
      }

      const slug = Slug(name);

      const genre = genreRepository.create({
        name: name,
        slug: slug,
      });

      if (media && media.mediaType === MEDIA_TYPE.GENRE_PIC) {
        genre.genrePic = media;
      }

      await genreRepository.save(genre);
      return {
        code: STATUS_CODE.CREATED,
        status: true,
        message: messages.successMessages?.genre.create,
      };
    } catch (error) {
      console.log("🚀 ~ create genre: ~ error:", error);
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages.errorMessages?.serverError,
      };
    }
  },

  getAll: async (req: Request) => {
    try {
      const search = req.query.search;

      const redisKey = `genres:search=${search}`;
      const cached = await getFromCache(redisKey);
      if (cached) {
        return {
          code: STATUS_CODE.SUCCESS,
          status: true,
          data: cached,
        };
      }

      const query = genreRepository
        .createQueryBuilder("genre")
        .select(["genre.id", "genre.name", "genre.slug"])
        .leftJoinAndSelect("genre.genrePic", "genrePic");

      if (search) {
        query.where("genre.name LIKE :search", { search: `%${search}%` });
      }

      const genres = await query.getMany();

      await setToCache(redisKey, genres);

      if (genres.length === 0) {
        return {
          code: STATUS_CODE.NOT_FOUND,
          status: false,
          message: messages.errorMessages?.notFound,
        };
      }

      return {
        code: STATUS_CODE.SUCCESS,
        status: false,
        data: genres,
      };
    } catch (error) {
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages.errorMessages?.serverError,
      };
    }
  },

  update: async (req: Request) => {
    try {
      const { id } = req.params;
      const { name } = req?.body;
      const genre = await genreRepository.findOneBy({ id });

      if (!genre) {
        return {
          code: STATUS_CODE.NOT_FOUND,
          status: false,
          message: messages.errorMessages?.notFound,
        };
      } else {
        genre.name = name;
        await genreRepository.save(genre);
        return {
          code: STATUS_CODE.SUCCESS,
          status: true,
          message: messages.successMessages?.genre.update,
        };
      }
    } catch (error) {
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages.errorMessages?.serverError,
      };
    }
  },

  delete: async (req: Request) => {
    try {
      const { id } = req.params;
      const existingGenre = await genreRepository.findOneBy({ id });
      if (!existingGenre) {
        return {
          code: STATUS_CODE.NOT_FOUND,
          status: false,
          message: messages.errorMessages?.notFound,
        };
      }
      const result = await genreRepository.delete(id);
      if (result) {
        return {
          code: STATUS_CODE.SUCCESS,
          status: true,
          message: messages.successMessages?.genre.delete,
        };
      } else {
        return {
          code: STATUS_CODE.NOT_FOUND,
          status: false,
          message: messages.errorMessages?.notFound,
        };
      }
    } catch (error) {
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages.errorMessages?.serverError,
      };
    }
  },
};

export default GenreService;
