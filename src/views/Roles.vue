<template>
  <div>
    <el-card>
      <div class="table__header">
        <h2>角色列表</h2>
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </div>
      <el-table :data="rolesList" stripe border style="width: 100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="roleDesc" label="角色描述" />
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" @click="editRole(row)" :icon="EditPen"
              >编辑</el-button
            >
            <el-button type="danger" size="small" @click="deleteRoles(row)" :icon="Delete"
              >删除</el-button
            >
            <el-button type="warning" size="small" @click="setRoles(row, row.id)" :icon="Setting"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <RoleDialog />
    <RoleRightDialog @clearRoleKeys="clearRoleKeys" />
  </div>
</template>

<script setup>
import { EditPen, Delete, Setting } from '@element-plus/icons-vue'
import { computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import { deleteRole } from '@/api/roles'
import RoleDialog from '@/components/private/roles/RoleDialog.vue'
import RoleRightDialog from '@/components/private/roles/RoleRightDialog.vue'
const store = useStore()
// 角色列表
const rolesList = computed(() => store.state.roles.rolesList)
// 获取角色列表
onMounted(() => store.dispatch('roles/getRolesList'))
// 已拥有的角色权限
const roleKeys = reactive([])
// 删除角色
const deleteRoles = (row) => {
  ElMessageBox.confirm(`确认删除用户${row.username}吗`, '删除用户', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(async () => {
    const res = await deleteRole(row.id)
    if (res.meta.status === 200) {
      ElMessage.success('删除角色成功')
    } else {
      ElMessage.error('删除角色失败')
    }
    await store.dispatch('roles/getRolesList')
  })
}
// 添加角色
const addRole = () => {
  store.commit('roles/changeDialogFormVisible', { visible: true, type: 'add' })
}
// 编辑角色
const editRole = (row) => {
  store.commit('roles/upDataForm', row)
  store.commit('roles/changeDialogFormVisible', { visible: true, type: 'edit' })
}
// 设置角色权限
const setRoles = (row, id) => {
  getDefaultKeys(row, roleKeys)
  console.log(roleKeys)
  store.commit('roles/upDataDefaultKeys', { roleKeys, id })
  store.commit('roles/changeAssignDialogFormVisible', true)
}
// 获取角色的权限id
const getDefaultKeys = (node, arr) => {
  if (!node.children) return arr.push(node.id)
  node.children.forEach((item) => getDefaultKeys(item, arr))
}
// 清除上次权限id
const clearRoleKeys = () => {
  roleKeys.splice(0)
}
</script>

<style lang="scss" scoped>
.table__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem;
}
</style>
