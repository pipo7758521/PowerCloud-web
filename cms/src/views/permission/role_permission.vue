<template>
	<cms-grid
    :moduleName = "moduleName"
    :isSubTable = "true"
		:column = "column"
    :connectModule = "connectModule"
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
      moduleName: "role_permission",
      column: tableConfig["role_permission"].column,
      //与 角色表、功能表 相关联
      connectModule: [{
        moduleName: "role",
        myKey: "roleid",
        connectKey: "id",
        displayKey: "name",
      },
      {
        moduleName: "function",
        myKey: "deviceid",
        connectKey: "id",
        displayKey: "circuitname",
      }]
    }

	}
}

</script>