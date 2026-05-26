import mongoose, { mongo } from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, " title is required"],
            trim: true
        },    
        description: {
            type: String,
            default: ""
        },
        isCompleted: {
            type : Boolean,
            default : false
        }
    },
    { timestamps: true }
)

export default todomodel = mongoose.model("Todo",todoSchema)