import express from 'express'
import cors from 'cors';
const app = express();
import dotenv from 'dotenv'
import router from './src/app/router/route.js';
dotenv.config()
const PORT = process.env.PORT || 5000;


app.use(
    cors({
      origin: ["https://learn-management-frontend.vercel.app",
        
        "http://localhost:3000"
      ],
      credentials: true,
    })
);

import mongoose from 'mongoose';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.udxqu.mongodb.net/learn-management?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri)
.then(()=> console.log('connection successful'))
.catch(err => console.log(err))

app.use(express.json());

app.use("/api/v1", router);

app.get('/', (req,res)=>{
    res.json({message : "Welcome to the Learning management server."})
})


app.listen(PORT , ()=>{
    console.log("Server is running on port ",PORT)
})