import mongoose from "mongoose";
import catchAsync from "../../helper/catchAsync.js";
import userSchema from "../../helper/schemas/userSchema.js"
const User = mongoose.model("User",userSchema)
const TopTeacher = mongoose.model("TopTeacher",userSchema)

const addUser = catchAsync(async(req,res)=>{
    try {
        const { name, email,role } = req.body;
        console.log(name,email,role,'kahy')
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "User already exists with this email." });

        const newUser = new User({ name, email,role });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
})


const getUser = catchAsync(async (req,res)=>{
    try {
        const { email } = req.params;
        const result = await User.findOne({ email });

        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})
const getAllStudent = catchAsync(async (req,res)=>{
    try {
        // const student = 
        const result = await User.countDocuments({ role : 'student' });

        
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

const addTopTeachers = catchAsync(async(req,res)=>{
    try {
        const { name, email,title,description,image } = req.body;

        const existing = await TopTeacher.findOne({ email });
        if (existing) return res.status(400).json({ message: "User already exists with this email." });

        const newTopTeacher = new TopTeacher({ name, email,title, description,image });
        await newTopTeacher.save();

        res.status(201).json(newTopTeacher);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
})

export const userService = {
    addUser,
    getUser,
    getAllStudent,
    addTopTeachers
}