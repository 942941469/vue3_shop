<template>
  <div>
    <el-card>
      <div class="table__header">
        <h2>商品分类</h2>
        <el-button type="primary" @click="addCategories">添加分类</el-button>
      </div>
      <el-tree :props="defaultProps" :data="categories" node-key="cat_id" />
    </el-card>
  </div>
</template>

<script setup>
// 树形结构的配置
import { onMounted, reactive, ref } from 'vue'
import { getCategories } from '@/api/categories'
import { ElMessage } from 'element-plus'
// 树形控件参数
const defaultProps = reactive({
  label: 'cat_name',
  children: 'children'
})
// 商品分类数据
let categories = ref()
onMounted(async () => {
  const res = await getCategories()
  if (res.meta.status === 200) {
    categories.value = res.data
    ElMessage.success('获取商品分类成功')
  } else {
    ElMessage.error('获取商品分类失败')
  }
})
// 添加商品分类
const addCategories = () => {
  console.log(1)
}
</script>

<style lang="scss" scoped>
.table__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
}
</style>
