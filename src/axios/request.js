import axios from 'axios'
import router from '@/router.js'

const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

http.interceptors.request.use(res => {
  if (res.url !== '/login') {
    res.headers.Authorization = window.localStorage.getItem('token')
  }
  return res
})

http.interceptors.response.use(res => {

  if (res.data.meta.status === 401) {
    return router.replace('/login')
  }
  return res
})

export default http
