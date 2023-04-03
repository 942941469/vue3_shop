import http from '@/utils/http/api'
// 获取商品分类
export function getCategories(data) {
  return http.instance.request({
    url: '/categories',
    method: 'get',
    params: data
  })
}
// 删除商品分类
export function deleteCategories(id) {
  return http.instance.request({
    url: `categories/${id}`,
    method: 'delete'
  })
}
// 添加商品分类
export function addCategories(data) {
  return http.instance.request({
    url: 'categories',
    method: 'post',
    data
  })
}
