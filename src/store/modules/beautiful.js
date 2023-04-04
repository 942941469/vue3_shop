const state = {
  // 头部
  headerColor: '',
  headerIndex: 0,
  // 主体
  mainColor: '',
  mainIndex: 0
}
const getters = {}
const mutations = {
  upDataHeader(state, { color, index }) {
    state.headerColor = color
    state.headerIndex = index
  },
  upMainHeader(state, { color, index }) {
    state.mainColor = color
    state.mainIndex = index
  }
}
const actions = {}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
