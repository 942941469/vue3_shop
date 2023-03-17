import http from '@/utils/http/api'

export function getAccount(account) {
  return http.instance.request({
    url: '/login',
    method: 'post',
    data: account
  })
}
