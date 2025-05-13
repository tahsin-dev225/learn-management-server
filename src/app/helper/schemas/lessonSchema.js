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
  id: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
});

export default lessonSchema;