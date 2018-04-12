<template>
  <div class="dashboard-container">
    <el-row>
      <el-col :span="24"><p>工业物联网云电力CMS</p></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="dashboard-text">name:{{name}}</div>
        <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>
      </el-col>
      <el-col :span="16"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
