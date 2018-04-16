<template>
  <!-- 进度条 组件-->
  <el-row >
    <el-col :span="24">
      <el-steps :active="activeIndex" class="step-bar">
        <el-step title="企业信息" description="企业名称、地理位置等"></el-step>
        <el-step title="变电所信息" description="变电所详情（名称、图纸、视频等）"></el-step>
        <el-step title="变电所机柜信息" description="进线柜、变压器母联母联情况、电容柜、馈电柜等信息"></el-step>
        <el-step title="电表信息" description="变电所机柜内电表信息"></el-step>
      </el-steps>
    </el-col>
    <el-col :span="24">
      <slot></slot>
    </el-col>
  </el-row>
</template>

<script type="text/javascript">
  export default {
    props: {
      activeIndex: {
        type: Number,
        default: function () {
          return 1
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .step-bar {
    margin: 20px 30px;
  }
</style>