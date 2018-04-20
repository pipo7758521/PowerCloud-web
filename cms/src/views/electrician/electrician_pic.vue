<template>
    <cms-grid
      :moduleName = "moduleName"
      :isSubTable = "true"
      :column = "column"
    >
  </cms-grid>

</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"
import tableConfig from "@/views/_config/table"
import { stationIDList } from '@/api/common'

export default {
	components: {
		"cms-grid": Grid
  },
	data () {
		return {
      moduleName: "electrician_pic",
			column: tableConfig["electrician_pic"].column,
		}
	}
}

</script>