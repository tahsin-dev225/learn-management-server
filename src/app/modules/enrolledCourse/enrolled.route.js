import { Router } from "express";
import { enrolledService } from "./enrolled.service.js";

const router = Router();

router.post('/', enrolledService.addEnrolled )
router.get('/', enrolledService.getSingleEnrolled)

router.get('/:email',enrolledService.getEnrolled)
router.delete('/:id',enrolledService.deleteEnrolled)

export const enrolledRoute = router