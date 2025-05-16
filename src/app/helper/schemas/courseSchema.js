import mongoose from "mongoose";


const courseSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        default : 0,
        required : true
    },
    lessonIds: [ 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Lesson"
        }
      ],
    creator : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
})

export default courseSchema;