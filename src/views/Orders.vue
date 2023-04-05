<template>
  <div>
    <el-card>
      <h2 class="name">订单列表</h2>
      <el-table :data="orders" stripe border style="width: 100%">
        <el-table-column type="index" width="60" label="序号" />
        <el-table-column prop="order_number" label="订单编号" />
        <el-table-column prop="order_price" label="订单价格" />
        <el-table-column prop="email" label="付款方式">
          <template v-slot="{ row }">
            <el-tag type="danger" v-if="row.order_pay === '0'">未付款</el-tag>
            <el-tag v-if="row.order_pay === '1'">支付宝</el-tag>
            <el-tag type="success" v-if="row.order_pay === '2'">微信支付</el-tag>
            <el-tag type="info" v-if="row.order_pay === '3'">银行卡</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" />
        <el-table-column width="150" label="订单更新时间">
          <template v-slot="{ row }">
            <span v-time>{{ row.update_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" @click="editOrder(row)" :icon="EditPen"
              >编辑</el-button
            >
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
    <el-dialog v-model="editOrderDialogVisible" width="20%" title="编辑订单">
      <el-form :model="editOrderForm" label-width="100px" ref="editOrderFormRef">
        <el-form-item label="订单价格: ">
          <el-col :span="13">
            <el-input v-model="editOrderForm.order_price" />
          </el-col>
        </el-form-item>
        <el-form-item label="支付方式: ">
          <el-select placeholder="Select" v-model="editOrderForm.order_pay">
            <el-option
              v-for="item in pay"
              :key="item.state"
              :label="item.title"
              :value="item.state"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否发货: ">
          <el-select placeholder="Select" v-model="editOrderForm.is_send">
            <el-option
              v-for="item in send"
              :key="item.state"
              :label="item.title"
              :value="item.state"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editOrderDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
// 每页条数
import { onMounted, reactive, ref } from 'vue'
import { editOrders, getOrders } from '@/api/orders'
import { ElMessage } from 'element-plus'
import { EditPen } from '@element-plus/icons-vue'
// 订单数据
let orders = ref([])
// 订单数据量
const total = ref()
// 页面条数
const pageSize = ref(5)
// 页码
const pageNum = ref(1)
// 编辑订单对话框显示
const editOrderDialogVisible = ref(false)
const editOrderForm = reactive({
  order_price: '',
  is_send: '',
  order_pay: '',
  id: -1
})
//支付方式
const pay = reactive([
  { state: '0', title: '未支付' },
  { state: '1', title: '支付宝' },
  { state: '2', title: '微信支付' },
  { state: '3', title: '银行卡' }
])
//是否发货
const send = reactive([
  { state: 0, title: '否' },
  { state: 1, title: '是' }
])
// 获取订单数据
onMounted(() => {
  getOrderList()
})
// 改变页码
const handleCurrentChange = (newPageNum) => {
  pageNum.value = newPageNum
  getOrderList()
}
// 改变显示条数
const handleSizeChange = () => {
  getOrderList()
}
// 获取订单列表
const getOrderList = async () => {
  const res = await getOrders({ pagenum: pageNum.value, pagesize: pageSize.value })
  if (res.meta.status === 200) {
    orders.value = res.data.goods
    total.value = res.data.total
    ElMessage.success('获取订单列表成功')
  } else {
    ElMessage.error('获取订单列表失败')
  }
}
// 编辑订单
const editOrder = async (row) => {
  editOrderForm.id = row.order_id
  editOrderForm.order_price = row.order_price
  editOrderForm.is_send = row.is_send
  editOrderDialogVisible.value = true
  pay.forEach((item) => {
    if (item.state === row.order_pay) {
      editOrderForm.order_pay = item.title
    }
  })
  editOrderDialogVisible.value = true
}
const confirm = async () => {
  pay.forEach((item) => {
    if (item.title === editOrderForm.order_pay) {
      editOrderForm.order_pay = item.state
    }
  })
  send.forEach((item) => {
    if (item.title === editOrderForm.is_send) {
      editOrderForm.is_send = item.state
    }
  })
  const res = await editOrders(editOrderForm.id, {
    order_price: editOrderForm.order_price,
    is_send: editOrderForm.is_send,
    order_pay: editOrderForm.order_pay
  })
  if (res.meta.status === 201) {
    await getOrderList()
    ElMessage.success('更新订单成功')
  } else {
    ElMessage.error('更新订单失败')
  }
  editOrderDialogVisible.value = false
}
</script>

<style lang="scss" scoped>
.name {
  margin-bottom: 1rem;
}
.page {
  padding-top: 2rem;
}
</style>
