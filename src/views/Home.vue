<template>
  <el-container>
    <el-header :style="{ backgroundColor: headerColor }"><Header /></el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'"><NavMenu /></el-aside>
      <el-main :style="{ backgroundColor: mainColor }">
        <Breadcrumb></Breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Header from '@/components/common/Header.vue'
import NavMenu from '@/components/common/NavMenu.vue'
import Breadcrumb from '@/components/common/Breadcrumb.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
// 侧边菜单的展示
const isCollapse = computed(() => store.state.login.isCollapse)
const headerColor = computed(() => store.state.beautiful.headerColor)
const mainColor = computed(() => store.state.beautiful.mainColor)
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #4338ca;
  transition: background-color 0.4s ease-in;
}
.el-main {
  background-color: #f1f2f6;
  transition: background-color 0.4s ease-in;
  overflow: hidden;
}
</style>
