import { Request } from "express";
import AppDataSource from "../config/db.config";
import { STATUS_CODE } from "../constant/enum";
import { Auth } from "../entities/auth.enity";
import Library from "../entities/library.entity";
import { LibraryEmp } from "../entities/libraryEmp.entity";
import Media from "../entities/media.entity";
import { hashPassword } from "../helper/passwordHelper";
import messages from "../utils/message";
import runInTransaction from "../utils/transaction";

class LibraryService {
  private libraryRepository = AppDataSource.getRepository(Library);
  // private authRepository = AppDataSource.getRepository(Auth);
  private libraryEmpRepository = AppDataSource.getRepository(LibraryEmp);
  private mediaRepository = AppDataSource.getRepository(Media);

  async create(req: Request) {
    const {
      email,
      password,
      firstname,
      middlename,
      lastname,
      phoneNumber,
      media,
      library_id,
    } = req.body;

    if (!library_id) {
      return {
        code: STATUS_CODE.BAD_REQUEST,
        status: false,
        message: "Library ID is required.",
      };
    }

    try {
      await runInTransaction(async (manager) => {
        const authRepo = manager.getRepository(Auth);
        const libraryEmpRepo = manager.getRepository(LibraryEmp);
        const libraryRepo = manager.getRepository(Library);

        const existingEmployee = await authRepo.findOne({ where: { email } });
        if (existingEmployee) {
          return {
            code: STATUS_CODE.BAD_REQUEST,
            status: false,
            message: messages?.errorMessages?.alreadyExists,
          };
        }

        const library = await libraryRepo.findOne({
          where: { id: library_id },
        });
        if (!library) {
          return {
            code: STATUS_CODE.BAD_REQUEST,
            status: false,
            message: messages?.errorMessages?.notFound,
          };
        }

        const hashedPassword = await hashPassword(password);
        const newAuth = authRepo.create({ email, password: hashedPassword });
        await authRepo.save(newAuth);

        const newLibraryEmpData: Partial<LibraryEmp> = {
          firstname,
          middlename,
          lastname,
          phoneNumber,
          auth: newAuth,
          library,
        };

        if (media) {
          newLibraryEmpData.employeePic = media;
        }

        const newLibraryEmp = libraryEmpRepo.create(newLibraryEmpData);
        await libraryEmpRepo.save(newLibraryEmp);
      });

      return {
        code: STATUS_CODE.CREATED,
        status: true,
        message: messages.successMessages.employee?.create,
      };
    } catch (error: any) {
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages.errorMessages.serverError,
      };
    }
  }

  async getOne(req: Request) {
    try {
      const { id } = req.params;
      const library = await this.libraryRepository
        .createQueryBuilder("library")
        .leftJoin("library.auth", "auth")
        .addSelect("auth.email")
        .leftJoinAndSelect("library.profilepic", "profilepic")
        .where("library.id = :id", { id })
        .getOne();

      if (!library) {
        return {
          code: STATUS_CODE.NOT_FOUND,
          status: false,
          message: messages.errorMessages?.notFound,
        };
      }
      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        data: library,
      };
    } catch (error) {
      console.log("🚀 ~ getOne: ~ error:", error);
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages.errorMessages?.serverError,
      };
    }
  }

  // async getAllEmployees(req: AuthenticatedRequest) {
  //   const authId = req.user.id; // Get the authId from the authenticated user

  //   try {
  //     const queryBuilder = await this.authRepository
  //       .createQueryBuilder("auth")
  //       .leftJoinAndSelect("auth.library", "library") // Left join to get the related library entity
  //       .where("auth.id = :authId", { authId }) // Filter by the given authId
  //       .getOne(); // Fetch the record for the given authId

  //     if (!queryBuilder || !queryBuilder.library) {
  //       return {
  //         code: STATUS_CODE.NOT_FOUND,
  //         status: false,
  //         message: "Library not found for this authId.",
  //       };
  //     }

  //     // Use the libraryId from the retrieved library to get the employees
  //     const libraryId = queryBuilder.library.id;

  //     // Fetch all employees associated with this libraryId
  //     const employees = await this.libraryEmpRepository
  //       .createQueryBuilder("libraryEmp")
  //       .leftJoin("libraryEmp.auth", "auth") // Join the related 'auth' entity
  //       .leftJoin("libraryEmp.employeePic", "media") // Join the related 'media' entity
  //       .select([
  //         "libraryEmp.id",
  //         "libraryEmp.firstname",
  //         "libraryEmp.lastname",
  //         "libraryEmp.middlename",
  //         "libraryEmp.phoneNumber",
  //         "libraryEmp.status",
  //         "libraryEmp.role",
  //         "libraryEmp.blocked",
  //         "auth.email", // Explicitly add the auth.email field to the selection
  //         "media.path",
  //         "media.type",
  //         "media.name",
  //       ]) // Add 'email' from the 'auth' entity
  //       .where("libraryEmp.libraryId = :libraryId", { libraryId }) // Filter by libraryId
  //       .getMany();
  //     console.log("🚀 ~ getAllEmployees: ~ employees:", employees);
  //     return {
  //       code: STATUS_CODE.SUCCESS,
  //       status: false,
  //       data: employees,
  //     };
  //   } catch (error) {
  //     return {
  //       code: STATUS_CODE.INTERNAL_SERVER_ERROR,
  //       status: false,
  //       message: "Something went wrong while fetching employees.",
  //     };
  //   }
  // }

  async getOneEmp(req: Request) {
    try {
      const { id } = req.params;
      console.log("🚀 ~ getOneEmp: ~ id:", id);
      const result = await this.libraryEmpRepository
        .createQueryBuilder("libraryEmp")
        .select([
          "libraryEmp.id",
          "libraryEmp.firstname",
          "libraryEmp.lastname",
          "libraryEmp.middlename",
          "libraryEmp.phoneNumber",
          "libraryEmp.status",
          "libraryEmp.role",
          "libraryEmp.blocked",
          "library.name",
        ])
        .leftJoin("libraryEmp.auth", "auth")
        .addSelect("auth.email")
        .leftJoin("libraryEmp.library", "library")
        .addSelect(["library.id", "library.name"])
        .leftJoin("libraryEmp.employeePic", "media")
        .addSelect(["media.path", "media.type", "media.name"])
        .where("libraryEmp.id = :id", { id })
        .getOne();
      console.log("🚀 ~ getOneEmp: ~ result:", result);

      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        data: result,
      };
    } catch (error) {
      console.error(error);
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: "Something went wrong while fetching employee.",
      };
    }
  }

  async update(req: Request) {
    try {
      const { id } = req.params;
      const {
        name,
        description,
        phoneNumber,
        media,
        email,
        password,
        city,
        street,
        state,
      } = req.body;
      console.log(
        "🚀 ~ update: ~ name, description, phoneNumber, media, email, password:",
        name,
        description,
        phoneNumber,
        media,
        email,
        media,
        password
      );

      // find the library by id
      const library = await this.libraryRepository.findOne({
        where: { id },
        relations: ["auth"],
      });

      if (!library) {
        return {
          code: STATUS_CODE.NOT_FOUND,
          status: false,
          message: messages?.errorMessages?.notFound,
        };
      } else {
        const hashedPassword = password
          ? await hashPassword(password)
          : library.auth?.password;

        library.name = name ?? library.name;
        library.description = description ?? library.description;
        library.phoneNumber = phoneNumber ?? library.phoneNumber;
        library.auth.email = email ?? library.auth?.email;
        if (media) {
          // Find existing media linked to this library
          const existingMedia = await this.mediaRepository.findOne({
            where: { libraryProfile: { id: id } },
          });

          if (existingMedia && existingMedia.id !== media.id) {
            // Unlink the existing media from this library
            await this.mediaRepository.delete(existingMedia.id);
          }

          // Now assign new media as profilepic
          library.profilepic = media;
        }
        library.auth.password = hashedPassword;
        library.city = city ?? library.city;
        library.street = street ?? library.street;
        library.state = state ?? library.state;
        await this.libraryRepository.save(library);

        return {
          code: STATUS_CODE.SUCCESS,
          status: true,
          message: messages?.successMessages?.libraryAdmin?.update,
        };
      }
    } catch (error) {
      console.log("🚀 ~ update: ~ error:", error);
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages?.errorMessages?.serverError,
      };
    }
  }
}

export default new LibraryService();
