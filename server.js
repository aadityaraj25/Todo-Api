import express from 'express';
import cors from 'cors';
import todoroute from '../Todo-App/routes/routes.todo.js'

const app = express();
const PORT=3001;

//Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/",todoroute)
//if we use the app.use("app") -- and in the router section router.get("/home") :: then we have to open /app/home in localhost


// //Testing Purpose --> routes are now created in routes folder
// app.get("/",(req,res)=>{
//     res.send("Todo API is running")
// })

//Server start point
app.listen(PORT,(req,res)=>{
    console.log(`Your API is running on ${PORT}`)
})