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
import { stationIDList } from '@/api/common'
import tableConfig from "@/views/_config/table"

export default {
	components: {
		"cms-grid": Grid
  },
  created () {
    //与 变电所ID 相关联
    stationIDList().then( response => {
      let list = response.data.items;
      let options = [];
      list.forEach( (o,i) => {
        options.push({value: o.id})
      })

      this.column.forEach( (o,i) => {
        if(o.key == "electricitysubstationid") {
          o.options = options;
          this.$set(this.column, i, o)
        }
      })

    })
  },
	data () {
		return {
      moduleName: "magDomain_electricitySubstation",
			column: tableConfig["magDomain_electricitySubstation"].column,
		}
	}
}

</script>