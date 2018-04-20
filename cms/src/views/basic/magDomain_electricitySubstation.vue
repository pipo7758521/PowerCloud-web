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
      isRender: false,
      moduleName: "magDomain_electricitySubstation",
			column: tableConfig["magDomain_electricitySubstation"].column,
      //与管理域 变电所 相关联
      connectModule: [{
        moduleName: "magDomain",
        myKey: "magdomainid",
        connectKey: "id",
        displayKey: "magdomain",
      },
      {
        moduleName: "electricitySubstation",
        myKey: "electricitysubstationid",
        connectKey: "id",
        displayKey: "substationname",
      }]
		}
	}
}

</script>