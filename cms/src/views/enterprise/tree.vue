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
    line-height: 30px;
  }
  .tree-level-2 {
    font-weight:bold;
    font-size:16px;
  }
  .tree-item-btn-bar {
    padding-left: 30px;
  }
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #03A9F4;
    color: #fff;
    .tree-item-btn-bar .el-button{
      color: #fff;
    }
  }
  .el-tree {
    margin-right: 40px;
  }
  .table-caption {
    font-size: 24px;
    text-align: center;
    margin: 20px;
  }
</style>

<template>
  <div class="app-container">
    <el-row justify="space-between">
      <el-col :span="7">
        <el-tree
        :data="treeData"
        default-expand-all
        :expand-on-click-node="false"
        :highlight-current="true"
        @node-click="showDetail">
        <span :class="['custom-tree-node','tree-level-'+node.level]" slot-scope="{ node, data }">
          <span v-if="node.level == 1">企业 - {{node.data.company}}</span>
          <span v-else-if="node.level == 2"> 变电所 - {{node.data.substationname}}(类型：{{node.data.type}})</span>
          <span v-else-if="node.level == 3">柜 - {{node.data.cabinettype | cabinetTypeFilter}}</span>
          <span v-else-if="node.level == 4">电表 - {{node.data.circuitname}}</span>
          <span class="tree-item-btn-bar">
           <el-button size="mini" type="text">详情>></el-button>
          </span>
        </span>
      </el-tree>
      </el-col>

      <el-col :span="17" v-if="moduleName">
        <div class="table-caption">详细信息</div>
        <cms-grid
          :moduleName = "moduleName"
          :column = "column"
          :subTable = "subTable"
          :treeRoute = "treeRoute"
        >
        </cms-grid>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import Grid from "@/components/grid/grid"
import tableConfig from '@/views/_config/table'
import { treeList } from '@/api/enterpriseTree'
import { deviceTypeList } from "@/api/common"

export default {
  components: {
    "cms-grid": Grid,
  },
  data() {
    return {
      filterText: '',
      treeData: null,
      levelArr: ['企业','变电所', '柜','电表'],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      moduleName: "",
      column: null,
      subTable: null,
      treeRoute: {
        params: null,
        query: null,
      },
      deviceTypeOptions: null
    }
  },
  created () {
    treeList().then( response => {
      let data = response.data
      this.treeData = response.data
    })
    deviceTypeList().then( response => {
      let list = response.data.items || [];
        let options = [];
        list.forEach( (o,i) => {
          options.push({value: o.id, label: o.typedevicename})
        })
        this.deviceTypeOptions = options
    })
  },
  filters: {
    cabinetTypeFilter (value) {
      let arr = ["进线柜", "电容柜", "馈电柜"]
      return arr[+value]
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    showDetail(data, node) {
      console.log(data)
      let path
      let level = node.level
      this.moduleName = ""
      //先把moduleName设为空，用于更新右边的表格
      this.$nextTick( () => {
        if(level == 1) {
          this.setTableConfig("customer")
          this.treeRoute = {
            params: null,
            query: {id: data.id},
            path: "/Enterprise/customer"
          }
          // path = "/Enterprise/customer"
          // this.$router.push({path: path, query: {id:data.id, from:"tree"}})
        }
        //只显示当前点击的变电所，所以加了query参数用于table过滤
        else if(level == 2) {
          this.setTableConfig("electricitySubstation")
          let parentId = node.parent.data.id;
          this.treeRoute = {
            params: {companyid: parentId},
            query: {id: data.id},
            path: "/Enterprise/customer/"+parentId+"/electricitySubstation"
          }
          // path = "/Enterprise/customer/"+parentId+"/electricitySubstation"
          // this.$router.push({path: path, query: {id:data.id, from:"tree"}})
        }
        else if(level == 3) {
          let arr = ["electricitySubstation_incoming", "electricitySubstation_capacitor", "electricitySubstation_low"]

          this.setTableConfig(arr[data.cabinettype])

          let parentId = node.parent.data.id;
          this.treeRoute = {
            params: {
              companyid: node.parent.parent.data.id,
              electricitysubstationid: node.parent.data.id
            },
            query: {id: data.id},
            path: `/Enterprise/customer/${node.parent.parent.data.id}/electricitySubstation/${node.parent.data.id}/electricitySubstation_cabinets`
          }
          /*let parentId = node.parent.data.id;
          path = "/Enterprise/customer/"+parentId+"/electricitySubstation"
          this.$router.push({path: path, query: {id:data.id, from:"tree"}})*/
        }
        else if(level == 4) {
          this.setTableConfig("deviceElecMeter")
          //如果是电表，要关联设备类型表
          this.column.forEach( (o,i) => {
            if(o.key == "typedeviceid") {
              o.options = this.deviceTypeOptions;
              //强制更新，使得grid组件内的表单提交验证规则computed参数跟着更新！
              this.$set(this.column, i, o)
            }
          })

          let parentId = node.parent.data.id;
          this.treeRoute = {
            params: {
              companyid: node.parent.parent.parent.data.id,
              electricitysubstationid: node.parent.parent.data.id,
              cabinetid: node.parent.data.id
            },
            query: {id:data.id, cabinettype:data.cabinettype},
            path: `/Enterprise/customer/${node.parent.parent.parent.data.id}/electricitySubstation/${node.parent.parent.data.id}/electricitySubstation_cabinets/${node.parent.data.id}/deviceElecMeter`
          }
          // this.$router.push({path: path, query: {id:node.data.id, cabinettype:node.data.cabinettype, from:"tree"}})
        }
      })
    },
    setTableConfig(moduleName) {
      this.moduleName = moduleName
      this.column = tableConfig[moduleName].column
      if(tableConfig[moduleName].subTable) {
        this.subTable = tableConfig[moduleName].subTable
      }
      else {
        this.subTable = null
      }
    },
  }
}
</script>


