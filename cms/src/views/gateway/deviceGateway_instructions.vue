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
import { deviceElecMeterList } from '@/api/common'
export default {
	components: {
		"cms-grid": Grid
	},
  created () {
    //与 变电所ID 相关联
    deviceElecMeterList().then( response => {
      let list = response.data.items;
      let options = [];
      list.forEach( (o,i) => {
        options.push({value: o.id})
      })

      this.column.forEach( (o,i) => {
        if(o.key == "deviceid") {
          o.options = options;
        }
      })

    })
  },
	data () {
    return {
      moduleName: "deviceGateway_instructions",
      column: tableConfig["deviceGateway_instructions"].column,
    }

	}
}

</script>