import "dotenv/config";
import { Request, Response } from "express";
import AppDataSource from "../config/db.config";
import firebaseAdmin from "../config/firebaseConfig";
import { BLOCK_STATUS, STATUS_CODE } from "../constant/enum";
import { Auth } from "../entities/auth.enity";
import User from "../entities/user.entity";
import { genAccessToken, genRefreshToken } from "../helper/genToken";
import { comparePassword, hashPassword } from "../helper/passwordHelper";
import { AuthenticatedRequest, ILogin } from "../interface/auth.Interface";
import { createToken } from "../middleware/crsf.middleware";
import messages from "../utils/message";
import sendMail from "../utils/sendMail";

class AuthService {
  private authRepository = AppDataSource.getRepository(Auth);

  async login(body: ILogin, response: Response) {
    try {
      const { email, password } = body;
      if (!email || !password) {
        return {
          code: STATUS_CODE.BAD_REQUEST,
          status: false,
          message: messages?.errorMessages.authenticationFailed,
        };
      }

      const user = await this.authRepository
        .createQueryBuilder("auth")
        .leftJoinAndSelect("auth.user", "user")
        .leftJoinAndSelect("auth.admin", "admin")
        .leftJoinAndSelect("auth.library", "library")
        .leftJoinAndSelect("auth.libraryEmp", "libraryEmp")
        .addSelect("auth.password") // Ensure password is fetched
        .where("auth.email = :email", { email })
        .getOne();

      if (!user) {
        return {
          code: STATUS_CODE.BAD_REQUEST,
          status: false,
          message: messages?.errorMessages.authenticationFailed,
        };
      }

      if (
        user?.library?.blocked === BLOCK_STATUS.BLOCKED ||
        user?.user?.blocked === BLOCK_STATUS.BLOCKED ||
        user?.libraryEmp?.blocked === BLOCK_STATUS.BLOCKED
      ) {
        return {
          code: STATUS_CODE.BAD_REQUEST,
          status: false,
          message: messages?.errorMessages?.accountBlocked,
        };
      }

      const matchPassword = await comparePassword(password, user.password);
      if (!matchPassword) {
        return {
          code: STATUS_CODE.BAD_REQUEST,
          status: false,
          message: messages?.errorMessages.authenticationFailed,
        };
      }

      // Extract role and email properly
      const role =
        user.admin?.role ??
        user.library?.role ??
        user.user?.role ??
        user?.libraryEmp?.role;

      // Generating the tokens
      const accessToken = genAccessToken({
        email: user?.email,
        id: user.id,
        role,
      });
      const refreshToken = genRefreshToken({
        email: user?.email,
        id: user.id,
        role,
      });

      // await this.authRepository.save(user);

      // Store the tokens in cookies
      response.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });

