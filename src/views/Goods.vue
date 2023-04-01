<template>
  <div>
    <el-card>
      <el-form>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input placeholder="请输入用户名称" v-model="query"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" :icon="Search" @click="searchGood">查询</el-button>
            <el-button :icon="Refresh" @click="resetForm">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
      <div class="table__header">
        <h2>商品列表</h2>
        <el-button type="primary" @click="addUserDialog">添加商品</el-button>
      </div>
      <el-table :data="goodsList" stripe border style="width: 100%">
        <el-table-column type="index" width="60" label="序号" />
        <el-table-column prop="goods_name" width="850" label="商品名称" />
        <el-table-column prop="goods_price" label="商品价格" />
        <el-table-column prop="goods_number" label="商品数量" />
        <el-table-column label="操作" width="400">
          <template v-slot="{ row }">
            {{ row.goods_id }}
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
import { Search, Refresh } from '@element-plus/icons-vue'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
// 每页条数
const pageSize = ref(5)
// 页码
const pageNum = ref(1)
// 查询参数
const query = ref('')
// 商品数据
const goodsList = computed(() => store.state.goods.goodList)
// 商品数据量
const total = computed(() => store.state.goods.total)
// 获取商品数据
onMounted(() => store.dispatch('goods/getGoodsList', { pagenum: 1, pagesize: 5 }))
// 页码跳转
const handleSizeChange = (newPageNum) => {
  pageNum.value = newPageNum
  store.dispatch('goods/getGoodsList', { pagenum: newPageNum, pagesize: pageSize.value })
}
// 改变显示条数
const handleCurrentChange = () => {
  store.dispatch('goods/getGoodsList', { pagenum: pageNum.value, pagesize: pageSize.value })
}
// 查找商品
const searchGood = () => {
  if (query.value === '') {
    store.dispatch('goods/getGoodsList', { pagenum: 1, pagesize: pageSize.value })
  } else {
    store.dispatch('goods/getGoodsList', {
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
  store.dispatch('goods/getGoodsList', { pagenum: pageNum.value, pagesize: pageSize.value })
}
</script>

<style lang="scss" scoped>
.table__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem;
}
.page {
  padding-top: 2rem;
}
</style>
