import axios from "axios";

const instance = axios.create({});

export const apiConnector = (method,url,urlAddOns=undefined) => {
     return instance({
        method:`${method}`,
        url:`${url}`+ `${urlAddOns ? urlAddOns : ""}`,
        headers:{
         Authorization:`Bearer ${import.meta.env.VITE_API_READ_TOKEN}`
       },
     });
} 