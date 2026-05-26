import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoroute from './routes/routes.todo.js'
import {connectDB} from './config/db.js'

const PORT = process.env.PORT||3002
const app = express();

//Middleware
dotenv.config() 
app.use(cors());
app.use(express.json());

//Connect to database
connectDB()

// Routes
app.use("/api",todoroute)

//Server start point
app.listen(PORT,(req,res)=>{
    console.log(`Your API is running on ${PORT}`)
})