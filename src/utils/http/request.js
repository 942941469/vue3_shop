import axios from 'axios'
import { ElLoading } from 'element-plus'

class Request {
  instance
  loadingInstance
  constructor(config) {
    this.instance = axios.create(config)
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        this.loadingInstance = ElLoading.service({
          lock: true,
          text: '正在请求数据...',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        return config
      },
      (error) => {
        return error
      }
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        this.loadingInstance.close()
        return res.data
      },
      (error) => {
        return error
      }
    )
  }
}
export default Request
