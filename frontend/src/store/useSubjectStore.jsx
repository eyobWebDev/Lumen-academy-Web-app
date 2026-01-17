import {create } from "zustand"
import {Axios} from "../api/axiosInstance.js"
import { persist } from "zustand/middleware";
import { errorToaster, successToaster } from "@/widget/toaster.jsx"
import { BASE_API_URL, NODE_ENV } from "@/utils/constants.js"

const BASEURL = NODE_ENV == "development" ? "http://localhost:5001" : BASE_API_URL

export const useSubjectStore = create(persist((set, get) => ({
    subjects: [],
    isCreatingSubject: false,
    
    fetchSubjects: async () => {
        try {
            const res = await Axios.get("/api/subject/all-subjects")
            set({subjects: res.data})
        }catch (e){
            console.log("Error fetching subject", e)
        } 
    },

    createSubject: async (data) => {
        set({isCreatingSubject: true})
        const {subjects} = get()
        try {
            const res = await Axios.post("/api/subject/new", data)
            if(res.status != 201) return errorToaster("Cannot create the subject", res.data.message, "") 
            set({subjects: [...subjects, res.data]})
        }catch (e){
            console.log("Error creating subject", e)
        } finally {
            set({isCreatingSubject: true})
        }
    },

    deleteSubject: async (id) => {
        const {subjects} = get()
        try {
            const res = await Axios.post(`/api/subject/delete/${id}`)
            set({subjects: subjects.filter(subject => subject._id != id)})
            successToaster("Subject Deleted.")
        }catch (e){
            console.log("Error deleting subject", e)
        } 
    },
}),
{
    name: "subject-storage"
}
))