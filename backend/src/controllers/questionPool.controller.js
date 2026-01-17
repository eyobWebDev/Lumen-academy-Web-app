import QuestionPool from "../models/questionPool.model.js"

export const createQuestionPool = async (req, res) => {
    const {subjectID, name, description, totalQuestions} = req.body

    try {
        const newQuestionPool = new QuestionPool({name, subjectID, description, totalQuestions})
        newQuestionPool.save()
        if (newQuestionPool) {
            res.status(201).json(newQuestionPool)
        } else {
            res.status(400).json({message: "Invalid Data"})
        }
    } catch (e) {
        console.log("Error creating Question Pool", e.message)
        res.status(500).json({message: "Intenal server error"})
    }
}

export const fetchAllQuestionPools = async (req, res) => {
    try {
        const questionPools = await QuestionPool.find().sort({ name: 1 });
        res.status(200).json(questionPools)
    } catch (e) {
        console.log("Error fetching Question Pool", e.message)
        res.status(500).json({message: "Intenal server error"})
    }
}

export const deleteQuestionPool = async (req, res) => {
  try {
    const { id } = req.params;
    
    await QuestionPool.findByIdAndDelete(id);
    res.json({ message: "Question Pool deleted successfully" });
  } catch (e) {
    console.log("Error deleting Question Pool", e.message)
    res.status(500).json({ error: "Failed to delete subject" });
  }
};