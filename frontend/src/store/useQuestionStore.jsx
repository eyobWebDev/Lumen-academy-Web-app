import {create } from "zustand"
import {Axios} from "../api/axiosInstance.js"
import toast from "react-hot-toast"
import { persist } from "zustand/middleware";
import { errorToaster, successToaster } from "@/widget/toaster.jsx"
import { BASE_API_URL, NODE_ENV } from "@/utils/constants.js"

const BASEURL = NODE_ENV == "development" ? "http://localhost:5001" : BASE_API_URL

export const useQuestionStore = create(persist((set, get) => ({
    questions: [],
    isCreatingQuestion: false,
    
    fetchQuestion: async () => {
        try {
            const res = await Axios.get("/api/question/all")
            set({questions: res.data})
        }catch (e){
            console.log("Error fetching Question", e)
        } 
    },

    createQuestion: async (data) => {
        set({isCreatingQuestion: true})
        const {questions} = get()
        try {
            const res = await Axios.post("/api/question/new", data)
            if(res.status != 201) return errorToaster("Cannot create the Question", res.data.message, "") 
            set({questions: [...questions, res.data]})
            successToaster("Question Created Succesfully.")
        }catch (e){
            console.log("Error creating Question", e)
        } finally {
            set({isCreatingQuestion: true})
        }
    },

    deleteQuestion: async (id) => {
        const {questions} = get()
        try {
            const res = await Axios.post(`/api/question/delete/${id}`)
            set({questions: questions.filter(pool => pool._id != id)})
            successToaster("Question Deleted.")
        }catch (e){
            console.log("Error deleting Question Pool", e)
        } 
    },

    uploadQuestions: async (data) => {
        const {questions} = get()
        try {
            console.log("Upload started");
            
            const res = await Axios.post(`/api/question/upload`, data)
            set({questions: res.data.questions})
            successToaster(`${res.data.count} Questions Uploaded Sucesfully."`)
        }catch (e){
            console.log("Error uploading Question", e)
        } 
    },

}),
{
    name: "question-storage"
}
))