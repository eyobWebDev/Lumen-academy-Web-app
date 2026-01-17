import express from "express"
import {createSubject, deleteSubject, fetchAllSubject} from "../controllers/subject.controller.js"

const router = express.Router()

router.post("/new", createSubject)
router.get("/all-subjects", fetchAllSubject)
router.post("/delete/:id", deleteSubject)


export default router