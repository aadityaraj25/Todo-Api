import express from 'express'
import { createTodo,getTodo,getTodobyID,updateTodo, toggleTodobyId, deleteTodo} from '../controllers/todo.controller.js';

const route = express.Router();

// route.get("/",(req,res)=>{
//     res.send("Your TODO API is running")
// })

//routes
route.post("/add",createTodo)
route.get("/",getTodo)
route.get("/:id",getTodobyID)
route.put("/:id",updateTodo)
route.patch("/:id/toggle",toggleTodobyId)
route.delete("/:id",deleteTodo) 

export default route;
