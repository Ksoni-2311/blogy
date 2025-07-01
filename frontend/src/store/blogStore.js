import {create} from 'zustand'
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const blogsStore=create((set,get)=>({
    myBlogs:[],
    count:0,
    blogs:[],
    isUserLoading:false,
    isblogsLoading:false,

    // currentUser:async() => {
    //     const {blogger}=get()
    //     set({isUserLoading:true})
    //     try {
    //         const res=await axiosInstance.get("/user/check")
    //         set ({blogger:res.data})
    //         console.log(res.data);
    //         await console.log(blogger);
    //     } catch (error) {
    //         console.log("error in checkAuth:",error)
    //         set({blogger:null})
    //     }finally{
    //         set({isUserLoading:false})
    //     }
    // },
    sendAblog:async (msgData) => {
        const {myBlogs}=get()
        try {
            const blogger=await axiosInstance.get("/user/check")
            const res=await axiosInstance.post(`/blog/${blogger._id}`,msgData)
            set({myBlogs:[...myBlogs,res.data.blogs]});
            console.log(myBlogs);
            
        } catch (error) {
            console.log(error);
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
        // const {myBlogs,count}=get()
        // set({isblogsLoading:true})
        try {
            const res=await axiosInstance.get("/blog/myblogs")
            console.log(res.data);
            set({myBlogs:res.data.myBlogs})
            set({count:res.data.count})
            console.log("hello");
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            // set({isblogsLoading:false})
        }
    }
}))