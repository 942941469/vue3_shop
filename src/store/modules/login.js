import { getAccount } from '@/api/login'
import { getCache, setCache } from '@/utils/token/cache'
import { getMenu } from '@/api/menu'

const state = {
  // 用户信息
  userinfo: {},
  // 侧边栏是否展开
  isCollapse: false,
  // 菜单数据 如果刷新则使用本地存储
  menus: getCache('login').menus || [],
  // 面包屑数据
  breadcrumbList: [],
  // 当前显示标签
  activeName: ''
}
const getters = {}
const mutations = {
  // 更新用户数据
  upDataUserInfo(state, data) {
    state.userinfo = data
  },
  // 更新侧边栏状态
  upDataIsCollapse(state) {
    state.isCollapse = !state.isCollapse
  },
  // 更新菜单列表
  upDataMenus(state, data) {
    state.menus = data
  },
  // 新增面包屑数据列表
  addBreadcrumbList(state, data) {
    state.breadcrumbList.push({
      title: data.meta.title,
      path: data.path,
      name: data.meta.title
    })
  },
  // 删除面包屑数据列表
  deleteBreadcrumbList(state, index) {
    state.breadcrumbList.splice(index, 1)
  },
  // 更新当前显示标签
  upDataActiveName(state, data) {
    state.activeName = data
  }
}
const actions = {
  // 登录
  async loginAction({ commit }, account) {
    const res = await getAccount(account)
    if (res.meta.status !== 200) {
      throw 'error'
    }
    setCache('token', res.data.token)
    commit('upDataUserInfo', res.data)
    const menu = await getMenu()
    if (menu.meta.status !== 200) {
      throw 'error'
    }
    commit('upDataMenus', menu.data)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
