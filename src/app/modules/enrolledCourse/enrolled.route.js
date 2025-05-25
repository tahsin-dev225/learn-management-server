import { Router } from "express";
import { enrolledService } from "./enrolled.service.js";

const router = Router();

router.post('/', enrolledService.addEnrolled )
router.post('/view', enrolledService.addViewedLesson )
router.get('/', enrolledService.getSingleEnrolled)
router.get('/top/:email', enrolledService.getTopEnrolled)
router.get('/stats/:email', enrolledService.getEnrolledStats)
router.get('/earning/:email', enrolledService.getTotalEarning)
router.post('/view', enrolledService.addViewedLesson )
router.get('/progress/:email', enrolledService.getLast3CourseProgress)
router.get('/progress', enrolledService.getProgressData)

router.get('/:email',enrolledService.getEnrolled)
router.get('/spend/:id',enrolledService.getSpend)

export const enrolledRoute = router