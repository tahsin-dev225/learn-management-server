import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  video: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Course',
    required: true
  },
}, {
  timestamps: true
});

export default lessonSchema;