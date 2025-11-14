import express from "express";
import { ROLES } from "../constant/enum";
import BookController from "../controller/book.controller";
import { authenticateUser, authorizeUser } from "../middleware/auth.middleware";

const router = express.Router();
router.get("/getAll-book", BookController.getAll);
router.get("/latest-book", BookController.latestBook);
router.get("/:id", BookController.getOne);
router.get("/library/:id", BookController.getBooksByLibrary);

router.use(authenticateUser);
router.use(authorizeUser([ROLES?.SUDO_ADMIN, ROLES?.LIBRARY_ADMIN]));
router.post("/create", BookController.create);
router.patch("/update/:id", BookController.update);


export default router;
