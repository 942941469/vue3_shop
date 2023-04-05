import http from '@/utils/http/api'
// 获取分类参数
export function getAttributes(id, data) {
  return http.instance.request({
    url: `categories/${id}/attributes`,
    method: 'get',
    params: data
  })
}
// 添加分类参数
export function addAttributes(data) {
  return http.instance.request({
    url: `categories/${data.id}/attributes`,
    method: 'post',
    data
  })
}
// 删除分类参数
export function deleteAttributes(id, attrid) {
  return http.instance.request({
    url: `categories/${id}/attributes/${attrid}attrid`,
    method: 'delete'
  })
}
// 修改分类参数
export function putAttributes(data) {
  return http.instance.request({
    url: `categories/${data.id}/attributes/${data.attrid}attrid`,
    method: 'put',
    data
  })
}
