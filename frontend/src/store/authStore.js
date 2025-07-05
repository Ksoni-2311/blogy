import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import {toast} from "react-hot-toast"

export const authUserStore=create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isCheckingAuth:false,
    isUpdatingProfile:false,

    checkAuth:async() => {
        set({isCheckingAuth:true})
        try {
            const res=await axiosInstance.get("/user/check")
            set ({authUser:res.data})
            
        } catch (error) {
            console.log("error in checkAuth:",error)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }

    },
    signup:async (data) => {
        console.log(data);
        set({isSigningUp:true})
        try {
            const res=await axiosInstance.post("/user/signup",data)
            set({authUser:res.data})
            toast.success("Account has been created successfully")
            return
        } catch (error) {
            console.log("error in login",error);
            toast.error(error?.response?.data?.message || error.message);
        }finally{
            set({isSigningUp:false})
        }
    },
    login:async (data) => {
        set({isLoggingIn:true})
        try {
            const res=await axiosInstance.post("/user/login",data)
            set({authUser:res.data})
            toast.success("Logged In Successfully")
        } catch (error) {
            console.log("error in login",error);
            toast.error(error?.response?.data?.message || error.message);
        }finally{
            set({isLoggingIn:false})
        }
    },
    logout:async () => {
        try {
            await axiosInstance.post("/user/logout")
            set({authUser:null})
            toast.success("logged Out Successfully")

        } catch (error) {
            toast.error(error?.response?.data?.message || error.message);
        }
    },
    updateUserInfo:async (data) => {
        set({isUpdatingProfile:true})
        try {
            const res=await axiosInstance.put("/user/update-profile",data)
            set({authUser:res.data})
            toast.success("Profile Updated Successfully")
        } catch (error) {
            console.log("error in updateUserInfo",error);
            toast.error(error?.response?.data?.message || error.message);
        }finally{
            set({isUpdatingProfile:false})
        }
    }

}))