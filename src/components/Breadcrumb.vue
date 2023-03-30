<template>
  <el-tabs type="card" v-model="activeName" @tab-remove="removeTab" @tab-change="handleTabChange">
    <el-tab-pane
      v-for="item in breadcrumbList"
      :key="item.name"
      :label="item.title"
      :name="item.name"
      :closable="item.title !== '后台首页'"
    />
  </el-tabs>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
const route = useRoute()
const router = useRouter()
const store = useStore()
// 使用简写方法,当表单修改activeName的值时，就会调用set方法，而这里的computed属性是不允许修改的
const activeName = computed({
  get() {
    return store.state.login.activeName
  },
  set(newValue) {
    store.commit('login/upDataActiveName', newValue)
  }
})
const breadcrumbList = computed(() => store.state.login.breadcrumbList)
// 监控路由跳转
watch(
  route,
  (newValue) => {
    let flag = true
    store.commit('login/upDataActiveName', newValue.meta.title)
    // 如果数组为空或者数组中每月当前标签则执行添加操作
    breadcrumbList.value.forEach((item) => {
      if (item.title === newValue.meta.title) {
        flag = false
      }
    })
    if (flag && route.path !== '/login') {
      store.commit('login/addBreadcrumbList', newValue)
    }
  },
  { deep: true, immediate: true }
)
//移除tab
const removeTab = (name) => {
  breadcrumbList.value.forEach((item, index) => {
    if (item.name === name) {
      store.commit('login/deleteBreadcrumbList', index)
      if (name === route.meta.title) {
        router.push(store.state.login.breadcrumbList[index - 1].path)
      }
    }
  })
}
//点击tab跳转
const handleTabChange = (name) => {
  breadcrumbList.value.forEach((item) => {
    if (item.name === name) {
      router.push(item.path)
    }
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-tabs__header) {
  border: 0;
}
:deep(.el-tabs__nav) {
  border: 0 !important;
}
:deep(.el-tabs__item) {
  height: 32px;
  line-height: 32px;
  background-color: #fff;
  margin-right: 10px;
  border-radius: 6px;
}
</style>
