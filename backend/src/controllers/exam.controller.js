import Exam from "../models/exam.model.js";
import getExamState from "../utils/examState.js";
import Question from "../models/question.model.js";
import QuestionPool from "../models/questionPool.model.js"

export const getExam = async (req, res) => {
  const exam = await Exam.findById(req.params.id);
  const state = getExamState(exam);

  res.json({
    exam,
    state,
    serverTime: Date.now()
  });
};


export const createExam = async (req, res) => {
    const {subjectID, poolID, startTime, durationMinutes, reviewDurationMinutes} = req.body;

  try {
    const pools = []
    const start = new Date(startTime);
    const endTime = new Date(start.getTime() + durationMinutes * 60 * 1000);
    const reviewTime = new Date(endTime.getTime() + reviewDurationMinutes * 60 * 1000);

    if (!subjectID || !startTime || !durationMinutes || !reviewDurationMinutes) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (new Date(startTime) >= new Date(endTime)) {
      return res.status(400).json({ message: "Start time must be before end time" });
    }

    // Optional: validate pools exist
    
    const pool = await QuestionPool.findById(poolID);
    if (!pool) {
        return res.status(404).json({ message: `Pool not found: ${poolID}` });
    }
    pools.push({poolID: pool._id, numberOfQuestions: pool.totalQuestions})
    

    const exam = await Exam.create({
      subjectID,
      pools,
      startTime,
      endTime,
      durationMinutes,
      reviewTime,
      status: "scheduled",
      isActive: false
    });

    res.status(201).json(exam);

  } catch (error) {
    console.error("Create exam error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLiveExamQuestions = async (req, res) => {
  try {
    const { examID } = req.params;
    const now = new Date();   

    const exam = await Exam.findById(examID)
      .populate("subjectID")
      .populate("pools.poolID");

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // BEFORE START
    if (now < exam.startTime) {
      return res.status(200).json({
        status: "scheduled",
        message: "Exam has not started yet",
        startTime: exam.startTime
      });
    }

    // AFTER REVIEW WINDOW
    if (now > exam.reviewTime) {
      return res.status(403).json({
        status: "locked",
        message: "Exam review window closed"
      });
    }

    // FETCH QUESTIONS (randomized per pool)
    let questions = [];
    const size = Number(exam.pools[0].totalQuestions)

      /* const poolQuestions = await Question.aggregate([
        { $match: { poolID: exam.pools[0].poolID._id } },
        { $sample: { size: size } }
      ]); */
      const poolQuestions = await Question.find({poolID: exam.pools[0].poolID._id})

      questions.push(...poolQuestions);
      console.log("questions.", exam.pools);
      

    // DURING EXAM
    const dnow = new Date();
    const timeLeftMs = exam.endTime - dnow;
    const timeLeftSeconds = Math.max(0, Math.floor(timeLeftMs / 1000));
    if (now <= exam.endTime) {
      return res.json({
        status: "live",
        timeLeftSeconds,
        durationMinutes: exam.durationMinutes,
        questions: questions.map(q => ({
          _id: q._id,
          text: q.text,
          options: q.options,
          correctOption: q.correctOption,
          explanation: q.explanation
        }))
      });
    }

    // REVIEW MODE
    return res.json({
      status: "review",
      questions: questions.map(q => ({
        _id: q._id,
        text: q.text,
        options: q.options,
        correctOption: q.correctOption,
        explanation: q.explanation
      }))
    });

  } catch (error) {
    console.error("Live exam fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getExamSchedule = async (req, res) => {
    try {
          const examschedules = await Exam.find().sort({ name: 1 });
          res.status(200).json(examschedules)
      } catch (e) {
          console.log("Error fetching Exam", e.message)
          res.status(500).json({message: "Intenal server error"})
      }
};

