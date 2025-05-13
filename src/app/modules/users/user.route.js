import { Router } from "express";
import { userService } from "./user.service.js";
import validationMiddleware from "../../helper/validateJod.js";
import { userValidation } from "./userValidation.js";
const router = Router();


router.post('/',validationMiddleware(userValidation.createValidation),userService.addUser)

router.get('/:email', userService.getUser)

export const userRoute = router