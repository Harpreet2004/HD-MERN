import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
},{timestamps:true})

const UserModel = mongoose.model("User", userSchema);

export default UserModel;