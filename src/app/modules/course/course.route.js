import { Router } from "express";
import { courseService } from "./course.service.js";
import validationMiddleware from "../../helper/validateJod.js";
import { courseValidation } from "./courseValidation.js";
import { verifyToken } from "../jwt/verifyToken.js";
const router = Router();

router.post('/',verifyToken,validationMiddleware(courseValidation.courseSchema), courseService.addCourse)

router.get('/:id', courseService.getCourse)
router.get('/', courseService.getAllCourse)
router.get('/single', courseService.getSingleCourse)
router.get('/lesson/:lessonId', courseService.getLesson)
router.delete('/', courseService.deleteAllCourse)

router.delete('/lesson', courseService.deleteAllLesson)


export const courseRoute = router