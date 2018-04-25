<template>
	<cms-grid
    :moduleName = "moduleName"
		:column = "column"
		:connectModule = "connectModule"
    :subTable = "subTable"
	>
	</cms-grid>
</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"
import tableConfig from "@/views/_config/table"

export default {
	components: {
		"cms-grid": Grid
	},
	data () {
    return {
      moduleName: "deviceGateway",
      column: tableConfig["deviceGateway"].column,
      subTable: tableConfig["deviceGateway"].subTable,
      connectModule: [{
      	moduleName: "electricitySubstation",  //相关联的模块名
      	myKey: "electricitysubstationid",         //本模块中关联的数据库字段
      	connectKey: "id",           //关联的模块中的对应数据库字段
      	displayKey: "substationname",         //显示在前端的字段
      }]
    }

	}
}

</script>