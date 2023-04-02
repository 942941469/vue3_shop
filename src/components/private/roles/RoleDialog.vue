<template>
  <el-dialog v-model="DialogFormVisible" width="30%" :title="title" @close="dialogClose">
    <el-form :model="form" :rules="roleRules" label-width="100px" ref="formRef">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" />
      </el-form-item>
      <el-form-item label="角色描述: " prop="roleDesc">
        <el-input v-model="form.roleDesc" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="DialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { addRole, editRole } from '@/api/roles'
const formRef = ref()
const store = useStore()
// 修改的角色id
const id = computed(() => store.state.roles.id)
// 标题
const title = computed(() => {
  return store.state.roles.type === 'add' ? '添加角色' : '修改角色'
})
//编辑角色规则
const roleRules = reactive({
  roleName: [
    { required: true, message: '请输入角色名称', trigger: 'blur' },
    { min: 3, max: 10, message: '角色名称必须在3到10位之间', trigger: 'blur' }
  ],
  roleDesc: [
    { required: true, message: '请输入角色描述', trigger: 'blur' },
    { min: 4, max: 15, message: '角色描述必须在4到15位之间', trigger: 'blur' }
  ]
})
// 获取角色数据
const form = computed(() => store.state.roles.form)
// 对话框的显示
const DialogFormVisible = computed({
  get() {
    return store.state.roles.dialogFormVisible
  },
  set(newValue) {
    store.commit('roles/changeDialogFormVisible', newValue)
  }
})
// 对话框关闭
const dialogClose = () => {
  store.commit('roles/clearForm')
}
// 提交
const confirm = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return ElMessage.error('数据错误')
    if (title.value === '添加角色') {
      const res = await addRole(form.value)
      console.log(form.value)
      if (res.meta.status === 201) {
        ElMessage.success('添加角色成功')
      } else {
        ElMessage.error('添加角色失败')
      }
    } else {
      const res = await editRole(id.value, form.value)
      if (res.meta.status === 200) {
        ElMessage.success('修改角色成功')
      } else {
        ElMessage.error('修改角色失败')
      }
    }
    await store.dispatch('roles/getRolesList')
    DialogFormVisible.value = false
  })
}
</script>

<style scoped></style>
