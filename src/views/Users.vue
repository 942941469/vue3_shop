<template>
  <div>
    <el-card>
      <el-form>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input placeholder="请输入用户名称" v-model="query"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" :icon="Search" @click="searchUser">查询</el-button>
            <el-button :icon="Refresh" @click="resetForm">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="table__header">
        <h2>用户列表</h2>
        <el-button type="primary" @click="addUserDialog">添加用户</el-button>
      </div>
      <el-table :data="userList" stripe border style="width: 100%">
        <el-table-column type="index" width="60" label="序号" />
        <el-table-column prop="username" label="姓名" />
        <el-table-column prop="mobile" label="手机号码" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column width="150" label="创建时间">
          <template v-slot="{ row }">
            <span v-time>{{ row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="role_name" width="150" label="角色" />
        <el-table-column label="状态" width="120">
          <template v-slot="{ row }">
            <el-switch
              v-model="row.mg_state"
              @change="changeStatus(row)"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="400">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" :icon="EditPen">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteUser(row)" :icon="Delete"
              >删除</el-button
            >
            <el-button type="warning" size="small" :icon="Setting">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page"
        v-model:current-page="pageNum"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup>
import { Search, Refresh, EditPen, Delete, Setting } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
import { changeUserStatus, deleteUsersFromId } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'
const store = useStore()
// 每页条数
const pageSize = ref(5)
// 页码
const pageNum = ref(1)
// 用户列表数据
const userList = computed(() => store.state.user.usersList)
// 用户列表数据量
const total = computed(() => store.state.user.total)
// 查询参数
const query = ref('')
// 获取用户列表数据
onMounted(() => {
  store.dispatch('user/getUsersList', { pagenum: 1, pagesize: 5 })
})
// 页码跳转
const handleSizeChange = (newPageNum) => {
  pageNum.value = newPageNum
  store.dispatch('user/getUsersList', { pagenum: newPageNum, pagesize: pageSize.value })
}
// 改变显示条数
const handleCurrentChange = () => {
  store.dispatch('user/getUsersList', { pagenum: pageNum.value, pagesize: pageSize.value })
}
// 改变用户状态
const changeStatus = async (row) => {
  const res = await changeUserStatus(row.id, row.mg_state)
  if (res.meta.status === 200) {
    ElMessage.success('更新状态成功')
  } else {
    ElMessage.error('更新状态失败')
  }
}
// 查找用户
const searchUser = () => {
  if (query.value === '') {
    store.dispatch('user/getUsersList', { pagenum: 1, pagesize: pageSize.value })
  } else {
    store.dispatch('user/getUsersList', {
      pagenum: 1,
      pagesize: pageSize.value,
      query: query.value
    })
  }
}
// 重置
const resetForm = () => {
  query.value = ''
  pageNum.value = 1
  pageSize.value = 5
  store.dispatch('user/getUsersList', { pagenum: pageNum.value, pagesize: pageSize.value })
}
// 删除用户
const deleteUser = (row) => {
  ElMessageBox.confirm(`确认删除用户${row.username}吗`, '删除用户', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  }).then(async () => {
    const res = await deleteUsersFromId(row.id)
    if (res.meta.status === 200) {
      await store.dispatch('user/getUsersList', { pagenum: 1, pagesize: pageSize.value })
      ElMessage.success('删除用户成功')
    } else {
      ElMessage.error('删除用户失败')
    }
  })
}
</script>

<style lang="scss" scoped>
.table__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
}
.page {
  padding-top: 2rem;
}
</style>
