import mongoose from 'mongoose'

export const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected sucessfully")
    }
    catch(error){
        console.log("Error Occured !")
        console.error(error.message)
        print.exit(1)
    }
}