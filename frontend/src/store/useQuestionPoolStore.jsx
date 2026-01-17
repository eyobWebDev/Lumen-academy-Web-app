import {create } from "zustand"
import {Axios} from "../api/axiosInstance.js"
import toast from "react-hot-toast"
import { persist } from "zustand/middleware";
import { errorToaster, successToaster } from "@/widget/toaster.jsx"
import { BASE_API_URL, NODE_ENV } from "@/utils/constants.js"

const BASEURL = NODE_ENV == "development" ? "http://localhost:5001" : BASE_API_URL

export const useQuestionpoolStore = create(persist((set, get) => ({
    questionPools: [],
    isCreatingQuestionPool: false,
    
    fetchQuestionPool: async () => {
        try {
            const res = await Axios.get("/api/question-pool/all")
            set({questionPools: res.data})
        }catch (e){
            console.log("Error fetching Question pool", e)
        } 
    },

    createQuestionPool: async (data) => {
        set({isCreatingQuestionPool: true})
        const {questionPools} = get()
        try {
            const res = await Axios.post("/api/question-pool/new", data)
            if(res.status != 201) return errorToaster("Cannot create the Question pool", res.data.message, "") 
            set({questionPools: [...questionPools, res.data]})
            successToaster("Question Pool Created Succesfully.")
        }catch (e){
            console.log("Error creating Question Pool", e)
        } finally {
            set({isCreatingQuestionPool: true})
        }
    },

    deleteQuestionPool: async (id) => {
        const {questionPools} = get()
        try {
            const res = await Axios.post(`/api/question-pool/delete/${id}`)
            set({questionPools: questionPools.filter(pool => pool._id != id)})
            successToaster("Question Pool Deleted Deleted.")
        }catch (e){
            console.log("Error deleting Question Pool", e)
        } 
    },
}),
{
    name: "question-pool-storage"
}
))