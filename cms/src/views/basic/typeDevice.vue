<template>
	<cms-grid
        :moduleName = "moduleName"
		:column="column"
	>
	</cms-grid>
</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"

export default {
	components: {
		"cms-grid": Grid
	},
	data () {
		return {
            moduleName: "typeDevice",
			column: [
    		{
    			key: "id",
    			label: "ID",
    			type: "number",
    			isEdit: false,
    			mainKey: true,   //主键！！！ 用于删除
    		},
    		{
    			key: "typedevicename",
    			label: "设备名称",
    			type: "string",
    			required: true,
    			errorMessage: "必填"
    		},
    		{
    			key: "functionname",
    			label: "解析函数名称",
    			type: "string",
    			required: true,
    			errorMessage: "必填"
    		},
    		{
    			key: "classname",
    			label: "解析类名称",
    			type: "string",
    			required: true,
    			errorMessage: "必填"
    		},
    		{
    			key: "description",
    			label: "备注说明",
    			type: "string",
    		}
    	]
		}
	}
}

</script>