import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    text : {
        type : String,
        require : true
    },
    userId : { 
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'User', 
        require : true
    },
    lessonId : { 
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'Lesson', 
        require : true
    },
    postedAt: {
        type: Date,
        default: Date.now 
    }
})

export default commentSchema;