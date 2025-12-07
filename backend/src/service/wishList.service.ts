import { Request } from "express";
import AppDataSource from "../config/db.config";
import { STATUS_CODE } from "../constant/enum";
import User from "../entities/user.entity";
import WishList from "../entities/wishList.entity";
import { AuthRequest } from "../interface/auth.Interface";



class WishListService{
  private  wishListRepository = AppDataSource.getRepository(WishList);
  private userRepository = AppDataSource.getRepository(User);
  async toggle(req: Request) {
    const { userId, bookId } = req.body;
    console.log("🚀 ~ toggle: ~ userId, bookId :", userId, bookId);

    try {
      // Validate input
      if (!userId || !bookId) {
        return {
          code: STATUS_CODE.BAD_REQUEST,
          status: false,
          message: "User ID and Book ID are required",
        };
      }

      // Check if the item already exists in the wishlist
      const existingWishList = await this.wishListRepository.findOne({
        where: { userId, bookId },
      });

      if (existingWishList) {
        await this.wishListRepository.remove(existingWishList);

        return {
          code: STATUS_CODE.CREATED,
          status: true,
          message: "Book removed from wishlist",
        };
      } else {
        // If the book is not in the wishlist, add it
        const newWishList = this.wishListRepository.create({
          userId,
          bookId,
          user: { id: userId },
          book: { id: bookId },
        });
        await this.wishListRepository.save(newWishList);

        // Return success response
        return {
          code: STATUS_CODE.CREATED,
          status: true,
          message: "Book added to wishlist",
        };
      }
    } catch (error) {
      // Log the error for debugging

      // Return error response
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
        message: "An error occurred while processing your request",
      };
    }
  }
  async getById(req: AuthRequest){
    try {
      const authId = req.user?.id;
      const user = await this.userRepository.findOne({
        where: { auth: { id: authId } },
        relations: ["auth"],
      });
      const wishList = await this.wishListRepository
        .createQueryBuilder("wishlist")
        .leftJoinAndSelect("wishlist.book", "book")
        .leftJoinAndSelect("book.genre", "genre")
        .leftJoinAndSelect("book.category", "category")
        .leftJoinAndSelect("book.coverImage", "coverImage")
        .where("wishlist.userId = :id", { id:user?.id })
        .getMany();
      console.log("🚀 ~ wishList:", wishList);

      return {
        code: STATUS_CODE.SUCCESS,
        status: true,
        data: wishList,
      };
    } catch (error) {
      return {
        code: STATUS_CODE.INTERNAL_SERVER_ERROR,
        status: false,
      };
    }
  }
};

export default new WishListService();
