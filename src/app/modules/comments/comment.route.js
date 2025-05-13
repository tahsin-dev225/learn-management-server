import { Router } from "express";
import { commentService } from "./comment.service.js";

const router = Router()

router.post('/',  commentService.addComment)
router.get('/:id',  commentService.getComment)

export const commentRouter = router;