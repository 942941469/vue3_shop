<template>
  <div>
    <el-card>
      <div class="table__header">
        <h2>商品分类</h2>
        <el-button type="primary" @click="addCategoriesList">添加分类</el-button>
      </div>
      <el-tree :props="defaultProps" :data="categories" node-key="cat_id" />
    </el-card>
    <el-dialog v-model="addCategoriesDialogVisible" title="添加分类" width="30%">
      <el-form
        :model="addCategoriesForm"
        label-width="80px"
        :rules="addCategoriesRules"
        ref="addCategoriesFormRef"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCategoriesForm.cat_name" />
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            :options="categoriesTwo"
            :props="casCaderProps"
            @change="handleCategoriesChange"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addCategoriesDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
// 树形结构的配置
import { onMounted, reactive, ref } from 'vue'
import { addCategories, getCategories } from '@/api/categories'
import { ElMessage } from 'element-plus'
// 对话框的显示
let addCategoriesDialogVisible = ref(false)
// 树形控件参数
const defaultProps = reactive({
  label: 'cat_name',
  children: 'children'
})
// 添加分类的表单
const addCategoriesForm = reactive({
  cat_name: '',
  cat_pid: 0,
  cat_level: 0
})
// 联级选择器配置
const casCaderProps = {
  value: 'cat_id',
  label: 'cat_name',
  children: 'children',
  expandTrigger: 'hover',
  checkStrictly: true
}
const addCategoriesRules = reactive({
  cat_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
})
// 商品分类数据
let categories = ref()
// 商品分类数据2级
let categoriesTwo = ref()
onMounted(() => {
  getCategoriesList()
})
// 获取商品分类数据
const getCategoriesList = async () => {
  const res = await getCategories()
  if (res.meta.status === 200) {
    categories.value = res.data
    ElMessage.success('获取商品分类成功')
  } else {
    ElMessage.error('获取商品分类失败')
  }
}
// 添加商品分类
const addCategoriesList = async () => {
  const res = await getCategories({ type: 2 })
  if (res.meta.status === 200) {
    categoriesTwo.value = res.data
    addCategoriesDialogVisible.value = true
    ElMessage.success('获取商品分类成功')
  } else {
    ElMessage.error('获取商品分类失败')
  }
}
// 选择分类
let selectKeys = ref([])
// 级联选择框选择变化
const handleCategoriesChange = (value) => {
  selectKeys.value = value
  addCategoriesForm.cat_level = selectKeys.value.length
  addCategoriesForm.cat_pid = selectKeys[selectKeys.value.length - 1]
}
// 确认
const confirm = async () => {
  const res = await addCategories({
    cat_pid: addCategoriesForm.cat_pid,
    cat_name: addCategoriesForm.cat_name,
    cat_level: addCategoriesForm.cat_level
  })
  if (res.meta.status === 201) {
    ElMessage.success('添加分类成功')
    await getCategoriesList()
  } else {
    ElMessage.error('添加分类失败')
  }
  addCategoriesForm.cat_name = ''
  addCategoriesForm.cat_pid = 0
  addCategoriesForm.cat_level = 0
  addCategoriesDialogVisible.value = false
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
