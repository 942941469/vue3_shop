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
// 添加用户
export function addUser(data) {
  return http.instance.request({
    url: '/users',
    method: 'post',
    data
  })
}
// 修改用户
export function editUser(id, data) {
  return http.instance.request({
    url: `users/${id}`,
    method: 'put',
    data
  })
}
// 分配用户权限
export function assignUserRole(id, data) {
  return http.instance.request({
    url: `users/${id}/role`,
    method: 'put',
    data
  })
}
// 根据id查询用户信息
export function getUserFromId(id) {
  return http.instance.request({
    url: `/users/${id}`,
    method: 'get'
  })
}
