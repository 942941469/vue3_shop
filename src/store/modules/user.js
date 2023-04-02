import { getUserFromId, getUsers } from '@/api/user'
import { ElMessage } from 'element-plus'

const state = {
  // 用户列表数据
  usersList: [],
  // 数据量
  total: 0,
  // 编辑对话框
  dialogFormVisible: false,
  // 用户角色选择对话框
  assignRoleDialogFormVisible: false,
  // 用户表单数据
  form: {
    username: '',
    email: '',
    mobile: '',
    password: ''
  },
  // 添加还是修改表单
  type: '',
  // 当前用户id
  userId: 0
}
const getters = {}
const mutations = {
  upDataUserList(state, data) {
    state.usersList = data.users
    state.total = data.total
  },
  changeDialogFormVisible(state, { visible, type }) {
    state.dialogFormVisible = visible
    state.type = type
  },
  upDataForm(state, data) {
    state.form.username = data.username
    state.form.email = data.email
    state.form.mobile = data.mobile
    state.userId = data.id
  },
  clearForm(state) {
    state.form.username = ''
    state.form.email = ''
    state.form.mobile = ''
    state.form.password = ''
    state.userId = 0
  },
  changeUserRoleDialogVisible(state, visible) {
    state.assignRoleDialogFormVisible = visible
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
  },
  // 编辑用户信息
  async editUser({ commit }, data) {
    const res = await getUserFromId(data)
    if (res.meta.status === 200) {
      commit('changeDialogFormVisible', { visible: true, type: 'edit' })
      commit('upDataForm', res.data)
    } else {
      ElMessage.error('获取数据失败')
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
