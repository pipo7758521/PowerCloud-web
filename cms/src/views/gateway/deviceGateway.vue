<template>
	<cms-grid
    :moduleName = "moduleName"
		:column = "column"
    :subTable = "subTable"
	>
	</cms-grid>
</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"
import { stationIDList } from '@/api/common'
import tableConfig from "@/views/_config/table"

export default {
	components: {
		"cms-grid": Grid
	},
	data () {
    return {
      moduleName: "deviceGateway",
      column: tableConfig["deviceGateway"].column,
      subTable: tableConfig["deviceGateway"].subTable
    }

	}
}

</script>