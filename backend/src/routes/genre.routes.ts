import express from "express"
import { ROLES } from "../constant/enum"
import genreController from "../controller/genre.controller"
import { GenreDto } from "../dto/genre.dto"
import { authenticateUser, authorizeUser } from "../middleware/auth.middleware"
import { validateDto } from "../middleware/RequestValidator"

const router = express.Router()

router.get("/getAll",genreController.getAll)
router.use(authenticateUser)
router.use(authorizeUser([ROLES.SUDO_ADMIN, ROLES.LIBRARY_ADMIN]))
router.post("/create-genre",validateDto(GenreDto), genreController.create)
router.patch("/update-genre/:id",genreController.update)
router.delete('/delete-genre/:id',genreController.delete)



export default router