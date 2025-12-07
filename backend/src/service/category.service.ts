import { Request } from "express";
import AppDataSource from "../config/db.config";
import { MEDIA_TYPE, STATUS_CODE } from "../constant/enum";
import Category from "../entities/category.entity";
import messages from "../utils/message";
import { getFromCache, setToCache } from "../utils/redisClient";
import { Slug } from "../utils/slugify";


class categoryService  {
  private categoryRepository = AppDataSource.getRepository(Category);
  async create(req: Request){
    try {
      const { name, media } = req.body;
      const existingCategory = await this.categoryRepository.findOneBy({ name });
      if (existingCategory) {
        return {
          code: STATUS_CODE.BAD_REQUEST,
          status: false,
          message: messages.errorMessages?.alreadyExists,
        };
      }

      const slug = Slug(name);

      const newCategory = this.categoryRepository.create({
        name: name,
        slug: slug,
      });

      if (media && media.mediaType === MEDIA_TYPE.CATEGORY_PIC) {
        newCategory.categoryPic = media;
      }

      await this.categoryRepository.save(newCategory);
      return {
        code: STATUS_CODE.CREATED,
        status: true,
        message: messages.successMessages?.category.create,
      };
    } catch (error) {
      console.log("🚀 ~ create genre: ~ error:", error);
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages.errorMessages?.serverError,
      };
    }
  }

  async getAll(req: Request){
    try {
      const search = req.query.search;

      const redisKey = `category:search=${search}`;
      const cached = await getFromCache(redisKey);
      if (cached) {
        return {
          code: STATUS_CODE.SUCCESS,
          status: true,
          data: cached,
        };
      }

      const query = this.categoryRepository
        .createQueryBuilder("category")
        .select(["category.id", "category.name", "category.slug"])
        .leftJoinAndSelect("category.categoryPic.", "categoryPic");

      if (search) {
        query.where("category.name LIKE :search", { search: `%${search}%` });
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
  }

  async getOne(req: Request){
    try {
      const { id } = req.params;
      const category = await this.categoryRepository.findOneBy({ id });
      if (!category) {
        return {
          code: STATUS_CODE.NOT_FOUND,
          status: false,
          message: messages.errorMessages?.notFound,
        };
      }
      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        data: category,
      };
    } catch (error) {
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages.errorMessages?.serverError,
      };
    }
  }

  async update(req: Request) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const category = await this.categoryRepository.findOneBy({ id });
      if (!category) {
        return {
          code: STATUS_CODE.NOT_FOUND,
          status: false,
          message: messages.errorMessages?.notFound,
        };
      } else {
        category.name = name;
        await this.categoryRepository.save(category);
        return {
          code: STATUS_CODE.SUCCESS,
          status: true,
          message: messages.successMessages?.category.update,
        };
      }
    } catch (error) {
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages.errorMessages?.serverError,
      };
    }
  }

  async delete(req: Request){
    try {
      const { id } = req.params;
      const existingCategory = await this.categoryRepository.findOneBy({ id });
      if (!existingCategory) {
        return {
          code: STATUS_CODE.NOT_FOUND,
          status: false,
          message: messages.errorMessages?.notFound,
        };
      }
      const result = await this.categoryRepository.delete(id);
      if (result) {
        return {
          code: STATUS_CODE.SUCCESS,
          status: true,
          message: messages.successMessages?.category.delete,
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
  }
};

export default new categoryService();
