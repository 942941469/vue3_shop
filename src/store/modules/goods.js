import { getGoods } from '@/api/goods'
import { ElMessage } from 'element-plus'
const state = {
  // 商品数据
  goodList: [],
  // 商品数据量
  total: 0
}
const getters = {}
const mutations = {
  upDataGoodsList(state, data) {
    state.goodList = data.goods
    state.total = data.total
  }
}
const actions = {
  // 获取商品数据
  async getGoodsList({ commit }, data) {
    const res = await getGoods(data)
    if (res.meta.status === 200) {
      commit('upDataGoodsList', res.data)
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
