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
// import { deviceElecMeterList } from '@/api/common'
export default {
	components: {
		"cms-grid": Grid
	},
  /*created () {
    //与 设备ID 相关联
    deviceElecMeterList().then( response => {
      let list = response.data.items || [];
      let options = [];
      list.forEach( (o,i) => {
        options.push({value: o.id})
      })

      this.column.forEach( (o,i) => {
        if(o.key == "deviceid") {
          o.options = options;
          this.$set(this.column, i, o)
          return
        }
      })
      this.isRender = true
    })
  },*/
	data () {
    return {
      moduleName: "deviceGateway_instructions",
      column: tableConfig["deviceGateway_instructions"].column,
      //与管理域 变电所 相关联
      connectModule: [{
        moduleName: "deviceGateway",
        myKey: "gatewayid",
        connectKey: "id",
        displayKey: "gatewayname",
      },
      {
        moduleName: "deviceElecMeter",
        myKey: "deviceid",
        connectKey: "id",
        displayKey: "circuitname",
      }]
    }

	}
}

</script>