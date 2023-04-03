<template>
  <el-row :gutter="30" class="header">
    <el-col :span="6" v-for="item in list" :key="item.num">
      <el-card>
        <div class="numCard">
          <img :src="item.url" alt="icon" />
          <div>
            <div class="numCard__title">{{ item.title }}</div>
            <div class="numCard__num">{{ item.num }}</div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="30" class="body">
    <el-col :span="6">
      <el-card class="welcome">
        <img src="@/assets/tx.png" alt="avatar" />
        <h1>欢迎登录</h1>
      </el-card>
    </el-col>
    <el-col :span="18">
      <el-card id="main"></el-card>
    </el-col>
  </el-row>
  <el-row :gutter="30" class="footer">
    <el-col :span="8">
      <el-card id="pie-left"></el-card>
    </el-col>
    <el-col :span="8">
      <el-card id="pie-middle"></el-card>
    </el-col>
    <el-col :span="8">
      <el-card id="pie-right"></el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import * as echarts from 'echarts/core'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { GridComponent } from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
const list = reactive([
  { title: '访问量', num: 10400, url: require('@/assets/home/user.svg') },
  { title: '信息', num: 3721, url: require('@/assets/home/message.svg') },
  { title: '收入', num: 162973, url: require('@/assets/home/monkey.svg') },
  { title: '订单', num: 7935, url: require('@/assets/home/shop.svg') }
])
onMounted(() => {
  echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    LegendComponent,
    PieChart,
    LabelLayout,
    GridComponent,
    BarChart,
    LineChart,
    CanvasRenderer,
    UniversalTransition
  ])
  const myChart = echarts.init(document.getElementById('main'))
  const myChart1 = echarts.init(document.getElementById('pie-left'))
  const myChart2 = echarts.init(document.getElementById('pie-right'))
  const myChart3 = echarts.init(document.getElementById('pie-middle'))
  myChart.setOption(option)
  myChart1.setOption(option1)
  myChart2.setOption(option2)
  myChart3.setOption(option3)
})
// 指定图表的配置项和数据
const option = {
  tooltip: {},
  legend: {
    data: ['上周销量', '这周销量']
  },

  xAxis: {
    data: ['手机', '家电', '衣服', '美妆', '休闲零食', '生活用品', '酒水饮料']
  },
  yAxis: {},
  series: [
    {
      name: '上周销量',
      type: 'bar',
      data: [1053, 1345, 2354, 5353, 2353, 9343, 5232]
    },
    {
      name: '这周销量',
      type: 'bar',
      data: [2053, 2345, 4354, 4353, 3353, 6343, 8232]
    }
  ]
}
const option1 = {
  title: {
    text: '顾客来源',
    //控制标题位置
    x: 'center',
    y: 'bottom'
  },
  tooltip: {
    //提示框组件
    trigger: 'item', //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    },
    formatter: '{b} : {c} <br/>百分比 : {d}%' //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
  },
  series: [
    {
      radius: '60%',
      label: {
        show: true,
        formatter: '{b}:({d}%)' //自定义显示格式(b:name, c:value, d:百分比)
      },
      title: {
        text: '顾客来源'
      },
      type: 'pie',
      data: [
        {
          value: 2335,
          name: '微信小程序'
        },
        {
          value: 8234,
          name: '手机APP'
        },
        {
          value: 2548,
          name: '网页版'
        },
        {
          value: 1548,
          name: '其他途径'
        }
      ]
    }
  ]
}

const option2 = {
  tooltip: {
    //提示框组件
    trigger: 'item', //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    },
    formatter: '{b} : {c} <br/>百分比 : {d}%' //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
  },
  title: {
    text: '访问次数',
    //控制标题位置
    x: 'center',
    y: 'bottom'
  },

  series: [
    {
      radius: '60%',
      label: {
        show: true,
        formatter: '{b}:({d}%)' //自定义显示格式(b:name, c:value, d:百分比)
      },

      roseType: 'area',
      type: 'pie',
      data: [
        {
          value: 85,
          name: '周一'
        },
        {
          value: 64,
          name: '周二'
        },
        {
          value: 68,
          name: '周三'
        },
        {
          value: 104,
          name: '周四'
        },
        {
          value: 46,
          name: '周五'
        },
        {
          value: 27,
          name: '周六'
        },
        {
          value: 99,
          name: '周天'
        }
      ]
    }
  ]
}

const option3 = {
  title: {
    text: '一年收支详情',
    x: 'center'
  },
  tooltip: {
    //鼠标悬停提示内容
    trigger: 'axis' // 触发类型，默认数据触发，可选为：'axis' item
  },
  legend: {
    orient: 'horizontal',
    x: 'left',
    y: 'top',
    data: ['收入', '支出']
  },
  grid: {
    top: '20%',
    left: '3%',
    right: '10%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: {
    name: '月份',
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {
    name: '金额',
    type: 'value',
    min: 0, // 配置 Y 轴刻度最小值
    max: 30000, // 配置 Y 轴刻度最大值
    splitNumber: 7 // 配置 Y 轴数值间隔
  },

  series: [
    // 多组折线图数据
    {
      name: '收入',
      data: [14455, 17534, 18360, 15301, 22861, 22181, 14944, 16197, 13745, 13810, 18283],
      type: 'line'
    },

    {
      name: '支出',
      data: [6455, 7534, 8360, 5301, 6861, 6181, 5944, 6197, 6745, 7810, 8283, 9298],
      type: 'line'
    }
  ],
  color: ['#3366CC', '#FFCC99']
}
</script>

<style lang="scss" scoped>
.body {
  margin-top: 2rem;
  .welcome {
    height: 40rem;
    text-align: center;
    img {
      margin-top: 3rem;
      width: 20rem;
      height: 20rem;
      border-radius: 50%;
    }
    h1 {
      margin-top: 4rem;
      font-size: 4rem;
      font-weight: 400;
    }
  }
}
.footer {
  margin-top: 2rem;
}
.numCard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__title {
    font-size: 2rem;
    font-weight: 200;
  }
  &__num {
    font-size: 2rem;
    font-weight: 900;
  }
}
#main {
  height: 40rem;
}
#pie-left,
#pie-right,
#pie-middle {
  height: 30rem;
}
</style>
