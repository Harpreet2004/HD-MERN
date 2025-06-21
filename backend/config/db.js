import mongoose from "mongoose"

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB Connected Successfully!!")
    } catch (error) {
        console.error("ERROR!! connecting to mongodb",error);
        process.exit(1)
    }
}