      response.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });

      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        data: role,
        message: messages?.successMessages?.authentication.login,
      };
    } catch (error) {
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages?.errorMessages?.serverError,
      };
    }
  }

  async googleLoginService(req: Request, res: Response) {
    const idToken = req.headers.authorization?.split(" ")[1] as string;
    console.log("🚀 ~ googleLoginService: ~ idToken:", idToken);

    if (!idToken) {
      return {
        code: STATUS_CODE.BAD_REQUEST,
        status: false,
        message: "No authentication token provided",
      };
    }

    try {
      // Verify token & get user data from Firebase
      const decodedIdToken = await firebaseAdmin.auth().verifyIdToken(idToken);
      const userRecord = await firebaseAdmin.auth().getUser(decodedIdToken.uid);

      const email = userRecord?.email;
      const name = userRecord?.displayName || email?.split("@")[0];
      const firebaseUid = userRecord?.uid;
      const phoneNumber = userRecord?.phoneNumber || "";

      // ✅ Split name safely at top scope
      const [firstname = "", lastname = "", middlename = ""] = (
        name ?? ""
      ).split(" ");

      if (!email || !firebaseUid) {
        return {
          code: STATUS_CODE.BAD_REQUEST,
          status: false,
          message: "Missing required Google user data",
        };
      }

      // Try to find existing user
      let user = await this.authRepository
        .createQueryBuilder("auth")
        .leftJoinAndSelect("auth.user", "user")
        .leftJoinAndSelect("auth.admin", "admin")
        .leftJoinAndSelect("auth.library", "library")
        .leftJoinAndSelect("auth.libraryEmp", "libraryEmp")
        .addSelect("auth.password")
        .where("auth.email = :email", { email })
        .getOne();

      // If user doesn't exist, create them
      if (!user) {
        try {
          await AppDataSource.transaction(async (manager) => {
            const newUser = new User();
            newUser.firstname = firstname;
            newUser.lastname = lastname;
            newUser.middlename = middlename;
            newUser.phoneNumber = phoneNumber;

            await manager.save(newUser);

            const newAuth = new Auth();
            newAuth.email = email;
            newAuth.user = newUser;
            newAuth.firebaseId = firebaseUid;

            await manager.save(newAuth);

            user = newAuth;
          });

          // Send welcome email
          const recipientEmails = [email];
          const emailHTML = generateEmailHTML(
            email,
            firstname,
            middlename,
            lastname
          );
          const emailText = "Your account has been created";

          await sendMail(recipientEmails, emailText, emailHTML);
        } catch (dbError) {
          console.error("Database error during user creation:", dbError);
          return {
            code: STATUS_CODE.INTERNAL_SERVER_ERROR,
            status: false,
            message: "Failed to create user account",
          };
        }
      }

      if (!user) {
        return {
          code: STATUS_CODE.INTERNAL_SERVER_ERROR,
          status: false,
          message: "Failed to retrieve or create user",
        };
      }

      // Blocked user check
      if (
        user?.library?.blocked === BLOCK_STATUS.BLOCKED ||
        user?.user?.blocked === BLOCK_STATUS.BLOCKED ||
        user?.libraryEmp?.blocked === BLOCK_STATUS.BLOCKED
      ) {
        return {
          code: STATUS_CODE.BAD_REQUEST,
          status: false,
          message: messages?.errorMessages?.accountBlocked,
        };
      }

      // Determine role
      const role =
        user.admin?.role ??
        user.library?.role ??
        user.user?.role ??
        user?.libraryEmp?.role;

      // Generate tokens
      const accessToken = genAccessToken({
        email: user.email,
        id: user.id,
        role,
      });

      const refreshToken = genRefreshToken({
        email: user.email,
        id: user.id,
        role,
      });

      // Set cookies
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });

      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        data: role,
        message: messages?.successMessages?.authentication.login,
      };
    } catch (error) {
      console.error("Error during Google login:", error);
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages?.errorMessages?.serverError,
      };
    }
  }

  async signUpService(req: Request) {
    const { firstname, lastname, middlename, email, password } = req.body;

    try {
      // Check for existing user
      const existingUser = await this.authRepository.findOneBy({ email });
      if (existingUser) {
        return {
          code: STATUS_CODE.BAD_REQUEST,
          status: false,
          message: messages.errorMessages.alreadyExists,
        };
      }

      const hashedPassword = await hashPassword(password);

      // STEP 1 — Perform DB writes inside a transaction
      const { user, auth } = await AppDataSource.transaction(
        async (transaction) => {
          const user = transaction.create(User, {
            firstname,
            lastname,
            middlename,
          });
          await transaction.save(user);

          const auth = transaction.create(Auth, {
            email,
            password: hashedPassword,
            user,
          });
          await transaction.save(auth);

          return { user, auth };
        }
      );

      // STEP 2 — Email sending (outside DB transaction)
      const recipientEmails = [email];
      const emailHTML = generateEmailHTML(
        email,
        firstname,
        middlename,
        lastname
      );
      const emailText = "Your account has been created";

      try {
        await sendMail(recipientEmails, emailText, emailHTML);
      } catch (emailErr) {
        console.error("Email failed. Rolling back new user...", emailErr);

        // STEP 3 — Manual rollback if email fails
        await AppDataSource.getRepository(Auth).delete({ id: auth.id });
        await AppDataSource.getRepository(User).delete({ id: user.id });

        return {
          code: STATUS_CODE.INTERNAL_SERVER_ERROR,
          status: false,
          message: "Signup failed. Could not send confirmation email.",
        };
      }

      // STEP 4 — Final response on success
      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        message: messages.successMessages.authentication.register,
      };
    } catch (error) {
      console.log("🚀 ~ signUpService error:", error);

      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: messages.errorMessages.serverError,
      };
    }
  }

  async authorizeUser(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req?.user;
      const user = await this.authRepository
        .createQueryBuilder("auth")
        .leftJoinAndSelect("auth.user", "user")
        .leftJoinAndSelect("auth.admin", "admin")
        .leftJoinAndSelect("auth.library", "library")
        .leftJoinAndSelect("auth.libraryEmp", "libraryEmp")
        .where("auth.id = :id", { id }) // Filter by authenticated user ID
        .getOne();

      console.log("🚀 ~ authorizeUser: ~ user:", user);

      if (
        user?.admin?.blocked &&
        user?.user?.blocked &&
        user?.library?.blocked &&
        user?.libraryEmp?.blocked === BLOCK_STATUS.BLOCKED
      ) {
        return {
          code: STATUS_CODE.BAD_REQUEST,
          status: false,
        };
      }

      const role =
        user?.admin?.role ??
        user?.library?.role ??
        user?.user?.role ??
        user?.libraryEmp?.role;

      console.log("🚀 ~ authorizeUser: ~ roles:", role);

      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        data: role,
      };
    } catch (error) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      return {
        status: false,
        code: STATUS_CODE.UNAUTHORIZED,
      };
    }
  }

  async me(req: AuthenticatedRequest) {
    try {
      const { id } = req.user;

      const user = await this.authRepository
        .createQueryBuilder("auth")
        .leftJoinAndSelect("auth.user", "user")
        .leftJoinAndSelect("auth.admin", "admin")
        .leftJoinAndSelect("auth.library", "library")
        .leftJoinAndSelect("auth.libraryEmp", "libraryEmp")
        .leftJoinAndSelect("libraryEmp.employeePic", "libraryEmpPic")
        .leftJoinAndSelect("libraryEmp.library", "employeeLibrary")
        .leftJoinAndSelect("admin.profilepic", "adminPic")
        .leftJoinAndSelect("user.profilepic", "userPic")
        .leftJoinAndSelect("library.profilepic", "libraryPic")
        .where("auth.id = :id", { id })
        .getOne();

      const role =
        user?.admin?.role ??
        user?.library?.role ??
        user?.user?.role ??
        user?.libraryEmp?.role;

      // Attach role to the user

      if (!user) {
        return {
          status: STATUS_CODE.NOT_FOUND,
          message: messages?.errorMessages?.notFound,
        };
      }

      // Remove null values
      return {
        status: STATUS_CODE.SUCCESS,
        data: { ...user, role },
      };
    } catch (error) {
      console.log("🚀 ~ me: ~ error:", error);
      return {
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: messages?.errorMessages.serverError,
      };
    }
  }

  async csrfTokenService(req: Request) {
    const secret = req.cookies.csrfSecret;
    if (!secret) {
      return {
        status: false,
        message: messages?.errorMessages.serverError,
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
      };
    }

    const token = createToken(secret);

    return {
      status: true,
      data: token,
      code: STATUS_CODE.SUCCESS,
    };
  }

  async logoutService(response: Response) {
    response.clearCookie("accessToken");
    response.clearCookie("refreshToken");
    response.clearCookie("csrfSecret"); 
    return {
      status: STATUS_CODE.SUCCESS,
      message: messages?.successMessages?.authentication?.logout,
    };
  }
}

const generateEmailHTML = (
  email: string,
  firstname: string,
  middlename: string,
  lastname: string
) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Community!</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #333333;">
  <div style="max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <!-- Header Section -->
    <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="margin: 0; font-size: 24px;">Thank You for Signing Up!</h1>
    </div>
    
    <!-- Main Content -->
    <div style="padding: 20px; text-align: center;">
      <p style="font-size: 16px; line-height: 1.5;">Dear ${firstname} ${
    middlename ? middlename : ""
  } ${lastname},</p>
      <p style="font-size: 16px; line-height: 1.5;">We're thrilled to have you join our community. Get ready to explore exclusive content and stay updated with our latest news.</p>
      <a href="https://yourwebsite.com/login" style="display: inline-block; background-color: #4CAF50; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-size: 16px; margin-top: 20px;">Access Your Account</a>
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; padding: 20px; background-color: #f9f9f9; border-radius: 0 0 8px 8px; font-size: 14px; color: #666666;">
      <p style="margin: 0;">If you have any questions, feel free to <a href="https://yourwebsite.com/contact" style="color: #4CAF50; text-decoration: none;">contact us</a>.</p>
      <p style="margin: 0;">&copy; 2025 Your Company. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
};

export default new AuthService();
