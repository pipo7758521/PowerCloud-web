<template>
  <cms-step-wrapper :activeIndex="3">
    <div class="tab-container">
      <el-tabs type="border-card">
        <el-tab-pane label="进线柜信息">
          <el-row>
            <el-col :span="24" class="table-caption"><i class="el-icon-document"></i>进线柜（变压器）信息</el-col>
            <el-col :span="24">
              <cms-grid
                :moduleName = "moduleName1"
                :column = "column1"
                :isSubTable = "true"
                :subTable = "subTable1"
              >
              </cms-grid>
            </el-col>
            <el-col :span="24" class="table-caption table-caption-2"><i class="el-icon-share"></i>变压器母联情况</el-col>
            <el-col :span="24">
              <cms-grid
                :moduleName = "moduleName2"
                :column = "column2"
              >
              </cms-grid>
            </el-col>
          </el-row>


        </el-tab-pane>
        <el-tab-pane label="电容柜信息">
          <cms-grid
            :moduleName = "moduleName3"
            :column = "column3"
            :isSubTable = "true"
            :subTable = "subTable3"
          >
          </cms-grid>
        </el-tab-pane>
        <el-tab-pane label="馈电柜信息">
          <cms-grid
            :moduleName = "moduleName4"
            :column = "column4"
            :isSubTable = "true"
            :subTable = "subTable4"
          >
          </cms-grid>
        </el-tab-pane>
      </el-tabs>
    </div>
  </cms-step-wrapper>
</template>

<style scoped lang="scss">
  .tab-container {
    margin: 30px;
  }
  .table-caption {
    font-size: 20px;
    margin: 10px 20px;
    font-weight: bold;

    i {
      margin-right: 20px;
    }
  }
  .table-caption-2 {
    margin-top: 50px;
  }

</style>

<script type="text/javascript">

import Grid from "@/components/grid/grid"
import StepWrapper from "./components/stepWrapper"
import { deviceTransformerList } from "@/api/common"
import tableConfig from "@/views/_config/table"


import { fetchList } from "@/api/api"


export default {
  components: {
    "cms-grid": Grid,
    "cms-step-wrapper": StepWrapper
  },
  created () {
    //变压器母联
    this.initDeviceTransformerConnectionColumn()

    //关联变电所ID
    fetchList("electricitySubstation").then( response => {
      let list = response.data.items;
      let options = [];
      list.forEach( (o,i) => {
        options.push({value: o.id, label: o.substationname})
      })

      this.column1.forEach( (o,i) => {
        if(o.key == "electricitysubstationid") {
          o.options = options;
          this.$set(this.column1, i, o)
        }
      })
      this.column3.forEach( (o,i) => {
        if(o.key == "electricitysubstationid") {
          o.options = options;
          this.$set(this.column3, i, o)
        }
      })
      this.column4.forEach( (o,i) => {
        if(o.key == "electricitysubstationid") {
          o.options = options;
          this.$set(this.column4, i, o)
        }
      })
    })

  },
	data () {
		return {
      //进线柜
      moduleName1: "electricitySubstation_incoming",
			column1: tableConfig["electricitySubstation_incoming"].column,
      subTable1: tableConfig["electricitySubstation_incoming"].subTable,
      //变压器母联情况
      moduleName2: "deviceTransformer_connection",
      column2: tableConfig["deviceTransformer_connection"].column,

      //电容柜
      moduleName3: "electricitySubstation_capacitor",
      column3: tableConfig["electricitySubstation_capacitor"].column,
      subTable3: tableConfig["electricitySubstation_capacitor"].subTable,
      //馈电柜
      moduleName4: "electricitySubstation_low",
      column4: tableConfig["electricitySubstation_low"].column,
      subTable4: tableConfig["electricitySubstation_low"].subTable,
		}
	},
  methods: {
    //变压器母联表 - 获取变压器ID
    initDeviceTransformerConnectionColumn () {
      fetchList("electricitySubstation_transformer").then( response => {
        let list = response.data.items;
        let options = [];
        list.forEach( (o,i) => {
          options.push({value: o.id})
        })

        this.column2.forEach( (o,i) => {
          if(o.key == "transformerID_A" || o.key == "transformerID_B") {
            o.options = options;
            this.$set(this.column, i, o)
          }
        })

      })
    },
  }
}

</script>