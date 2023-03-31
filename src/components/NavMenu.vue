<template>
  <el-menu :default-active="route.path" :collapse-transition="false" :collapse="isCollapse" router>
    <el-sub-menu index="main">
      <template #title>
        <el-icon><HomeFilled /></el-icon>
        <span>后台首页</span>
      </template>
      <el-menu-item index="/main">
        <span>首页</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu v-for="item in menuList" :key="item.id" :index="'' + item.id">
      <template #title>
        <el-icon v-if="item.authName === '用户管理'"><UserFilled /></el-icon>
        <el-icon v-if="item.authName === '订单管理'"><DocumentCopy /></el-icon>
        <el-icon v-if="item.authName === '商品管理'"><Goods /></el-icon>
        <el-icon v-if="item.authName === '权限管理'"><Box /></el-icon>
        <el-icon v-if="item.authName === '数据统计'"><Memo /></el-icon>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item v-for="child in item.children" :key="child.id" :index="'/' + child.path">
        <span>{{ child.authName }}</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="beautiful">
      <template #title>
        <el-icon><BrushFilled /></el-icon>
        <span>页面美化</span>
      </template>
      <el-menu-item index="/beautiful"><span>美化</span></el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import {
  UserFilled,
  Goods,
  DocumentCopy,
  Box,
  HomeFilled,
  BrushFilled,
  Memo
} from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()
// 菜单列表
const menuList = computed(() => store.state.login.menus)
const isCollapse = computed(() => store.state.login.isCollapse)
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
}
</style>
