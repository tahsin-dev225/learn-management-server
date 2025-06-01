import { Router } from "express";
import { userService } from "./user.service.js";
import validationMiddleware from "../../helper/validateJod.js";
import { userValidation } from "./userValidation.js";
const router = Router();


router.post('/',validationMiddleware(userValidation.createValidation),userService.addUser)
router.post('/topTeacher',userService.addTopTeachers)

router.get('/:email', userService.getUser)
router.get('/all/students', userService.getAllStudent)

export const userRoute = router
