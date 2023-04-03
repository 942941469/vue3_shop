import http from '@/utils/http/api'
// 获取订单列表
export function getOrders(data) {
  return http.instance.request({
    url: '/orders',
    method: 'get',
    params: data
  })
}
// 编辑订单
export function editOrders(id, data) {
  return http.instance.request({
    url: `/orders/${id}`,
    method: 'put',
    data
  })
}
