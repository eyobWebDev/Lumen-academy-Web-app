import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            default: ""
        },
        password: { 
            type: String, 
            required: true,
            minLength: 6    
        },
        fullName: {
            type: String
        },
        profilePic: {
            type: String,
            default: ""
        }
    }, { timestamps: true });

const User = mongoose.model("User", userSchema)

export default User