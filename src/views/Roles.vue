<template>
  <div>
    <el-card>
      <div class="table__header">
        <h2>角色列表</h2>
        <el-button type="primary">添加角色</el-button>
      </div>
      <el-table :data="rolesList" stripe border style="width: 100%">
        <el-table-column type="index" label="序号" width="60" />
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="roleDesc" label="角色描述" />
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" :icon="EditPen">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteUser(row)" :icon="Delete"
              >删除</el-button
            >
            <el-button type="warning" size="small" :icon="Setting">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { EditPen, Delete, Setting } from '@element-plus/icons-vue'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const rolesList = computed(() => store.state.roles.rolesList)
// 获取角色列表
onMounted(() => store.dispatch('roles/getRolesList'))
</script>

<style lang="scss" scoped>
.table__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem;
}
</style>
