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
      moduleName: "magDomain",
			column: tableConfig["magDomain"].column,
      subTable: tableConfig["magDomain"].subTable,
      connectModule: [{
      	moduleName: "electrician",  //相关联的模块名
      	myKey: "createrid",         //本模块中关联的数据库字段
      	connectKey: "id",           //关联的模块中的对应数据库字段
      	displayKey: "name",         //显示在前端的字段
      }]
		}
	}
}

</script>