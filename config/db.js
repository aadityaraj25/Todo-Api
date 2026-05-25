import { MongoClient } from "mongodb" 

let db
export const connectDB = async () => {
    const client = new MongoClient(process.env.MONGO_URL) 
    try{
        await client.connect();
        console.log("Connected to MongoDB")
        db = client.db(process.env.DB_NAME)
    }catch(err){
        console.error("Failed to connect to MongoDB", err);
        console.log(err.message);
        process.exit(1);
    }
} 

const getDB = () => db;
