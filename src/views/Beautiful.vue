<template>
  <div class="beautiful">
    <h2>头部美化</h2>
    <el-row :gutter="20" class="header-color">
      <el-col :span="5" v-for="(item, index) in headerColorList" :key="index">
        <div
          class="header-box"
          :style="{ backgroundColor: item.color }"
          @click="changHeaderColor(item.color, index)"
        >
          <img src="@/assets/beautiful.svg" alt="" class="img" v-show="headerIndex === index" />
        </div>
        <p class="title">{{ item.title }}</p>
      </el-col>
    </el-row>
    <span>自定义颜色</span>
    <el-color-picker v-model="headerColor" show-alpha @change="headerColorChange" />
    <h2>主体美化</h2>
    <el-row :gutter="20" class="header-color">
      <el-col :span="5" v-for="(item, index) in mainColorList" :key="index">
        <div
          class="header-box"
          :style="{ backgroundColor: item.color }"
          @click="changMainColor(item.color, index)"
        >
          <img src="@/assets/beautiful.svg" alt="" class="img" v-show="mainIndex === index" />
        </div>
        <p class="title">{{ item.title }}</p>
      </el-col>
    </el-row>
    <span>自定义颜色</span>
    <el-color-picker v-model="mainColor" show-alpha @change="mainColorChange" />
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const headerColor = computed(() => store.state.beautiful.headerColor)
const headerIndex = computed(() => store.state.beautiful.headerIndex)
const mainColor = computed(() => store.state.beautiful.mainColor)
const mainIndex = computed(() => store.state.beautiful.mainIndex)
// 颜色数据
const headerColorList = reactive([
  { title: '默认色', color: '#4338ca' },
  { title: '太阳橙', color: '#f08d01' },
  { title: '山茶粉', color: '#e9617b' },
  { title: '宝石红', color: '#c80851' },
  { title: '风信紫', color: '#c4a9c0' }
])
const mainColorList = reactive([
  { title: '默认色', color: '#f1f2f6' },
  { title: '孔雀蓝', color: '#00a4c5' },
  { title: '水晶紫', color: '#7f4985' },
  { title: '满江红', color: '#e92b77' },
  { title: '松霜绿', color: '#82a68c' }
])
// 改变头部颜色
const changHeaderColor = (color, index) => {
  store.commit('beautiful/upDataHeader', { color, index })
}
// 改变主体颜色
const headerColorChange = (color) => {
  store.commit('beautiful/upDataHeader', { color, index: -1 })
}
// 自定义头部颜色
const changMainColor = (color, index) => {
  store.commit('beautiful/upMainHeader', { color, index })
}
// 自定义主体颜色
const mainColorChange = (color) => {
  store.commit('beautiful/upMainHeader', { color, index: -1 })
}
</script>

<style lang="scss" scoped>
.beautiful {
  padding: 2rem;
  background-color: #fff;
  .header-color {
    .header-box {
      position: relative;
      height: 15rem;
      border-radius: 1rem;
      cursor: pointer;
    }
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .title {
      text-align: center;
    }
  }
}
.el-col-5 {
  max-width: 20%;
}
</style>
