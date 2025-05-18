import mongoose from "mongoose";
import catchAsync from "../../helper/catchAsync.js";
import likeSchema from "../../helper/schemas/likeSchema.js";

const Like = mongoose.model("Like", likeSchema)

const addLike = catchAsync(async (req,res)=>{
    try {
        const {lessonId,userId} = req.body;

        const isDisliked = await Like.find({lessonId,userId,reaction :"dislike"})
        if(isDisliked){
            await Like.deleteOne({
                userId,
                lessonId,
                reaction : "dislike"
            });
        }

        const newlike = new Like({lessonId,userId,reaction :"like"})
        await newlike.save();
        res.status(201).json(newlike)
        console.log(newlike)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

const addDislike = catchAsync(async (req,res)=>{
    try {
        const {lessonId,userId} = req.body;

        const isLiked = await Like.find({lessonId,userId,reaction :"dislike"})
        if(isLiked){
            await Like.deleteOne({
                userId,
                lessonId,
                reaction : "like"
            });
        }

            const newlike = new Like({lessonId,userId,reaction : "dislike"})
            await newlike.save();
            res.status(201).json(newlike)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

const getLike = catchAsync(async (req,res)=>{
    try {
        const {lessonId,userId} = req.query;
        const results = await Like.find({
            lessonId,
            userId,
            reaction : "like"
        });
        if(results){
            console.log(lessonId,'useid',userId)
            res.status(201).json(results)
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

const getAllLike = catchAsync(async (req,res)=>{
    try {
        const lessonId = req.params.lessonId;
        const results = await Like.find({
        lessonId,
        reaction : "like"
          });
        console.log(results)
        res.status(201).json(results.length)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

const getDislike = catchAsync(async (req,res)=>{
    try {
        const {lessonId,userId} = req.query;
        const results = await Like.find({
            userId,
            lessonId,
        reaction : "dislike"
          });
        // console.log(results)
        res.status(201).json(results)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
const getAllDislike = catchAsync(async (req,res)=>{
    try {
        const lessonId = req.params.lessonId;
        const results = await Like.find({
            lessonId,
            reaction : "dislike"
          });
        console.log(results)
        res.status(201).json(results.length)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

const removeLike = catchAsync(async (req,res)=>{
    try {
        const {lessonId,userId} = req.query;
        const result =  await Like.deleteOne({
                userId,
                lessonId,
                reaction : "like"
            });
        res.status(201).json(result)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

const removeDislike = catchAsync(async (req,res)=>{
    try {
        const {lessonId,userId} = req.query;
        const result =  await Like.deleteOne({
                userId,
                lessonId,
                reaction : "dislike"
            });
        res.status(201).json(result)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


const deleteAllLike = catchAsync(async (req,res)=>{
    try {
        // const id = req.params.id;

        const deleted = await Like.deleteMany({})
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export const likeService = {
    addLike,
    addDislike,
    getLike,
    getAllLike,
    getDislike,
    getAllDislike,
    removeLike,
    removeDislike,
    deleteAllLike,
}