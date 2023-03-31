import { getUsers } from '@/api/user'
import { ElMessage } from 'element-plus'

const state = {
  // 用户列表数据
  usersList: [],
  // 数据量
  total: 0
}
const getters = {}
const mutations = {
  upDataUserList(state, data) {
    state.usersList = data.users
    state.total = data.total
  }
}
const actions = {
  // 获取用户列表数据
  async getUsersList({ commit }, data) {
    const res = await getUsers(data)
    if (res.meta.status === 200) {
      ElMessage.success('获取用户列表成功')
      commit('upDataUserList', res.data)
    } else {
      ElMessage.error('获取用户列表失败')
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
