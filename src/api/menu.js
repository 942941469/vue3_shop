import http from '@/utils/http/api'
// 获取菜单列表
export function getMenu() {
  return http.instance.request({
    url: '/menus',
    method: 'get'
  })
}
