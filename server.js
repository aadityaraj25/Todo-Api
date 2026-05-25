import express from 'express';
import cors from 'cors';
import todoroute from '../Todo-App/routes/routes.todo.js'
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
dotenv.config() 
const PORT = process.env.PORT

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
connectDB();


// Routes
app.use("/api",todoroute)

//Server start point
app.listen(PORT,(req,res)=>{
    console.log(`Your API is running on ${PORT}`)
})