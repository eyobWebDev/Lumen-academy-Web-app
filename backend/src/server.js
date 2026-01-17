import {config } from "dotenv"
import express from "express"
import {connectDB } from "./config/db.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import {app, io, server } from "./config/socket.js"
import path from "path"
import authRouter from "./routes/auth.routes.js"
import subjectRouter from "./routes/subject.routes.js"
import questionPoolRouter from "./routes/questionPool.routes.js"
import questionRouter from "./routes/question.routes.js"
import examRouter from "./routes/exam.routes.js"
import startExamScheduler from "./jobs/examScheduler.js"


config()

app.use(cors({
    origin: [
  "http://localhost:5173", 
],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ extended: true }))

const __dirname = path.resolve()
/* if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
} */

app.use("/api/auth", authRouter)
app.use("/api/subject", subjectRouter)
app.use("/api/question-pool", questionPoolRouter)
app.use("/api/question", questionRouter)
app.use("/api/exams", examRouter)



server.listen(process.env.PORT, () => {
    console.log("server listening on port "+process.env.PORT)
    connectDB()
    startExamScheduler(io);
})
