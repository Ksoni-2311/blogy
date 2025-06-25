import {create} from 'zustand'
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const blogsStore=create((set,get)=>({
    myBlogs:[],
    blogs:[],
    user:[],
    isUserLoading:false,
    isblogsLoading:false,
    selectedUser:null,
    setSelecteduser:(user) => {
        set({selectedUser:user})
        console.log(user);
    },
    sendAblog:async (msgData) => {
        const {myBlogs,selectedUser}=get()
        try {
            const res=await axiosInstance.post(`/blog/${selectedUser._id}`,msgData)
            set({myBlogs:[...myBlogs,res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    getAllBlogs:async (vlogData) => {
        set({isblogsLoading:true})
        try {
            const res=await axiosInstance.get("/blog/explore",vlogData);
            set({blogs:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
             set({isblogsLoading:false})
        }
    },
    getUserAllBlogs:async () => {
        set({isblogsLoading:true})
        try {
            const res=await axiosInstance.get("/blog/my-blogs")
            set({myBlogs:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isblogsLoading:false})
        }
    }
}))