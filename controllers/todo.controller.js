import todoModel from "../models/todo.model.js";

export const createtodo = async(req,res) => {
    try{
        const {title,description} = req.body;
        if(!title || title.trim()==="") return res.status(400).json({
            success : false,
            message: "title is required",
        })
        const todo = await todoModel.create({
            title,
            description
        })
        return res.status(201).json({
            message: "Task Created Successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}