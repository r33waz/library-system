import express from "express"
import { ROLES } from "../constant/enum"
import GenreController from "../controller/genre.controller"
import { GenreDto } from "../dto/genre.dto"
import { authenticateUser, authorizeUser } from "../middleware/auth.middleware"
import { validateDto } from "../middleware/RequestValidator"

const router = express.Router()

router.get("/getAll",GenreController.getAll)
router.use(authenticateUser)
router.use(authorizeUser([ROLES.SUDO_ADMIN, ROLES.LIBRARY_ADMIN]))
router.post("/create-genre",validateDto(GenreDto), GenreController.create)
router.patch("/update-genre/:id",GenreController.update)
router.delete('/delete-genre/:id',GenreController.delete)



export default router