import express from "express"
import {createSubject, deleteSubject, fetchAllSubject} from "../controllers/subject.controller.js"
import { authorizeRoles, protectedRoute } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/new", protectedRoute, authorizeRoles("admin"), createSubject)
router.get("/all-subjects", fetchAllSubject)
router.post("/delete/:id",protectedRoute, authorizeRoles("admin"), deleteSubject)


export default router