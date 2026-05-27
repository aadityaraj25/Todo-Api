import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoroute from './routes/routes.todo.js'
import {connectDB} from './config/db.js'
import { errorHandler } from './middlewares/error.middleware.js';

const PORT = process.env.PORT||3002
const app = express();

//Middleware
dotenv.config() 
app.use(cors());
app.use(express.json());

//Connect to database
connectDB()

// Routes
app.use("/api/todos",todoroute)

// error handler middleware
app.use(errorHandler)

//Server start point
app.listen(PORT,(req,res)=>{
    console.log(`Your API is running on ${PORT}`)
})