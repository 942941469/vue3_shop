import http from '@/utils/http/api'
// 获取登录数据
export function getAccount(account) {
  return http.instance.request({
    url: '/login',
    method: 'post',
    data: account
  })
}
