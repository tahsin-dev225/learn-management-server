import mongoose from "mongoose";
import catchAsync from "../../helper/catchAsync.js";
import enrolledSchema from "../../helper/schemas/enrolledSchema.js";
import userSchema from "../../helper/schemas/userSchema.js";
import viewSchema from "../../helper/schemas/viewedLesson.js";
import courseSchema from "../../helper/schemas/courseSchema.js";
import { Course, Lesson } from "../course/course.service.js";
const Enrolled = mongoose.model("Enrolled", enrolledSchema)
const User = mongoose.model("User", userSchema)
const ViewedLesson = mongoose.model("ViewedLesson", viewSchema)

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

const getSpend = catchAsync(async (req,res)=>{
    try {
        const email = req.params.id;
        let total = 0;

        const enrolled = await Enrolled.find({email})
        const totalPrice = enrolled.map(course =>  total = total + course?.price)
        res.status(200).json({totalSpend : total});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


const getTopEnrolled = catchAsync(async (req,res)=>{
    
    try {
    const email = req.params.email;

    // Step 1: Find creator's userId
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const creatorId = user._id;

    const result = await mongoose.model("Enrolled").aggregate([
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course"
        }
      },
      { $unwind: "$course" },
      {
        $match: {
          "course.creator": creatorId
        }
      },
      {
        $group: {
          _id: "$courseId",
          totalEnrolled: { $sum: 1 },
          course: { $first: "$course" }
        }
      },
      { $sort: { totalEnrolled: -1 } },
      { $limit: 3 },
      {
        $project: {
          _id: 0,
          courseId: "$_id",
          name: "$course.name",
          totalEnrolled: 1,
          price: "$course.price",
          image : "$course.image"
        }
      }
    ]);

    res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

const getEnrolledStats =  catchAsync(async (req,res)=>{
    try {
        const email = req.params.email;

        const instructor = await User.findOne({ email });

        if (!instructor) {
        return res.status(404).json({ message: "Instructor not found" });
        }

        const instructorId = instructor._id;

        const result = await Enrolled.aggregate([
        {
            $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course"
            }
        },
        { $unwind: "$course" },

        {
            $match: {
            "course.creator": instructorId
            }
        },

        {
            $group: {
            _id: "$courseId",
            courseName: { $first: "$course.name" },
            courseImage: { $first: "$course.image" },
            totalEnrollments: { $sum: 1 }
            }
        },

        { $sort: { totalEnrollments: -1 } },
        { $limit: 10 }
        ]);

    res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

const getTotalEarning = catchAsync(async (req, res) => {
    try {
        const email = req.params.email;

        // Step 1: Instructor খুঁজে বের কর email দিয়ে
        const instructor = await User.findOne({ email });

        if (!instructor) {
        return res.status(404).json({ message: "Instructor not found" });
        }

        const instructorId = instructor._id;

        // Step 2: Enrolled Collection-এ aggregate
        const result = await Enrolled.aggregate([
        {
            $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course"
            }
        },
        { $unwind: "$course" },

        // Step 3: Instructor এর বানানো কোর্স গুলো ফিল্টার করো
        {
            $match: {
            "course.creator": instructorId
            }
        },

        // Step 4: Total earning count
        {
            $group: {
            _id: null,
            totalEarning: { $sum: "$price" },
            totalEnrollments: { $sum: 1 }
            }
        }
        ]);

        const data = result[0] || { totalEarning: 0, totalEnrollments: 0 };

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const addViewedLesson = catchAsync(async (req,res)=>{
    try {
        const { courseId, userId, lessonId } = req.body;

        const isExistView = await ViewedLesson.findOne({ courseId, userId, lessonId });

        if (!isExistView) {
            const newViewed = new ViewedLesson({ courseId, userId, lessonId });
            await newViewed.save();

            return res.status(201).json(newViewed);
        }

        res.status(400).json({ message: "Lesson already exists" });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
})

const getLastThreeEnrolled = catchAsync(async (req,res)=>{
    try {
        const { email } = req.params.email;
        const enrolled = await Enrolled.find({ email: email })
        .sort({ createdAt: -1 })
        .limit(3);

        res.status(200).json({enrolled})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

const getProgressData = catchAsync(async (req, res) => {
    try {
        const {courseId, userId} = req.query;
        const totalLessons = await Lesson.countDocuments({ courseId });

        const viewedLessons = await ViewedLesson.countDocuments({ courseId, userId });

        res.status(200).json({ totalLessons, viewedLessons });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const getLast3CourseProgress = catchAsync(async (req, res) => {
  try {
    const email = req.params.email;
    const currentUser = await User.findOne({ email });

        if (!currentUser) {
        return res.status(404).json({ message: "Instructor not found" });
        }

        const userId = currentUser._id;

    const enrolled = await Enrolled.find({ email: email }) 
      .sort({ createdAt: -1 })
      .limit(3);

    const courseIds = enrolled.map((e) => e.courseId);

    // Step 2: For each course, count total lessons and viewed lessons
    const coursesWithProgress = await Promise.all(
    courseIds.map(async (courseId) => {
            const totalLessons = await Lesson.countDocuments({ courseId });
            const viewedLessons = await ViewedLesson.countDocuments({ courseId, userId });

            const courseInfo = await Course.findById(courseId).select("name image");

            return {
                courseId,
                courseName: courseInfo?.name || "Unknown",
                courseImage: courseInfo?.image || "",
                totalLessons,
                viewedLessons,
                progressPercent: totalLessons ? Math.round((viewedLessons / totalLessons) * 100) : 0,
            };
        })
    );

    res.status(200).json(coursesWithProgress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// const deleteEnrolled = catchAsync(async (req,res)=>{
//     try {
//         const id = req.params.id;

//         const deleted = await Enrolled.findOneAndDelete({email : id })
//         res.status(200).json(deleted);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// })


export const enrolledService = {
    addEnrolled,
    getEnrolled,
    getSingleEnrolled,
    getSpend,
    getTopEnrolled,
    getEnrolledStats,
    getTotalEarning,
    addViewedLesson,
    getLast3CourseProgress,
    getProgressData
}