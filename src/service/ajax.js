import axios from 'axios'
// import store from '../store'
let token=window.localStorage.getItem("token")
     

const  axiosStantce = axios.create({
     baseURL:'http://10.162.98.161:3000',
    //baseURL:'http://localhost:3000',
    withCredentials:false,    
   
    headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
        'authorization':'authorization '+token
    }
})

export default{
    post(url,data){
        return axiosStantce.post(url,data)
    },
    get(url){
        return axiosStantce.get(url)
    },
    delete(url){
        return axiosStantce.delete(url)
    },
    put(url,data){
        return axiosStantce.put(url,data)
    }
}