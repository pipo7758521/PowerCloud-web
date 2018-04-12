<template>
	<cms-grid
		:column = "column"
    :subTable = "subTable"
    :isSubTable = "true"
		:fetchList = "fetchList"
		:insertData = "insertData"
		:updateData = "updateData"
		:deleteData = "deleteData"
	>
	</cms-grid>
</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"

import { fetchList, insertData, updateData, deleteData } from '@/api/subStation'

export default {
	components: {
		"cms-grid": Grid
	},
	data () {
		return {
			column: [
    		{
          key: "id",
    			label: "ID",
    			type: "number",
    			isEdit: false,
          mainKey: true,   //主键！！！ 用于删除
    		},
    		{
          key: "subStationName",
    			label: "名称简写",
    			type: "text",
    			required: true,
    			errorMessage: "必填"
    		},
    		{
          key: "companyID",
    			label: "公司名称",
    			type: "text",
    			required: true,
    			errorMessage: "必填"
    		},
    		{
        key: "address",
  			label: "地址",
  			type: "text",
    		},
        {
          key: "type",
          label: "经纬度",
          type: "text",
        },
        {
          key: "lacation",
          label: "业务负责人姓名",
          type: "text",
        },
        {
          key: "powerType",
          label: "业务负责人办公电话",
          type: "text",
        },
        {
          key: "voltageClass",
          label: "业务负责人移动电话",
          type: "text",
        },
        {
          key: "diagram",
          label: "开票信息",
          type: "text",
          isDetail: true
        },
        {
          key: "total",
          label: "开户行",
          type: "text",
          isDetail: true
        },
        {
          key: "ConstructionUnit",
          label: "银行账户",
          type: "text",
          isDetail: true
        },
        {
          key: "ConstructionTime",
          label: "财务负责人姓名",
          type: "text",
          isDetail: true
        },
        {
          key: "inVoltage",
          label: "财务负责人办公电话",
          type: "text",
          isDetail: true
        },
        {
          key: "outVoltage",
          label: "财务负责人移动电话",
          type: "text",
          isDetail: true
        },
        {
          key: "pic",
          label: "图纸",
          type: "text",
          isDetail: true
        },
    	],
      subTable: [
        {
          path:"electricitySubstation",
          button: "管理变电所"
        }
      ],
    	fetchList: fetchList,
    	insertData: insertData,
    	updateData: updateData,
    	deleteData: deleteData,
		}
	}
}

</script>