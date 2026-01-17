import mongoose from "mongoose";

const questionPoolSchema = new mongoose.Schema(
    {
        subjectID: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
        },
        name: { 
            type: String, 
            required: true
        },
        description: { 
            type: String, 
            default: ""
        },
        totalQuestions: {
            type: Number
        }
    }, { timestamps: true });

const QuestionPool = mongoose.model("QuestionPool", questionPoolSchema)

export default QuestionPool