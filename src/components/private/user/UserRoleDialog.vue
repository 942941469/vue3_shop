<template>
  <el-dialog
    v-model="assignRoleDialogFormVisible"
    width="30%"
    title="分配权限"
    @close="dialogClose"
  >
    <el-form :model="rolesList" label-width="100px">
      <el-form-item label="用户名"> {{ username }} </el-form-item>
      <el-form-item label="当前角色: "> {{ role_name }} </el-form-item>
      <el-form-item label="分配新角色:">
        <el-select placeholder="请选择" v-model="roleId">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="assignRoleDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import { assignUserRole } from '@/api/user'
import { ElMessage } from 'element-plus'
const props = defineProps(['username', 'role_name', 'id'])
const emit = defineEmits(['getUserList'])
const store = useStore()
// 权限的值
const roleId = ref()
// 对话框的显示
const assignRoleDialogFormVisible = computed({
  get() {
    return store.state.user.assignRoleDialogFormVisible
  },
  set(newValue) {
    store.commit('user/changeUserRoleDialogVisible', newValue)
  }
})
const rolesList = computed(() => store.state.roles.rolesList)
// 获取角色列表
onMounted(() => store.dispatch('roles/getRolesList'))
// 确认
const confirm = async () => {
  console.log(props.id, roleId.value)
  const res = await assignUserRole(props.id, { rid: roleId.value })
  if (res.meta.status === 200) {
    ElMessage.success('分配权限成功')
  } else {
    ElMessage.error('分配权限失败')
  }
  assignRoleDialogFormVisible.value = false
  emit('getUserList')
}
// 清除上次的数值
const dialogClose = () => {
  roleId.value = ''
}
</script>

<style scoped></style>
