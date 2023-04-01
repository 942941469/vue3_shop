import { getRoles } from '@/api/roles'
import { ElMessage } from 'element-plus'
const state = {
  rolesList: []
}
const getters = {}
const mutations = {
  upDataRolesList(state, data) {
    state.rolesList = data
  }
}
const actions = {
  async getRolesList({ commit }) {
    const res = await getRoles()
    if (res.meta.status === 200) {
      commit('upDataRolesList', res.data)
      ElMessage.success('获取角色列表成功')
    } else {
      ElMessage.error('获取角色列表失败')
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
