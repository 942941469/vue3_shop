<template>
  <el-card>
    <el-table :data="rights" stripe border style="width: 100%">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="authName" label="权限名称" />
      <el-table-column label="权限等级">
        <template v-slot="{ row }">
          <el-tag v-if="row.level === '0'">一级权限</el-tag>
          <el-tag type="success" v-else-if="row.level === '1'">二级权限</el-tag>
          <el-tag type="warning" v-else>三级权限</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="访问路径" />
    </el-table>
  </el-card>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const rights = computed(() => store.state.rights.rights)
// 获取权限列表
onMounted(async () => store.dispatch('rights/getRightsList'))
</script>

<style scoped></style>
