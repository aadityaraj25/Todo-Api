import express from 'express'
import { createTodo,getTodo } from '../controllers/todo.controller.js';

const route = express.Router();

// route.get("/",(req,res)=>{
//     res.send("Your TODO API is running")
// })

route.post("/add",createTodo)
route.get("/",getTodo)

export default route;
