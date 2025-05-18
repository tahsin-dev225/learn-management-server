import { Router } from "express";
import { commentService } from "./comment.service.js";
import validationMiddleware from "../../helper/validateJod.js";
import { commentValidation } from "./commentValidation.js";

const router = Router()

router.post('/', validationMiddleware(commentValidation.commentSchema), commentService.addComment)
router.get('/:id',  commentService.getComment)
router.delete('/',  commentService.deleteAllComment)

export const commentRouter = router;