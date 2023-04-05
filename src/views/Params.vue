<template>
  <div>
    <el-card>
      <el-alert show-icon title="注意只能为三级分类设置" type="warning" :closable="false" />
      <div class="select">
        <h2 class="select__title">选择商品分类:</h2>
        <el-cascader :options="categories" :props="casProps" @change="casChange" />
      </div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-change="tabChange">
        <el-tab-pane label="动态参数" name="many">
          <el-button class="btn" type="primary" size="small" @click="add" :disabled="isBtn"
            >添加参数</el-button
          >
          <el-table :data="attributesMany" border stripe>
            <el-table-column type="index" width="120" label="序号" />
            <el-table-column prop="attr_name" width="1000" label="参数名称" />
            <el-table-column label="操作" width="600">
              <template v-slot="{ row }">
                <el-button type="primary" size="small" @click="edit(row)" :icon="EditPen"
                  >编辑</el-button
                >
                <el-popconfirm
                  title="是否要删除该分类?"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  @confirm="deleteAttr(row)"
                >
                  <template #reference>
                    <el-button>删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button class="btn" type="primary" size="small" @click="add" :disabled="isBtn"
            >添加属性</el-button
          >
          <el-table :data="attributesOnly" border stripe>
            <el-table-column type="index" width="120" label="序号" />
            <el-table-column prop="attr_name" width="1000" label="属性名称" />
            <el-table-column label="操作" width="600">
              <template v-slot="{ row }">
                <el-button type="primary" size="small" @click="edit(row)" :icon="EditPen"
                  >编辑</el-button
                >
                <el-popconfirm
                  title="是否要删除该分类?"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  @confirm="deleteAttr(row)"
                >
                  <template #reference>
                    <el-button>删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog v-model="dialogVisible" width="20%" :title="addTitle" @close="dialogClose">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
        <el-form-item prop="attr_name">
          <el-input v-model="addForm.attr_name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="editDialogVisible" width="20%" :title="editTitle" @close="editDialogClose">
      <el-form :model="editForm" :rules="addFormRules">
        <el-form-item prop="attr_name">
          <el-input v-model="editForm.attr_name" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editConfirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { getCategories } from '@/api/categories'
import { ElMessage } from 'element-plus'
import { addAttributes, deleteAttributes, getAttributes, putAttributes } from '@/api/params'
import { EditPen } from '@element-plus/icons-vue'
// 商品分类参数数据
const categories = ref([])
// 被激活页签
const activeName = ref('many')
// 选择分类
let selectKeys = ref([])
// 按钮是否显示
const isBtn = ref(true)
// 动态参数数据
let attributesMany = ref([])
// 静态属性数据
let attributesOnly = ref([])
// 对话框的显示
const dialogVisible = ref(false)
const editDialogVisible = ref(false)
// 添加数据表单
const addForm = reactive({
  attr_name: ''
})
// 编辑数据表单
const editForm = reactive({
  attr_name: '',
  attr_id: 0
})
const addFormRules = reactive({
  attr_name: [{ required: true, message: '请输入', trigger: 'blur' }]
})
// 对话框名称
const addTitle = computed(() => (activeName.value === 'many' ? ' 添加参数' : '添加属性'))
const editTitle = computed(() => (activeName.value === 'many' ? ' 编辑参数' : '编辑属性'))
// 联级选择器配置
const casProps = reactive({
  value: 'cat_id',
  label: 'cat_name',
  children: 'children',
  expandTrigger: 'hover'
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
// 级联选择框选择变化
const casChange = (value) => {
  selectKeys.value = value
  isBtn.value = false
  getParamsList(selectKeys.value[2], { sel: [activeName.value] })
}
// tab页签改变
const tabChange = (newName) => {
  if (selectKeys.value.length === 3) {
    getParamsList(selectKeys.value[2], { sel: [newName] })
  }
}
// 获取分类参数
const getParamsList = async (id, data) => {
  const res = await getAttributes(id, data)
  if (res.meta.status === 200) {
    if (activeName.value === 'many') {
      attributesMany.value = res.data
    } else {
      attributesOnly.value = res.data
    }
    ElMessage.success('获取分类参数成功')
  } else {
    ElMessage.error('获取分类参数失败')
  }
}
const dialogClose = () => {
  addForm.attr_name = ''
}
const editDialogClose = () => {
  editForm.attr_name = ''
}
// 添加参数
const add = () => {
  dialogVisible.value = true
}
// 确认
const confirm = async () => {
  const res = await addAttributes({
    attr_name: addForm.attr_name,
    id: selectKeys.value[2],
    attr_sel: [activeName.value]
  })
  if (res.meta.status === 201) {
    await getParamsList(selectKeys.value[2], { sel: [activeName.value] })
    ElMessage.success('创建成功')
  } else {
    ElMessage.error('创建失败')
  }
  dialogVisible.value = false
}
const editConfirm = async () => {
  const res = await putAttributes({
    attr_name: editForm.attr_name,
    attrid: editForm.attr_id,
    id: selectKeys.value[2],
    attr_sel: [activeName.value]
  })
  if (res.meta.status === 200) {
    await getParamsList(selectKeys.value[2], { sel: [activeName.value] })
    ElMessage.success('更新成功')
  } else {
    ElMessage.error('更新失败')
  }
  editDialogVisible.value = false
}
// 编辑参数
const edit = (row) => {
  editForm.attr_name = row.attr_name
  editForm.attr_id = row.attr_id
  editDialogVisible.value = true
}
// 删除参数
const deleteAttr = async (row) => {
  const res = await deleteAttributes(selectKeys.value[2], row.attr_id)
  if (res.meta.status === 200) {
    await getParamsList(selectKeys.value[2], { sel: [activeName.value] })
    ElMessage.success('删除分类参数成功')
  } else {
    ElMessage.error('删除分类参数失败')
  }
}
onMounted(() => {
  getCategoriesList()
})
</script>

<style lang="scss" scoped>
.select {
  width: 35rem;
  height: 6rem;
  display: flex;
  align-items: center;
  &__title {
    margin-right: 2rem;
  }
}
.btn {
  margin-bottom: 2rem;
}
</style>
