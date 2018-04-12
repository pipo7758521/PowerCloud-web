<template>
  <div class="app-container">
    <!-- <el-input placeholder="Filter keyword" v-model="filterText" style="margin-bottom:30px;"></el-input> -->
    <el-tree
      :data="treeData"
      default-expand-all
      :expand-on-click-node="false">
      <span :class="['custom-tree-node','tree-level-'+node.level]" slot-scope="{ node, data }">
        <span v-if="node.level == 1">企业 - {{node.data.company}}</span>
        <span v-else-if="node.level == 2"> 变电所 - {{node.data.substationname}}(类型：{{node.data.type}})</span>
        <span v-else-if="node.level == 3">柜 - {{node.data.type}}</span>
        <span v-else-if="node.level == 4">电表 - {{node.data.circuitname}}</span>
        <span class="tree-item-btn-bar">
         <el-button size="mini" type="text" @click="goToEnterprise(node.level)">详情>></el-button>
        </span>
      </span>
    </el-tree>

  </div>
</template>

<style lang="scss">
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    // justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .el-tree-node__content{
    margin: 5px 0;
  }
  .tree-level-1 {
    font-weight:bold;
    font-size:20px;
  }
  .tree-level-2 {
    font-weight:bold;
    font-size:16px;
  }
  .tree-item-btn-bar {
    padding-left: 30px;
  }
</style>

<script>
import { treeList } from '@/api/enterpriseTree'

export default {
  created () {
    treeList().then( response => {
      let data = response.data
      this.treeData = response.data
    })
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    goToEnterprise(level) {
      let path
      if(level == 1) {
        path = "/Enterprise/customer"
      }
      this.$router.push({path: path})
    },
  },

  data() {
    return {
      filterText: '',
      treeData: null,
      levelArr: ['企业','变电所', '柜','电表'],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  }
}
</script>


