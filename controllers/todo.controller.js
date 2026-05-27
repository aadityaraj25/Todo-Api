import todoModel from "../models/todo.model.js";

export const createTodo = async(req,res) => {
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
        console.log("Task created successfully")
        return res.status(201).json({
            success : true,
            message: "Task Created Successfully",
            todo
        })
    }
    catch(error){
        console.log("Error occured",error.message)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}



export const getTodo = async(req,res) => {
    try{
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

        res.status(200).json({
            success: true,
            message: "Todos fechted successfully",
            totaltodos:totaltodos,
            page : Number(page),
            limit : Number(limit),
            data : todosdata
        });
    }
    catch(error){
        console.log("Error occured",error.message)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}