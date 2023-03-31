import http from '@/utils/http/api'
// 获取权限列表
export function getRights() {
  return http.instance.request({
    url: 'rights/list',
    method: 'get'
  })
}
