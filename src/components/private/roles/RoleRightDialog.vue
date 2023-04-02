<template>
  <el-dialog v-model="assignDialogFormVisible" width="30%" title="分配权限" @close="dialogClose">
    <el-tree
      :props="treeProps"
      show-checkbox
      ref="treeRef"
      node-key="id"
      default-expand-all
      :default-checked-keys="defaultKeys"
      :data="rightsList"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="assignDialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { getRightsTree } from '@/api/rights'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { assignRole } from '@/api/roles'
const emit = defineEmits(['clearRoleKeys'])
// 权限列表
let rightsList = ref([])
const treeRef = ref()
// 当前修改角色id
const id = computed(() => store.state.roles.id)
const store = useStore()
// 已拥有的角色权限
const defaultKeys = computed(() => store.state.roles.defaultKeys)
// 对话框的显示
const assignDialogFormVisible = computed({
  get() {
    return store.state.roles.assignDialogFormVisible
  },
  set(newValue) {
    store.commit('roles/changeAssignDialogFormVisible', newValue)
  }
})
// 树形控件参数
const treeProps = reactive({
  // 显示哪一项
  label: 'authName',
  // 指定子树为节点对象的某个属性值
  children: 'children'
})
// 获取树形控件数据
onMounted(async () => {
  const res = await getRightsTree()
  if (res.meta.status === 200) {
    rightsList = res.data
    ElMessage.success('获取权限列表成功')
  } else {
    ElMessage.error('获取权限列表失败')
  }
})
// 清空数据
const dialogClose = () => {
  // 清空树
  treeRef.value.setCheckedKeys([])
  emit('clearRoleKeys')
  store.commit('roles/clearDefaultKeys')
}
// 确认
const confirm = async () => {
  const keys = [...treeRef.value.getCheckedKeys(), ...treeRef.value.getHalfCheckedKeys()]
  const res = await assignRole(id.value, { rids: keys.join(',') })
  if (res.meta.status === 200) {
    ElMessage.success('分配角色成功')
    await store.dispatch('roles/getRolesList')
  } else {
    ElMessage.error('分配角色失败')
  }
  assignDialogFormVisible.value = false
}
</script>

<style scoped></style>
