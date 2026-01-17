import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
        },
        email: { 
            type: String, 
            required: true 
        }
    }, { timestamps: true });

const Account = mongoose.model("Account", accountSchema)

export default Account