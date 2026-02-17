import axios from "axios";

const API=axios.create({
    baseURL: import.meta.env.VITE_API_URL,

})

const storedToken = localStorage.getItem("token");
if (storedToken) {
  API.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
}
export const setAuthToken=(token:string|null)=>{
    if(token){
        API.defaults.headers.common["Authorization"]=`Bearer ${token}`
    }
    else{
        return API.defaults.headers.common["Authorization"]
    }
}

API.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response?.status===401){
            localStorage.removeItem("token")
            window.location.href="/"
        }
        return Promise.reject(error)
    }
);

export default API