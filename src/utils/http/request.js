import axios from 'axios'
import { getCache } from '@/utils/token/cache'

class Request {
  instance
  constructor(config) {
    this.instance = axios.create(config)
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = getCache('token')
        return config
      },
      (error) => {
        return error
      }
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (error) => {
        return error
      }
    )
  }
}
export default Request
