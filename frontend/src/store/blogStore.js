import {create} from 'zustand'
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { socket } from '../lib/socket.js';

export const blogsStore=create((set,get)=>({
    myBlogs:[],
    count:0,
    TotalLike:0,
    isLiked:false,
    selectedBlog:null,
    blogs:[],
    isUserLoading:false,
    isblogsLoading:false,
    currentPage: 1,
    totalPages: 1,

    
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
   getAllBlogs: async (page = 1) => {
        set({ isblogsLoading: true });
        try {
            const res = await axiosInstance.get("/blog/explore", {
            params: { limit: 15, page },
            });

            // Append if page > 1, replace if page === 1
            set((state) => ({
            blogs: page === 1 ? res.data.blogs : [...state.blogs, ...res.data.blogs],
            isblogsLoading: false,
            totalPages: res.data.totalPages,
            currentPage: res.data.currentPage,
            count: res.data.total,
            }));
        } catch (err) {
            console.error("Error fetching blogs:", err);
            set({ isblogsLoading: false });
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
    },
    editABlog:async (blogId,UpdatedBlog) => {
        
        set({isblogsLoading:false})
        try {
            const res=await axiosInstance.put(`/blog/editBlog/${blogId}`,UpdatedBlog);
            set({selectedBlog:res.data})
        } catch (error) {
            console.log("error in edit a blog Frontend");
            toast.error(error.response.data.message)
        }
        finally{
            set({isblogsLoading:false})
        }
    },
    viewABlog:async (id) => {
        set({isblogsLoading:true})
        try {
            const res=await axiosInstance.get(`/blog/viewBlog/${id}`);
            set({selectedBlog:res.data})
            set({isLiked:res.data.islike})
        } catch (error) {
            console.log("error in edit a blog Frontend");
            toast.error(error.response.data.message)
        }
        finally{
            set({isblogsLoading:false})
        }
    },
    deleteBlog:async (id) => {
        set({isblogsLoading:true})
        try {
            const res=await axiosInstance.post(`/blog/delete/${id}`)
            if(res.data===true){
                res.data='';
                toast.success("Blog Deleted Successfully")
                return
            }
        } catch (error) {
            console.log(error?.message);
            toast.error("Currently unable to delete blog ")
        }
        finally{
            set({isblogsLoading:false})
        }
    },
    likeButton: async (id) => {
  try {
    const res = await axiosInstance.post(`/blog/like/${id}`);
    const { likedByUser, likesCount } = res.data;

    set((state) => ({
      isLiked: likedByUser,
      TotalLike: likesCount,
      selectedBlog: {
        ...state.selectedBlog,
        likes: new Array(likesCount).fill('liked'), // fake array just to reflect count
      },
    }));

    socket.emit("like", id);
  } catch (error) {
    toast.error("Something went wrong please try again later");
  }
}
,
  syncLike: (id) => {
    // Refresh blog or like count on receiving update
    const selected = get().selectedBlog;
    if (selected && selected._id === id) {
      get().viewABlog(id);
      get().totLikeCount(id);
    }
}   
}))