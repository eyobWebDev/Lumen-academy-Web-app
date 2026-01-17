import Exam from "../models/exam.model.js";

export default function startExamScheduler(io) {
  setInterval(async () => {
    const now = new Date();

    // scheduled → live
    const startingExams = await Exam.find({
      status: "scheduled",
      startTime: { $lte: now }
    });

    for (const exam of startingExams) {
      exam.status = "live";
      await exam.save();

      io.to(`exam-${exam._id}`).emit("exam:start", {
        examId: exam._id,
        serverTime: Date.now()
      });
    }

    // live → ended
    const endingExams = await Exam.find({
      status: "live",
      $expr: {
        $lte: [
          { $add: ["$startTime", { $multiply: ["$durationMinutes", 60000] }] },
          now
        ]
      }
    });

    for (const exam of endingExams) {
      exam.status = "ended";
      await exam.save();

      io.to(`exam-${exam._id}`).emit("exam:end", {
        examId: exam._id
      });
    }

  }, 30000); // every 30 sec
}
