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

export default {
  components: {
    "cms-grid": Grid,
    "cms-step-wrapper": StepWrapper
  },
	data () {
		return {
      moduleName: "deviceElecMeter",
			column: [
        {
          key: "id",
          label: "ID",
          type: "number",
          idEdit: false,
          mainKey: true,   //主键！！！
        },
        {
          key: "cabinetid",
          label: "电表所在柜ID",
          type: "number",
          idEdit: false
        },
        {
          key: "cabinettype",
          label: "柜类型",
          type: "select",
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
          key: "typeDeviceid",
          label: "设备解析类型",
          type: "number",
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
          key: "num",
          label: "网关码（网关内部需要，业务编号，数据传输使用）",
          type: "number",
          required: true,
          errorMessage: "必填"
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

// `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
//   `cabinetID` int(11) DEFAULT NULL COMMENT '电表所在柜ID',
//   `cabinettype` int(4) DEFAULT NULL COMMENT '柜类型0:进线柜 1:电容 2:馈电',
//   `manufacturer` varchar(45) DEFAULT NULL COMMENT '生产企业',
//   `manufacturerCode` varchar(45) DEFAULT NULL COMMENT '生产编号',
//   `manufacturDate` date DEFAULT NULL COMMENT '生产日期',

//   `gatewayCode` int(11) DEFAULT NULL COMMENT '网关内部需要，业务编号，数据传输使用',
//   `typeDeviceID` int(11) DEFAULT NULL COMMENT '设备解析类型，用来对应该变压器的信息解析',
//   `num` int(10) DEFAULT NULL COMMENT '回路编号',
//   `circuitName` varchar(45) DEFAULT NULL COMMENT '回路名称，电表的总电量',
//   `circuitType` varchar(5) DEFAULT NULL COMMENT '回路类型（总表|其它）',
//   `gatewayID` int(11) DEFAULT NULL COMMENT '网关ID号',

</script>