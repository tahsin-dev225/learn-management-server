import mongoose from "mongoose";


const topTeacherSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required: true,
        unique: true,
    },
    title : {
        type : String,
        required: true,
        unique: true,
    },
    description : {
        type : String,
        required: true,
        unique: true,
    },
    Image : {
        type : String,
        required: true,
        unique: true,
    },
})

export default topTeacherSchema