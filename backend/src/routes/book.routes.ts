import express from "express";
import { ROLES } from "../constant/enum";
import BookController from "../controller/book.controller";
import { BookDto, UpdateBookDto } from "../dto/book.dto";
import { authenticateUser, authorizeUser } from "../middleware/auth.middleware";
import { validateDto } from "../middleware/RequestValidator";

const router = express.Router();
router.get("/getAll-book", BookController.getAll);
router.get("/latest-book", BookController.latestBook);
router.get("/:id", BookController.getOne);
router.get("/library/:id", BookController.getBooksByLibrary);

router.use(authenticateUser);
router.use(authorizeUser([ROLES?.SUDO_ADMIN, ROLES?.LIBRARY_ADMIN]));
router.post("/create", validateDto(BookDto), BookController.create);
router.patch("/update/:id", validateDto(UpdateBookDto), BookController.update);

export default router;
