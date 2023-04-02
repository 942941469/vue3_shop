import http from '@/utils/http/api'
// 获取权限列表
export function getRightsList() {
  return http.instance.request({
    url: 'rights/list',
    method: 'get'
  })
}
export function getRightsTree() {
  return http.instance.request({
    url: 'rights/tree',
    method: 'get'
  })
}
