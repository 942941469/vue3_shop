<template>
  <el-container>
    <el-header><Header /></el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'"><NavMenu /></el-aside>
      <el-main>
        <Breadcrumb></Breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Header from '@/components/Header.vue'
import NavMenu from '@/components/NavMenu.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const isCollapse = computed(() => store.state.login.isCollapse)
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #7ed56f;
}
.el-main {
  background-color: #f1f2f6;
}
</style>
