import express from 'express'
import { createtodo } from '../controllers/todo.controller.js';

const route = express.Router();

route.get("/",(req,res)=>{
    res.send("Your TODO API is running")
})

route.post("/add",createtodo)

export default route;
