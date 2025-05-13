import mongoose from "mongoose";

const enrolledSchema = new mongoose.Schema({
    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    },
    email : {
        type : String,
        required : true
    },
    price: {
        type: Number,
        required: true,
    },
})

export default enrolledSchema;