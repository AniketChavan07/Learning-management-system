import mongoose from "mongoose"

// connect to mongodb

const connectdb = async ()=>{
    mongoose.connection.on ('connected',()=> console.log("Database connected"))

    await mongoose.connect(`${process.env.MONGODB_URL}/lms`)
} 

export default connectdb     