import http from '@/utils/http/api'
// 获取商品数据
export function getGoods(data) {
  return http.instance.request({
    url: '/goods',
    method: 'get',
    params: data
  })
}
