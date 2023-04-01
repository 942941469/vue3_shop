<template>
  <div class="header">
    <div class="header__left">
      <div class="logo">
        <img src="@/assets/logo.png" alt="logo" />
        <span class="title">Vue3-后台管理系统</span>
      </div>
      <div class="icon">
        <el-icon :size="20" color="#fff" v-show="!isCollapse" @click="changeCollapse">
          <Expand />
        </el-icon>
        <el-icon :size="20" color="#fff" v-show="isCollapse" @click="changeCollapse">
          <Fold />
        </el-icon>
      </div>
    </div>
    <div class="header__right">
      <img src="@/assets/tx.png" alt="avatar" />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="outLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ArrowDown, Expand, Fold } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router'
import { deleteCache } from '@/utils/token/cache'
const store = useStore()
// 用户名
const username = computed(() => store.state.login.userinfo.username)
// 是否展开侧边栏
const isCollapse = computed(() => store.state.login.isCollapse)
// 展开
const changeCollapse = () => store.commit('login/upDataIsCollapse')
// 退出登录
const outLogin = () => {
  ElMessageBox.confirm('是否退出登录?', '提示', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(() => {
    ElMessage({
      type: 'success',
      message: '退出登录成功'
    })
    router.replace({ path: '/login' }).then(() => deleteCache('token'))
  })
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  &__left {
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      display: flex;
      align-items: center;
      img {
        width: 4rem;
        height: 4rem;
      }
      .title {
        margin-left: 2rem;
        color: #fff;
        font-size: 2rem;
        font-weight: 200;
      }
    }
    .icon {
      margin-left: 5rem;
      cursor: pointer;
    }
  }
  &__right {
    display: flex;
    align-items: center;
    img {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      margin-right: 2rem;
    }
    .el-dropdown-link {
      cursor: pointer;
    }
  }
}
</style>
