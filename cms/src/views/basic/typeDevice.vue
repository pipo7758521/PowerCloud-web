<template>
	<cms-grid
		:column="column"
		:fetchList = "fetchList"
		:insertData = "insertData"
		:updateData = "updateData"
		:deleteData = "deleteData"
	>
	</cms-grid>
</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"

import { fetchList, insertData, updateData, deleteData } from '@/api/typeDevice'

export default {
	components: {
		"cms-grid": Grid
	},
	data () {
		return {
			column: [
    		{
    			key: "typeDeviceID",
    			label: "ID",
    			type: "number",
    			isEdit: false,
    			mainKey: true,   //主键！！！ 用于删除
    		},
    		{
    			key: "typeDeviceName",
    			label: "设备名称",
    			type: "text",
    			required: true,
    			errorMessage: "必填"
    		},
    		{
    			key: "functionName",
    			label: "解析函数名称",
    			type: "text",
    			required: true,
    			errorMessage: "必填"
    		},
    		{
    			key: "className",
    			label: "解析类名称",
    			type: "text",
    			required: true,
    			errorMessage: "必填"
    		},
    		{
    			key: "description",
    			label: "备注说明",
    			type: "text",
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