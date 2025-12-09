import { Request } from "express";
import AppDataSource from "../config/db.config";
import { MEDIA_TYPE, STATUS_CODE } from "../constant/enum";
import { Auth } from "../entities/auth.enity";
import User from "../entities/user.entity";
import { hashPassword } from "../helper/passwordHelper";
import messages from "../utils/message";
import { validatePagination } from "../utils/pegniation";

class userService {
  private userRepository = AppDataSource.getRepository(User);
  private authRepository = AppDataSource.getRepository(Auth);

  async getAllUser(req: Request) {
    const [page, perpage] = validatePagination(
      req.query.page as string,
      req.query.limit as string
    );

    const searchQuery = req.query.search;

    const queryBuilder = this.userRepository
      .createQueryBuilder("user")
      .leftJoin("user.auth", "auth")
      .leftJoin("user.profilepic", "profilepic")
      .leftJoin("user.universityCard", "profile")
      .addSelect([
        "user.created_at",
        "user.first_name",
        "user.middle_name",
        "user.last_name",
        "user.phone_number",
        "user.status",
        "user.role",
        "user.blocked",
        "user.university_id",
        "auth.email",
        "auth.createdAt",
        "profilepic.path",
        "profilepic.mediaType",
        "profilepic.type",
      ]);
    // .take(limit); // Pagination

    if (searchQuery) {
      queryBuilder
        .andWhere("auth.email LIKE:email", { email: `%${searchQuery}%` })
        .andWhere("admin.first_name LIKE:name", { name: `%${searchQuery}%` })
        .andWhere("profile.universityId LIKE:universityId", {
          universityId: `%${searchQuery}%`,
        });
    }

    const [user, count] = await queryBuilder
      .limit(perpage)
      .offset((page - 1) * perpage)
      .getManyAndCount();
    // Return the result
    if (user.length > 0) {
      return {
        status: STATUS_CODE.SUCCESS,
        message: "All users fetched successfully",
        data: user,
        totalCount: count,
        // page,
        // limit,
      };
    } else {
      return {
        status: STATUS_CODE.NOT_FOUND,
        message: "No users found",
        data: [],
        totalCount: count,
        // page,
        // limit,
      };
    }
  }

  async updateUser(req: Request) {
    try {
      const { id } = req.params;
      const {
        email,
        password,
        firstname,
        middlename,
        lastname,
        phoneNumber,
        universityId,
        media,
      } = req.body;

      const user = await this.userRepository.findOne({
        where: { id },
        relations: ["auth"],
      });
      if (!user) {
        return {
          status: STATUS_CODE.NOT_FOUND,
          message: messages?.errorMessages?.noUserFound,
        };
      }

      if (email && email !== user.auth.email) {
        const existEmail = await this.authRepository.findOneBy({ email });
        if (existEmail) {
          return {
            status: STATUS_CODE.BAD_REQUEST,
            message: messages?.errorMessages?.emailExist,
          };
        }
      }

      // Only check if universityId is provided
      if (universityId && universityId !== user.universityId) {
        const existUniversityId = await this.userRepository.findOneBy({
          universityId,
        });
        if (existUniversityId) {
          return {
            status: STATUS_CODE.BAD_REQUEST,
            message: messages?.errorMessages?.universityIdExist,
          };
        }
      }

      // Only check if phoneNumber is provided
      if (phoneNumber && phoneNumber !== user.phoneNumber) {
        const existPhoneNumber = await this.userRepository.findOneBy({
          phoneNumber,
        });
        if (existPhoneNumber) {
          return {
            status: STATUS_CODE.BAD_REQUEST,
            message: messages?.errorMessages?.phoneNumberExist,
          };
        }
      }

      const hashedPassword = password
        ? await hashPassword(password)
        : user.auth?.password;
      user.firstname = firstname ?? user.firstname;
      user.middlename = middlename ?? user.middlename;
      user.lastname = lastname ?? user.lastname;
      user.phoneNumber = phoneNumber ?? user.phoneNumber;
      user.universityId = universityId ?? user.universityId;
      user.auth.password = hashedPassword;
      user.auth.email = email ?? user.auth.email;

      if (media) {
        if (media.type === MEDIA_TYPE.PROFILE) {
          user.profilepic = media;
        }
        if (media.type === MEDIA_TYPE.UNIVERSITY_CARD) {
          user.universityCard = media;
        }
      }
      await this.userRepository.save(user);
      return {
        status: STATUS_CODE.SUCCESS,
        message: messages?.successMessages?.user?.update,
      };
    } catch (error) {
      console.log(error);
      return {
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: messages?.errorMessages?.serverError,
      };
    }
  }
}

export default new userService();
