import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
    {
        examID: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
        },
        userID: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Account",
        },
        questions: [
            {
                questionID: { 
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Question",
                },
                selectedOption: {
                    type: String
                }
            }
        ],
        score: {
            type: String,
            required: true
        },
        timeTaken: {
            type: Number,
        }
    }, { timestamps: true });

const Submission = mongoose.model("Submission", submissionSchema)

export default Submission