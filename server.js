import express from 'express';
import cors from 'cors';
import todoroute from '../Todo-App/routes/routes.todo.js'

const app = express();
const PORT=3001;

//Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api",todoroute)

//Server start point
app.listen(PORT,(req,res)=>{
    console.log(`Your API is running on ${PORT}`)
})