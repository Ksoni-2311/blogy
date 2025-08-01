import axios from 'axios'

const BASE_URL=import.meta.env.MODE==="development"?"http://localhost:7777/":"/"

export const axiosInstance=axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})