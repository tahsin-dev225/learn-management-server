import mongoose from 'mongoose';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.udxqu.mongodb.net/learn-management?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri)
.then(()=> console.log('connection successful'))
.catch(err => console.log(err))