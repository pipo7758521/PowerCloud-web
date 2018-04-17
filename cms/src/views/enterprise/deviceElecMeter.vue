<template>
  <cms-step-wrapper :activeIndex="4">
  	<cms-grid
      :moduleName = "moduleName"
  		:column = "column"
      :isSubTable = "true"
  	>
  	</cms-grid>
  </cms-step-wrapper>
</template>

<script type="text/javascript">

import Grid from "@/components/grid/grid"
import StepWrapper from "./components/stepWrapper"
import tableConfig from "@/views/_config/table"
import { deviceTypeList } from "@/api/common"

export default {
  components: {
    "cms-grid": Grid,
    "cms-step-wrapper": StepWrapper
  },
  created () {
    deviceTypeList().then( response => {
      let list = response.data.items;
        let options = [];
        list.forEach( (o,i) => {
          options.push({value: o.id, label: o.typedevicename})
        })

        this.column.forEach( (o,i) => {
          if(o.key == "typedeviceid") {
            o.options = options;
            //强制更新，使得grid组件内的表单提交验证规则computed参数跟着更新！
            this.$set(this.column, i, o)
          }
        })
    })
  },
	data () {
		return {
      moduleName: "deviceElecMeter",
			column: tableConfig["deviceElecMeter"].column
		}
	}
}

</script>