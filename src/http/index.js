import axios from 'axios'
import store from '@/store'
const http  = axios.create({
    baseURL:"https://rhobertty-api.herokuapp.com/api",
    headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
    }
})

http.interceptors.request.use(
    (config)=>{
        const token = store.state.token
        if(token){
            config.headers['x-access-token'] = `${token}`
        }
        return config
    },
    (err)=>{
        return Promise.reject(err)
    }
)

export default http