<template>
  <div class="login">
    <el-row>
      <el-col :span="16" class="login__left">
        <h1>后台管理系统vue3</h1>
      </el-col>
      <el-col :span="8" class="login__right">
        <div class="login__right-content">
          <h1>欢迎回来</h1>
          <el-form
            ref="loginFormRef"
            status-icon
            :model="loginForm"
            :rules="loginRules"
            label-width="0"
          >
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                size="large"
                placeholder="请输入用户名"
                :prefix-icon="Avatar"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                size="large"
                placeholder="请输入密码"
                type="password"
                :prefix-icon="Key"
              />
            </el-form-item>
          </el-form>
          <el-button class="login__right-btn" @click="login">登录</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { Avatar, Key } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const loginFormRef = ref()
const store = useStore()
const router = useRouter()
// 表单
const loginForm = reactive({
  username: 'admin',
  password: '123456'
})
// 表单验证规则
const loginRules = reactive({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 4, max: 12, message: '账号要在4-12个数字之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '密码要在6-12个数字之间', trigger: 'blur' }
  ]
})
// 登录
const login = () => {
  loginFormRef.value?.validate((valid) => {
    if (valid) {
      store
        .dispatch('login/loginAction', loginForm)
        .then(() => {
          router.push({ name: 'home' })
          ElMessage.success('登录成功')
        })
        .catch(() => ElMessage.error('登录失败'))
    } else {
      ElMessage.warning('请输入正确的信息')
    }
  })
}
const onKeyDown = (e) => {
  if (e.key === 'Enter') {
    login()
  }
}
onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  .el-row {
    height: 100%;
  }
  &__left,
  &__right {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  // 渐变背景
  &__left {
    background-image: linear-gradient(to right bottom, rgba(#7ed56f, 0.2), rgba(#28b485, 0.2)),
      url('~@/assets/img.png');
    background-size: cover;
    h1 {
      font-size: 3.5rem;
    }
  }
  &__right {
    background-image: linear-gradient(to right bottom, rgba(#ffb900, 0.1), #ff7730);
    h1 {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }
    &-btn {
      width: 100%;
      background-color: #626aef;
      color: wheat;
      border-radius: 1rem;
      border: 1px solid gray;
      box-shadow: 0 1rem 2rem rgba(#000, 0.2);
      &:hover {
        transform: translateY(-3px);
      }
    }
  }
}
</style>
