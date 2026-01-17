import {create } from "zustand"
import {Axios} from "../api/axiosInstance.js"
import {io } from "socket.io-client"
import { errorToaster, successToaster } from "@/widget/toaster.jsx"
import { BASE_API_URL, NODE_ENV } from "@/utils/constants.js"

const BASEURL = NODE_ENV == "development" ? "http://localhost:5001" : BASE_API_URL

export const useExamStore = create((set, get) => ({
    examStatus: null,        // scheduled | live | review | locked
    questions: [],
    startTime: null,
    timeLeft: 0,
    loading: false,
    error: null,
    exams: [],
    timeLeftSeconds: 1,
    result: 0,
    correctQuestions: [],


    addCorrectQuestion: (data) => {
        const {correctQuestions} = get()
        if(correctQuestions.includes(data)) return
        set({correctQuestions: [...correctQuestions, data]})
        console.log("correctQuestions", correctQuestions);
        
    },

    updateResult: (data) =>  {
        set({result: data})
    },

    updateExamStatus: (status) => {
        set({examStatus: status})
    },

    fetchExam: async (examID) => {
        try {
        set({ loading: true, error: null });

        const res = await Axios.get(`/api/exams/${examID}`);
        const data = res.data
        console.log("res", res);

        //if (!res.ok) throw new Error(data.message);

        if (data.status === "scheduled") {
            set({
            examStatus: "scheduled",
            startTime: new Date(data.startTime),
            questions: []
            });
        }

        if (data.status === "live") {
            console.log("live");
            
            set({
                examStatus: "live",
                questions: data.questions,
                timeLeft: data.timeLeftSeconds
            });
        }

        if (data.status === "review") {
            set({
            examStatus: "review",
            questions: data.questions
            });
        }

        if (data.status === "locked") {
            set({
            examStatus: "locked",
            questions: []
            });
        }

        } catch (err) {
        set({ error: err.message });
        } finally {
        set({ loading: false });
        }
    },

    createExam: async (data) => {
        const {exams} = get()
        try {
            const res = await Axios.post("/api/exams/new", data)
            if(res.status != 201) return errorToaster("Cannot create the Exam", res.data.message, "") 
            set({exams: [...exams, res.data]})
            successToaster("Exam Scheduled Succesfully.")
        }catch (e){
            console.log("Error creating Exam", e)
        } 
    },

    fetchExamSchedules: async () => {
        try {
            const res = await Axios.get("/api/exams/all")
            set({exams: res.data})
        }catch (e){
            console.log("Error fetching Exam schedule", e)
        } 
    },

    tick: () => {
        const { timeLeft } = get();
        if (timeLeft > 0) {
        set({ timeLeft: timeLeft - 1 });
        }
    }
}));
