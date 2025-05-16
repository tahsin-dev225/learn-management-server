import mongoose from "mongoose";
import catchAsync from "../../helper/catchAsync.js";
import enrolledSchema from "../../helper/schemas/enrolledSchema.js";
// import courseSchema from "../../helper/schemas/courseSchema.js";
const Enrolled = mongoose.model("Enrolled", enrolledSchema)
// const Course = mongoose.model("Course", courseSchema)

const addEnrolled = catchAsync(async (req,res)=>{
    try {
        const {courseId,email,price} = req.body;
        const newEnrolled = new Enrolled({courseId,email,price});
        await newEnrolled.save();

        res.status(201).json(newEnrolled);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
})

const getSingleEnrolled = catchAsync(async (req,res)=>{
    try {
        const {userId,courseId} = req.query;
        console.log(userId,courseId)
        const course = await Enrolled.find({courseId , email : userId});
        if(course){
            res.json(course);
        }
        
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

const getEnrolled = catchAsync(async (req,res)=>{
    try {
        const email = req.params.email;

        const enrolled = await Enrolled.find({email}).populate("courseId")
        res.status(200).json(enrolled);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

const deleteEnrolled = catchAsync(async (req,res)=>{
    try {
        const id = req.params.id;

        const deleted = await Enrolled.findOneAndDelete({email : id })
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


export const enrolledService = {
    addEnrolled,
    getEnrolled,
    getSingleEnrolled,
    deleteEnrolled
}