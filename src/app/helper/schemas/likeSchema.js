import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    lessonId : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true
    },
    reaction :{
        type : String,
    }
})

export default likeSchema;