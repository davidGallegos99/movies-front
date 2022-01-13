import instance from "axios";
const { VITE_API_URL } = import.meta.env
const axios = instance.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
  
})
instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


  export default axios;
