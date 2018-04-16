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

export default {
  components: {
    "cms-grid": Grid,
    "cms-step-wrapper": StepWrapper
  },
  created () {
    //变压器母联
    this.initDeviceTransformerConnectionColumn()

  },
	data () {
		return {
      //进线柜
      moduleName1: "electricitySubstation_incomming",
			column1: [
        {
          key: "id",
          label: "ID",
          type: "number",
          isEdit: false,
          mainKey: true,   //主键！！！
        },
        {
          key: "electricitysubstationid",
          label: "变电所ID",
          type: "number",
          isEdit: false
        },
        {
          key: "num",
          label: "所内编号",
          type: "number",
          isEdit: false
        },
        {
          key: "manufacturer",
          label: "生产企业",
          type: "string",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "transformerid",
          label: "变压器ID",
          type: "string",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "status",
          label: "状态",
          default: "0",
          type: "select",
          options: [
            {value: "0", label: "正常"},
            {value: "1", label: "停用"}
          ]
        },
        {
          key: "connectiontype",
          label: "连接类型",
          type: "select",
          required: true,
          errorMessage: "必填",
          options: [
            {value: "0", label: "母连"},
            {value: "1", label: "独体"}
          ]
        },
        {
          key: "transformer_manufacturer",
          label: "变压器生产企业",
          type: "string",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "manufacturercode",
          label: "生产编号",
          type: "number",
          isDetail: true
        },
        {
          key: "transformermodel",
          label: "型号",
          type: "number",
          isDetail: true
        },
        {
          key: "weight",
          label: "重量",
          type: "number",
          isDetail: true
        },
        {
          key: "workenviorment",
          label: "使用条件",
          type: "select",
          isDetail: true,
          options: [
            {value: "户内式", label: "户内式"},
            {value: "户外式", label: "户外式"}
          ]
        },
        {
          key: "worktype",
          label: "种类",
          type: "select",
          isDetail: true,
          options: [
            {value: "干式", label: "干式"},
            {value: "油浸", label: "油浸"}
          ]
        },
        {
          key: "ratedvoltage",
          label: "额定电压",
          type: "string",
          isDetail: true
        },
        {
          key: "ratedfrequency",
          label: "额定频率",
          type: "string",
          isDetail: true
        },
        {
          key: "connectiongrouplabel",
          label: "连接组标号",
          type: "select",
          isDetail: true,
          options: [
            {value: "Dyn11", label: "Dyn11"},
            {value: "Yyn0", label: "Yyn0"}
          ]
        },
        {
          key: "insulationclass",
          label: "绝缘耐热等级",
          default: "0",
          type: "select",
          default: "0",
          isDetail: true,
          options: [
            {value: "A"},
            {value: "E"},
            {value: "B"},
            {value: "F"},
            {value: "H"},
            {value: "C"},
            {value: "N"},
            {value: "R"}
          ]
        },
        {
          key: "manufacturdate",
          label: "生产日期",
          type: "date",
          isDetail: true
        }
      ],
      subTable1: [{
        path: "deviceElecMeter?cabinettype=0",  //进线柜下的电表
        button: "配置电表"
      }],
      //变压器母联情况
      moduleName2: "deviceTransformer_connection",
      column2: [
        {
          key: "id",
          label: "ID",
          type: "number",
          isEdit: false,
          mainKey: true,   //主键！！！
        },
        {
          key: "transformerID_A",
          label: "变压器A",
          type: "select"
        },
        {
          key: "transformerID_B",
          label: "变压器B",
          type: "select"
        }
      ],

      //电容柜
      moduleName3: "electricitySubstation_capacitor",
      column3: [
        {
          key: "id",
          label: "ID",
          type: "number",
          isEdit: false,
          mainKey: true,   //主键！！！
        },
        {
          key: "electricitysubstationid",
          label: "变电所ID",
          type: "number",
          isEdit: false
        },
        {
          key: "num",
          label: "所内编号",
          type: "number",
          isEdit: false
        },
        {
          key: "manufacturer",
          label: "生产企业",
          type: "string"
        },
        {
          key: "status",
          label: "状态",
          type: "select",
          default: "0",
          options: [
            {
              value: "0",
              label: "正常"
            },
            {
              value: "1",
              label: "停用"
            }
          ]
        }
      ],
      subTable3: [{
        path: "deviceElecMeter?cabinettype=1",  //电容柜下的电表
        button: "配置电表"
      }],
      //馈电柜
      moduleName4: "electricitySubstation_low",
      column4: [
        {
          key: "id",
          label: "馈电柜ID",
          type: "number",
          isEdit: false,
          mainKey: true,   //主键！！！
        },
        {
          key: "electricitysubstationid",
          label: "变电所ID",
          type: "number",
          isEdit: false
        },
        {
          key: "num",
          label: "所内编号",
          type: "number",
          isEdit: false
        },
        {
          key: "lowcabinettype",
          label: "馈电柜类型",
          type: "select",
          default: "进线柜",
          options: [
            {value: "进线柜"},
            {value: "电容器柜"},
            {value: "馈线柜"},
            {value: "联络柜" }
          ]
        },
        {
          key: "manufacturer",
          label: "生产企业",
          type: "string",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "lowcabinetmodel",
          label: "型号",
          type: "select",
          default: "GGD",
          options: [
            {value: "GGD"},
            {value: "GCK"},
            {value: "GCS"},
            {value: "MNS" }
          ]
        },
        {
          key: "pic",
          label: "照片",
          type: "image",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "manufacturdate",
          label: "生产日期",
          type: "date",
          isDetail: true
        },
        {
          key: "incablemodel",
          label: "进线电缆型号",
          type: "string",
          isDetail: true
        },
        {
          key: "outcablemodel",
          label: "馈出电缆型号",
          type: "string",
          isDetail: true
        },
        {
          key: "mainbusmodel",
          label: "主母排型号",
          type: "string",
          isDetail: true
        },
        {
          key: "nlinemodel",
          label: "N线型号",
          type: "string",
          isDetail: true
        },
        {
          key: "pelinemodel",
          label: "PE线型号",
          type: "string",
          isDetail: true
        },
        {
          key: "status",
          label: "状态",
          type: "select",
          default: "0",
          options: [
            {
              value: "0",
              label: "正常"
            },
            {
              value: "1",
              label: "停用"
            }
          ]
        }
      ],
      subTable4: [{
        path: "deviceElecMeter?cabinettype=2",  //馈电柜下的电表
        button: "配置电表"
      }],
		}
	},
  methods: {
    //变压器母联表 - 获取变压器ID
    initDeviceTransformerConnectionColumn () {
      deviceTransformerList().then( response => {
        let list = response.data.items;
        let options = [];
        list.forEach( (o,i) => {
          options.push({value: o.id})
        })

        this.column2.forEach( (o,i) => {
          if(o.key == "transformerID_A" || o.key == "transformerID_B") {
            o.options = options;
          }
        })

      })
    },
  }
}

</script>