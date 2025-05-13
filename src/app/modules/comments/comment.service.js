import mongoose from "mongoose";
import commentSchema from "../../helper/schemas/commentSchems.js";
import catchAsync from "../../helper/catchAsync.js";

const Comment = mongoose.model('Comment', commentSchema)

const addComment = catchAsync(async(req,res)=>{
    try {
        const {text,userId,lessonId} = req.body;
        const newComment =new Comment( {
            text,
            userId,
            lessonId
        });
        await newComment.save();
        res.status(201).json(newComment)

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

const getComment = catchAsync(async (req,res)=>{
    try {
        const comments = await Comment.find({lessonId : req.params.id}).populate('userId');
        res.json(comments)
    } catch (err) {
        res.status(500).json({error :  err.message})
    }
})

export const commentService = {
    addComment,
    getComment
}