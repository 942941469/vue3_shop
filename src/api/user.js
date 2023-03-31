import http from '@/utils/http/api'
// 获取用户列表
export function getUsers(data) {
  return http.instance.request({
    url: '/users',
    method: 'get',
    params: data
  })
}
// 改变用户状态
export function changeUserStatus(uId, type) {
  return http.instance.request({
    url: `users/${uId}/state/${type}`,
    method: 'put'
  })
}
// 删除用户
export function deleteUsersFromId(id) {
  return http.instance.request({
    url: `users/${id}`,
    method: 'delete'
  })
}
