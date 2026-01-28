import express from "express"
import upload from "../config/upload.js"
import { createQuestion, deleteQuestion, fetchAllQuestion, uploadQuestion } from "../controllers/question.controller.js"
import { protectedRoute, authorizeRoles } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/new",protectedRoute, authorizeRoles("admin"), createQuestion)
router.get("/all", fetchAllQuestion)
router.post("/delete/:id", protectedRoute, authorizeRoles("admin"), deleteQuestion)
router.post("/upload", upload.single("file"), protectedRoute, authorizeRoles("admin"), uploadQuestion)


export default router