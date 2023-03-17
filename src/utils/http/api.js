import Request from './request'

const http = new Request({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
})
export default http
