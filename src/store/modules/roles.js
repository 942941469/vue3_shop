import { getRoles } from '@/api/roles'
import { ElMessage } from 'element-plus'
const state = {
  // 权限列表
  rolesList: [],
  // 角色表单数据
  form: {
    roleName: '',
    roleDesc: ''
  },
  // 对话框的显示
  dialogFormVisible: false,
  // 添加还是修改表单
  type: '',
  // 当前修改角色id
  id: 0,
  // 已拥有的角色权限
  defaultKeys: [],
  // 分配权限列表对话框
  assignDialogFormVisible: false
}
const getters = {}
const mutations = {
  upDataRolesList(state, data) {
    state.rolesList = data
  },
  changeDialogFormVisible(state, { visible, type }) {
    state.dialogFormVisible = visible
    state.type = type
  },
  upDataForm(state, data) {
    state.form.roleName = data.roleName
    state.form.roleDesc = data.roleDesc
    state.id = data.id
  },
  clearForm(state) {
    state.form.roleName = ''
    state.form.roleDesc = ''
    state.id = 0
  },
  upDataDefaultKeys(state, { roleKeys, id }) {
    state.defaultKeys = roleKeys
    state.id = id
  },
  changeAssignDialogFormVisible(state, visible) {
    state.assignDialogFormVisible = visible
  },
  clearDefaultKeys(state) {
    state.defaultKeys = []
  }
}
const actions = {
  // 获取权限列表
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
