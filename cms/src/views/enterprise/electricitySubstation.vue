<template>
  <cms-step-wrapper :activeIndex="2">
    <cms-grid
      :moduleName = "moduleName"
      :column = "column"
      :subTable = "subTable"
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
      moduleName: "electricitySubstation",
			column: [
    		{
          key: "id",
    			label: "ID",
    			type: "number",
    			isEdit: false,
          mainKey: true,   //主键！！！ 用于删除
    		},
    		{
          key: "substationname",
    			label: "变电所名称",
    			type: "string",
    			required: true,
    			errorMessage: "必填"
    		},
    		{
          key: "companyid",
    			label: "所属企业ID",
    			type: "string",
    			required: true,
    			errorMessage: "必填"
    		},
    		{
        key: "address",
  			label: "地址",
  			type: "string",
    		},
        {
          key: "type",
          label: "变电所类型",
          type: "select",
          options:[
            {label:"箱变", value:"箱变"},
            {label:"变电所", value:"变电所"},
          ]
        },
        {
          key: "lacation",
          label: "地图位置",
          type: "string",
        },
        {
          key: "powertype",
          label: "电压状态",
          type: "select",
          options:[
            {label:"单电源", value:"0"},
            {label:"双电源", value:"1"},
          ]
        },
        {
          key: "voltageclass",
          label: "电压等级",
          type: "select",
          options:[
            {label:"220V", value:"0"},
            {label:"380V", value:"1"},
            {label:"10kv", value:"2"},
          ]
        },
        {
          key: "diagram",
          label: "系统图",
          type: "string",
          isDetail: true
        },
        {
          key: "total",
          label: "总容量",
          type: "string",
          isDetail: true
        },
        {
          key: "constructionunit",
          label: "承建单位",
          type: "string",
          isDetail: true
        },
        {
          key: "constructiontime",
          label: "建设时间",
          type: "string",
          isDetail: true
        },
        {
          key: "involtage",
          label: "入所侧电压",
          type: "string",
          isDetail: true
        },
        {
          key: "outvoltage",
          label: "出所侧电压",
          type: "string",
          isDetail: true
        }
    	],
      subTable: [
        {
          // title: "图纸",
          path: "electricitySubstation_pic",
          button: "配置图纸",
          plain: true
        },
        {
          // title: "视频",
          path: "electricitySubstation_video",
          button: "配置视频",
          plain: true
        },
        {
          path:"electricitySubstation_cabinets",
          button: "管理机柜"
        }
      ]
		}
	}
}

</script>