import todoModel from "../models/todo.model.js";
import mongoose from "mongoose";
import { asyncHandler } from "../middlewares/asyncHandler.js";


export const createTodo = asyncHandler(async(req,res) => {
    const {title,description} = req.body;
    if(!title || title.trim()==="") return res.status(400).json({
        success : false,
        message: "title is required",
    })
    const todo = await todoModel.create({
        title,
        description
    })

    console.log("Todo created successfully")
    return res.status(201).json({
        success : true,
        message: "Todo Created Successfully",
        todo
    })
})

export const getTodo = asyncHandler(async(req,res) => {
    const {search,sort,page=1,limit=10} = req.query;

    //query
    const query = {}
    if(search){
        query.title = {$regex: search, $options: "i"}  // i is for case insensitive search
    }

    //sort
    const sortOption = {}
    if(sort==="asc") sortOption.createdAt=1
    else sortOption.createdAt = -1; //default

    //skip
    const skip = (page-1)*limit

    const todosdata = await todoModel.find(query)
                                .sort(sortOption)
                                .skip(skip)
                                .limit(parseInt(limit));

    const totaltodos = await todoModel.countDocuments(query)

    console.log("Todos Fetched Successfully")
    res.status(200).json({
        success: true,
        message: "Todos fechted successfully",
        totaltodos:totaltodos,
        page : Number(page),
        limit : Number(limit),
        data : todosdata
    });
})

export const getTodobyID = asyncHandler(async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success:false,
            message: "Invalid todo Id"  
        })
    }
    const todoData =await todoModel.findById(id);
    if(!todoData){
        return res.status(404).json({
            success:false,
            message: "Todo not found"
        })
    }

    console.log("Todo fetched successfully")
    return res.status(200).json({
        success:true,
        message: "Todo fetched successfully",
        data: todoData
    })
})

export const updateTodo = asyncHandler(async(req,res) => {
    const {id} = req.params
    const {title, description} = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success:false,
            message: "Invalid todo Id"  
        })
    }
    if(!title || title.trim()===""){
        return res.status(400).json({
            success:false,
            message: "Title is required"  
        }) 
    }
    const todoData =await todoModel.findByIdAndUpdate(
        id,
        {title,description},
        {new : true, runValidators: true}
    );
    if(!todoData){
        return res.status(404).json({
            success:false,
            message: "Todo not found"
        })
    }

    console.log("Todo updated successfully")
    return res.status(200).json({
        success:true,
        message: "Todo updated successfully",
        data: todoData
    })
})

export const toggleTodobyId = asyncHandler(async (req,res) => {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success:false,
                message: "Invalid todo Id"  
            })
        }
        const todoData = await todoModel.findById(id)
        if(!todoData){
            return res.status(404).json({
                success:false,
                message: "Todo not found"
            })
        }

        //toggle the isCompleted field
        todoData.isCompleted = !todoData.isCompleted
        await todoData.save();

        console.log("Todo toggled successfully")
        return res.status(200).json({
            success:true,  
            message: "Todo toggled successfully",
            data: todoData
        })
})

export const deleteTodo = asyncHandler(async (req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success:false,
            message: "Invalid todo Id"  
        })
    }

    //delete todo
    const todoData = await todoModel.findByIdAndDelete(id)

    if(!todoData){
        return res.status(404).json({
            success:false,
            message: "Todo not found"
        })
    }
    console.log("Todo Deleted Successfully")
    return res.status(200).json({
        success:true,  
        message: "Todo Deleted successfully",
        data: todoData
    })
})