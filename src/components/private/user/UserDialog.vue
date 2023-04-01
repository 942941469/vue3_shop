<template>
  <el-dialog v-model="dialogFormVisible" width="30%" :title="title" @close="dialogClose">
    <el-form :model="form" :rules="addFormRules" label-width="100px" ref="formRef">
      <el-form-item label="用户名" :prop="username">
        <el-input v-model="form.username" :disabled="!usernameState" />
      </el-form-item>
      <el-form-item label="密码" :style="type" :prop="password">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { addUser, editUser } from '@/api/user'
const store = useStore()
const formRef = ref()
const emit = defineEmits(['getUserList'])
// 当前用户id
const userId = computed(() => store.state.user.userId)
// 用户的表单
const form = computed(() => store.state.user.form)
// 表单验证规则
const addFormRules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名必须在3到10位之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 10, message: '密码必须在5到10位之间', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { min: 10, max: 30, message: '请输入正确的邮箱', trigger: 'blur' },
    {
      pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
      message: '请输入正确的邮箱'
    }
  ],
  mobile: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位手机号码', trigger: 'blur' },
    {
      pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
      message: '请输入正确的手机号码'
    }
  ],
  noUsername: {},
  noPassword: {}
})
// 添加还是修改
const type = computed(() => {
  return store.state.user.type === 'add' ? '' : 'display: none'
})
// 标题
const title = computed(() => {
  return store.state.user.type === 'add' ? '添加用户' : '修改用户'
})
// 是否可以修改姓名
const usernameState = computed(() => {
  return store.state.user.type === 'add'
})
// 对验证规则的选用
const username = computed(() => {
  return store.state.user.type === 'add' ? 'username' : 'noUsername'
})
const password = computed(() => {
  return store.state.user.type === 'add' ? 'password' : 'noPassword'
})
// 对话框的显示
const dialogFormVisible = computed({
  get() {
    return store.state.user.dialogFormVisible
  },
  set(newValue) {
    store.commit('user/changeDialogFormVisible', newValue)
  }
})
// 关闭对话框,并清空表单
const dialogClose = () => {
  formRef.value.resetFields()
  store.commit('user/clearForm')
}
// 确认提交
const confirm = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return ElMessage.error('数据错误')
    if (usernameState.value) {
      const res = await addUser(form.value)
      if (res.meta.status === 201) {
        ElMessage.success('创建用户成功')
      } else {
        ElMessage.error('创建用户失败')
      }
    } else {
      const res = await editUser(userId.value, form.value)
      if (res.meta.status === 200) {
        ElMessage.success('更新用户成功')
      } else {
        ElMessage.error('更新用户失败')
      }
    }
    emit('getUserList')
    dialogFormVisible.value = false
  })
}
</script>

<style scoped></style>
