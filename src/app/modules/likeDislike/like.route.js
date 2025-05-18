import { Router } from "express";
import { likeService } from "./like.service.js";

const router = Router();

router.post('/like', likeService.addLike)
router.get('/like', likeService.getLike)
router.get('/like/:lessonId', likeService.getAllLike)
router.delete('/like', likeService.removeLike)

router.post('/dislike', likeService.addDislike)
router.get('/dislike', likeService.getDislike)
router.get('/dislike/:lessonId', likeService.getAllDislike)
router.delete('/dislike', likeService.removeDislike)

router.delete('/', likeService.deleteAllLike)

export const likeRouter = router;