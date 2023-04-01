import http from '@/utils/http/api'
// 获取
export function getRoles() {
  return http.instance.request({
    url: '/roles',
    method: 'get'
  })
}
