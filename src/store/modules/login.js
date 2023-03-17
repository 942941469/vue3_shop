import { getAccount } from '@/api/login'
import { setCache } from '@/utils/token/cache'

const state = {}
const getters = {}
const mutations = {}
const actions = {
  // 登录
  async loginAction(content, account) {
    const res = await getAccount(account)
    setCache('token', res.data.token)
    if (res.meta.status !== 200) {
      throw 'error'
    }
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
