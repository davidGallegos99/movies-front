import { useEffect, useState } from 'react';
import axios from '../config/axios.js'
const initialState = {
    loading: false,
    data:null,
    error:false
}
export const UseFetch = () => {
    const [state, setstate] = useState(initialState);

    useEffect(() => {
      
      return () => {
        setstate({})
      }
    }, [])
     const request = async (options) => {
        const {method, url, body} = options;
        if(url) {
            try {
                setstate({
                    ...state,
                    loading:true
                })
                const axiosResponse = await axios[method](url, method !== 'get' && body);
                    setstate({
                        error:false,
                        data: axiosResponse.data,
                        loading:false
                    })
            } catch (error) {
                setstate({
                    data: null,
                    error:error,
                    loading: false
                })
            }
        }
    }
    return [state,request];
}

