import { getRights } from '@/api/rights'
import { ElMessage } from 'element-plus'
const state = {
  // 权限列表
  rights: []
}
const getters = {}
const mutations = {
  upDataRights(state, data) {
    state.rights = data
  }
}
const actions = {
  // 获取权限列表
  async getRightsList({ commit }) {
    const res = await getRights()
    if (res.meta.status === 200) {
      commit('upDataRights', res.data)
      ElMessage.success('获取权限列表成功')
    } else {
      ElMessage.error('获取权限列表失败')
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
