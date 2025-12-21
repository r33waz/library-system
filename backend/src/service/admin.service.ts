import { Request } from "express";
import AppDataSource from "../config/db.config";
import { BLOCK_STATUS, STATUS_CODE } from "../constant/enum";
import Admin from "../entities/admin.entity";
import { Auth } from "../entities/auth.enity";
import Library from "../entities/library.entity";
import { hashPassword } from "../helper/passwordHelper";
import messages from "../utils/message";

class AdminService {
  // Private repositories to encapsulate them within the class
  private adminRepository = AppDataSource.getRepository(Admin);
  private authRepository = AppDataSource.getRepository(Auth);
  private libraryRepository = AppDataSource.getRepository(Library);

  async create(req: Request) {
    try {
      const {
        email,
        password,
        name,
        description,
        number,
        media,
        city,
        state,
        street,
      } = req.body;

      const existingEmail = await this.authRepository.findOneBy({ email });
      if (existingEmail)
        return {
          status: false,
          code: STATUS_CODE.BAD_REQUEST,
          message: messages?.errorMessages?.alreadyExists,
        };

      const hashedPassword = await hashPassword(password);

      await AppDataSource.transaction(async (transactionalEntityManager) => {
        const library = new Library();
        library.name = name;
        library.description = description;
        library.phoneNumber = number;
        library.city = city;
        library.street = street;
        library.state = state;
        if (media) {
          library.profilepic = media;
        }
        await transactionalEntityManager.save(library);

        const auth = new Auth();
        auth.email = email;
        auth.password = hashedPassword;
        auth.library = library;
        auth.blocked = BLOCK_STATUS.ACTIVE;
        auth.isEmailVerified = true;
        await transactionalEntityManager.save(auth);
      });

      return {
        status: true,
        code: STATUS_CODE.CREATED,
        message: messages?.successMessages?.libraryAdmin?.create,
      };
    } catch (error) {
      return {
        status: false,
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: messages?.errorMessages?.serverError,
      };
    }
  }
  // Method to get all admins
  async getAllAdmin(req: Request) {
    const searchQuery = req.query.search;

    const queryBuilder = this.adminRepository
      .createQueryBuilder("admin")
      .leftJoin("admin.auth", "auth")
      .leftJoin("admin.profilepic", "profilepic")
      .addSelect([
        "admin.created_at",
        "admin.first_name",
        "admin.middle_name",
        "admin.last_name",
        "admin.phone_number",
        "admin.status",
        "admin.role",
        "admin.blocked",
        "auth.email",
        "auth.createdAt",
        "profilepic.path",
        "profilepic.mediaType",
        "profilepic.type",
      ]);

    if (searchQuery) {
      queryBuilder
        .where("auth.email LIKE :email", { email: `%${searchQuery}%` })
        .andWhere("admin.first_name LIKE :name", { name: `%${searchQuery}%` });
    }

    const [admin, count] = await queryBuilder.getManyAndCount();

    if (admin.length > 0) {
      return {
        status: true,
        data: admin,
        totalCount: count,
        code: STATUS_CODE.SUCCESS,
      };
    } else {
      return {
        status: true,
        data: [],
        totalCount: count,
        code: STATUS_CODE.NOT_FOUND,
      };
    }
  }

  // Method to get all libraries
  async getAllLibraries(req: Request) {
    try {
      const searchQuery = req.query.search;

      const queryBuilder = this.libraryRepository
        .createQueryBuilder("library")
        .select([
          "library.id",
          "library.name",
          "library.description",
          "library.phoneNumber",
          "library.status",
          "library.blocked",
          "library.created_at",
        ])
        .leftJoin("library.auth", "auth")
        .addSelect(["auth.email"])
        .leftJoin("library.profilepic", "media")
        .addSelect(["media.path", "media.type", "media.name"])
        .orderBy("library.created_at", "DESC");

      if (searchQuery) {
        queryBuilder
          .where("auth.email LIKE :email", { email: `%${searchQuery}%` })
          .andWhere("library.name LIKE :name", { name: `%${searchQuery}%` });
      }

      const [libraries, count] = await queryBuilder.getManyAndCount();

      if (libraries.length > 0) {
        return {
          status: true,
          code: STATUS_CODE.SUCCESS,
          data: libraries,
          totalCount: count,
        };
      } else {
        return {
          status: true,
          code: STATUS_CODE.NOT_FOUND,
          data: [],
          totalCount: count,
        };
      }
    } catch (error) {
      return {
        status: false,
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: messages?.errorMessages?.networkError,
      };
    }
  }

  // Method to create a new library admin

  // Method to update library status
  // async updateStatus(req: Request) {
  //   try {
  //     const { id } = req.params;
  //     const { status, blocked } = req.body;
  //     const library = await this.libraryRepository.findOneBy({ id });
  //     if (!library) {
  //       return {
  //         code: STATUS_CODE.NOT_FOUND,
  //         status: false,
  //         message: messages?.errorMessages?.notFound,
  //       };
  //     } else {
  //       library.status = status ? status : library.status;
  //       library.blocked = blocked ? blocked : library.blocked;
  //       await this.libraryRepository.save(library);
  //     }
  //     return {
  //       code: STATUS_CODE.SUCCESS,
  //       status: true,
  //       message: messages?.successMessages?.libraryAdmin?.update,
  //     };
  //   } catch (error) {
  //     return {
  //       code: STATUS_CODE.SUCCESS,
  //       status: false,
  //       message: messages?.successMessages?.libraryAdmin?.update,
  //     };
  //   }
  // }
}

export default new AdminService();
