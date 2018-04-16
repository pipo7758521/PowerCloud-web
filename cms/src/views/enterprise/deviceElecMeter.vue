<template>
  <cms-step-wrapper :activeIndex="4">
  	<cms-grid
      :moduleName = "moduleName"
  		:column = "column"
      :isSubTable = "true"
  	>
  	</cms-grid>
  </cms-step-wrapper>
</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"
import StepWrapper from "./components/stepWrapper"

import { deviceTypeList } from "@/api/common"

export default {
  components: {
    "cms-grid": Grid,
    "cms-step-wrapper": StepWrapper
  },
  created () {
    deviceTypeList().then( response => {
      let list = response.data.items;
        let options = [];
        list.forEach( (o,i) => {
          options.push({value: o.id, label: o.typedevicename})
        })

        this.column.forEach( (o,i) => {
          if(o.key == "typedeviceid") {
            o.options = options;
            //强制更新，使得grid组件内的表单提交验证规则computed参数跟着更新！
            this.$set(this.column, i, o)
          }
        })
    })
  },
	data () {
		return {
      moduleName: "deviceElecMeter",
			column: [
        {
          key: "id",
          label: "ID",
          type: "number",
          isEdit: false,
          mainKey: true,   //主键！！！
        },
        {
          key: "cabinetid",
          label: "电表所在柜ID",
          type: "number",
          isEdit: false,
        },
        {
          key: "cabinettype",
          label: "柜类型",
          type: "select",
          isEdit: false,
          default: 0,
          options: [
            {value: 0, label: "进线柜"},
            {value: 1, label: "电容柜"},
            {value: 2, label: "馈电柜"},
          ]
        },
        {
          key: "manufacturer",
          label: "生产企业",
          type: "string"
        },
        {
          key: "manufacturercode",
          label: "生产编号",
          type: "string"
        },
        {
          key: "manufacturdate",
          label: "生产日期",
          type: "date"
        },
        {
          key: "gatewaycode",
          label: "网关码（网关内部需要，业务编号，数据传输使用）",
          type: "number",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "typedeviceid",
          label: "设备解析类型",
          type: "select",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "num",
          label: "回路编号",
          type: "number",
          isEdit: false
        },
        {
          key: "circuitname",
          label: "回路名称",
          type: "string",
          required: true,
          errorMessage: "必填"
        },
        {
          key: "circuittype",
          label: "回路类型",
          type: "select",
          default: "总表",
          options: [
            {value: "总表", label: "总表"},
            {value: "其它", label: "其它"},
          ]
        },
        // gatewayID
      ]
		}
	}
}

</script>