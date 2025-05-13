import mongoose from "mongoose";
import catchAsync from "../../helper/catchAsync.js";
import courseSchema from "../../helper/schemas/courseSchema.js";
import lessonSchema from "../../helper/schemas/lessonSchema.js";

const Course = mongoose.model("Course", courseSchema )
const Lesson = mongoose.model("Lesson", lessonSchema )

const addCourse = catchAsync(async (req,res)=>{
    try {
        const { name, description, image, category, lessons } = req.body;

    // Step 1: সব lesson আলাদা আলাদা save করো
    const savedLessons = await Lesson.insertMany(lessons);

    // Step 2: তাদের _id collect করো
    const lessonIds = savedLessons.map(lesson => lesson._id);

    // Step 3: Course save করো lessonIds সহ
    const newCourse = new Course({ name, description, image, category, lessonIds });
    await newCourse.save();
    res.status(201).json(newCourse)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

const getAllCourse = catchAsync(async (req,res)=>{
    try {
        const course = await Course.find();
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
const getSingleCourse = catchAsync(async (req,res)=>{
    try {
        const {userId,courseId} = req.query;
        const course = await Course.find({userId , courseId});
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

const getCourse = catchAsync(async (req,res)=>{
    try {
        const course = await Course.findById(req.params.id).populate('lessonIds');
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

const getLesson = catchAsync(async (req,res)=>{
    try {
        const lesson = await Lesson.findById(req.params.lessonId)
        res.json(lesson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export const courseService = {
    addCourse,
    getCourse,
    getAllCourse,
    getSingleCourse,
    getLesson
}