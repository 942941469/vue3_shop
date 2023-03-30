import http from '@/utils/http/api'

export function getMenu() {
  return http.instance.request({
    url: '/menus',
    method: 'get'
  })
}
