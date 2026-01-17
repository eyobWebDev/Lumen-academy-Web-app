import {create } from "zustand"
import {Axios} from "../api/axiosInstance.js"
import toast from "react-hot-toast"
import {io } from "socket.io-client"
import { errorToaster, successToaster } from "@/widget/toaster.jsx"
import { BASE_API_URL, NODE_ENV } from "@/utils/constants.js"

const BASEURL = NODE_ENV == "development" ? "http://localhost:5001" : BASE_API_URL

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    searchedUser: [],
    isSearchingUser: false,
    isSavingClientData: false,
    clientData: [],
    
    checkAuth: async () => {
        try {
            const res = await Axios.get("/api/auth/check-auth")
            set({authUser: res.data})
            get().connectSocket()
        }catch (e){
            console.log("Error checking auth", e)
        } finally {
            set({isCheckingAuth: false})
        }
    },
    signup: async (data) => {
        set({isSigningUp: true})
        try{
            const res = await Axios.post("api/auth/signup", data)
            set({authUser: res.data})
            get().connectSocket()
            successToaster("Accounted created succcesfully!")
        }catch (e){
        errorToaster(e.response.data.message)
        } finally {
            set({isSigningUp: false})
        }
    },
    login: async (data) => {
        set({isLoggingIn: true})
        try{
            const res = await Axios.post("api/auth/login", data)
            set({authUser: res.data})
            get().connectSocket()
            successToaster("Logged in succesfully.")
        }catch (e){
        errorToaster(e.response.data.message)
        } finally {
            set({isLoggingIn: false})
        }
    },
    logout: async () => {
        set({isLoggingOut: true})
        try{
            const res = await Axios.post("api/auth/logout")
            set({authUser: null})
            get().disconnectSocket()
            successToaster("Logged out succesfully.")
        }catch (e){
        errorToaster(e.response.data.message)
        } finally {
            set({isLoggingOut: false})
        }
    },
    updateProfilePic: async (data) => {
        try{
            const res = await Axios.post("api/auth/update-profile-pic", data)
        
            if (res.status != 200){
                errorToaster("Invalid data.")
            }
            set({authUser: res.data})
            successToaster("profile picture updated succesfully.")
        }catch (e){
            console.log("Error updating profile picture.", e)
            errorToaster(e.response ?.data.message || "something went wrong.")
        }
    },
    updateProfile: async (data) => {
        try{
            const res = await Axios.post("api/auth/update-profile", data)
        
            if (res.status != 200){
                errorToaster("Invalid data.")
            }
            set({authUser: res.data})
            successToaster("profile updated succesfully.")
        }catch (e){
            console.log("Error updating profile.", e)
            errorToaster(e.response?.data.message || "something went wrong.")
        }
    },
    searchUser: async (query) => {
       
        set({isSearchingUser: true})
        try{
             const res = await Axios.get(`api/auth/search?q=${query}`)
                set({searchedUser: res.data})
        }catch (e){
            errorToaster(e.response.data.message)
        } finally {
            set({isSearchingUser: false})
        }
    },
    connectSocket: async () => {
        const socket = io(BASEURL, {
            query: {
                userId: get().authUser._id,
            }
        })
        set({socket})
        socket.connect()
        socket.on("getOnlineUsers", userId => {
            set({onlineUsers: userId})
        })
    },
    disconnectSocket: async () => {
        if(get().socket?.connected) get().socket?.disconnect()
    }
}))