import http from '@/utils/http/api'
// 获取角色列表
export function getRoles() {
  return http.instance.request({
    url: '/roles',
    method: 'get'
  })
}
//修改角色
export function editRole(id, data) {
  return http.instance.request({
    url: `roles/${id}`,
    method: 'put',
    data
  })
}
// 删除角色
export function deleteRole(id) {
  return http.instance.request({
    url: `roles/${id}`,
    method: 'delete'
  })
}
// 添加角色
export function addRole(data) {
  return http.instance.request({
    url: `roles`,
    method: 'post',
    data
  })
}
// 分配角色权限
export function assignRole(roleId, data) {
  return http.instance.request({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data
  })
}
