import mongoose from "mongoose";
import catchAsync from "../../helper/catchAsync.js";
import courseSchema from "../../helper/schemas/courseSchema.js";
import lessonSchema from "../../helper/schemas/lessonSchema.js";

export const Course = mongoose.model("Course", courseSchema )
export const Lesson = mongoose.model("Lesson", lessonSchema )

const addCourse = catchAsync(async (req,res)=>{
    try {
        const { name, description, image, category, lessons ,price,creator } = req.body;

        const newCourse = new Course({ name, description, image, category, price,creator });
        await newCourse.save();
        const courseId = newCourse._id;

        const lessonWithId = lessons.map(single => ({...single,courseId : courseId}));

        await Lesson.insertMany(lessonWithId)

        res.status(201).json({message : "course and lessons added successfully", courseId})

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

const deleteCourse = catchAsync(async (req, res) => {
    try {
        const id = req.params.id;

        const deletedCourse = await Course.findByIdAndDelete(id);

        if (!deletedCourse) {
        return res.status(404).json({ message: "Course not found" });
        }

        await Lesson.deleteMany({ courseId: id });

        res.status(200).json({
            message: "Course and related lessons deleted successfully",
            deletedCourse,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const deleteLesson = catchAsync(async (req, res) => {
    try {
        const id = req.params.id;

        const deletedLesson = await Lesson.findByIdAndDelete(id);

        if (!deletedLesson) {
        return res.status(404).json({ message: "Lesson not found" });
        }

        res.status(200).json({
            message: "lesson deleted successfully",
            deletedLesson
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


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

const getCourseCategory = catchAsync(async (req,res)=>{
    try {
        const category = req.params.category;
        const course = await Course.find({category : category});
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

const getCreatorsCourse = catchAsync(async (req,res)=>{
    try {
        const userId = req.params.id;
        const course = await Course.find({creator : userId });
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

const getCourse = catchAsync(async (req,res)=>{
    try {
        const course = await Course.findById(req.params.id)
        res.json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

const getCourseLessons = catchAsync(async (req,res)=>{
    try {
        const lessons = await Lesson.find({courseId : req.params.id})
        res.json(lessons);
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

const uploadLesson = catchAsync(async (req,res)=>{
    try {
        const {lessons,courseId} = req.body;
        
        const lessonWithId = lessons.map(single => ({...single,courseId : courseId}));

        await Lesson.insertMany(lessonWithId)
        res.status(201).json({message : " lessons added successfully", courseId})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

const updateLesson = catchAsync(async (req,res)=>{
    try {
       const { id, video, title } = req.body;

    if (!id || !video || !title) {
        return res.status(400).json({ message: "id, video , title needed." });
    }

    const updated = await Lesson.updateOne(
        { _id: id },
        { $set: { video, title } }
    );

        res.status(200).json({
            message: "Lesson updated successfully",
            updated,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export const courseService = {
    addCourse,
    getCourse,
    getAllCourse,
    getSingleCourse,
    getLesson,
    getCourseLessons,
    deleteCourse,
    getCreatorsCourse,
    uploadLesson,
    deleteLesson,
    updateLesson,
    getCourseCategory
}