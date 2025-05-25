import { Router } from "express";
import { courseService } from "./course.service.js";
import validationMiddleware from "../../helper/validateJod.js";
import { courseValidation } from "./courseValidation.js";
import { verifyToken } from "../jwt/verifyToken.js";
const router = Router();

router.post('/',verifyToken,validationMiddleware(courseValidation.courseSchema), courseService.addCourse)
router.post('/lesson', courseService.uploadLesson)

router.get('/:id', courseService.getCourse)
router.get('/', courseService.getAllCourse)
router.get('/single', courseService.getSingleCourse)
router.get('/lessons/:id', courseService.getCourseLessons)
router.get('/lesson/:lessonId', courseService.getLesson)
router.get('/creator/:id', courseService.getCreatorsCourse)
router.get('/category/:category', courseService.getCourseCategory)

router.delete('/:id', courseService.deleteCourse)
router.delete('/lesson/:id', courseService.deleteLesson)

router.put('/lesson', courseService.updateLesson)


export const courseRoute = router