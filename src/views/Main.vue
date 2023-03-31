<template>
  <el-row :gutter="30" class="header">
    <el-col :span="6">
      <el-card></el-card>
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
      <el-card> </el-card>
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

<script setup></script>

<style lang="scss" scoped>
.body {
  margin-top: 3rem;
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
  margin-top: 3rem;
}
</style>
